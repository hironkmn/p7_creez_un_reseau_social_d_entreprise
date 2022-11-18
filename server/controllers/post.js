const Post = require("../models/Post")
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.createPost = (req, res, next) => {
    const postObject = { titre: req.body.titre, description: req.body.description }
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0
    })
    post.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(500).json({ error }) })
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }))
}

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete postObject._userId
    Post.findOne({ _id: req.query.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.query.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(500).json({ error }))
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.getSomePosts = (req, res, next) => {
    const pageNumber = req.query.pageNumber
    const pageSize = req.query.pageSize
    Post.find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .then(posts => res.status(200).json(posts))
}