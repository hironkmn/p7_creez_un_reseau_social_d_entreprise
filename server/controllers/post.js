const Post = require("../models/Post")
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.createPost = (req, res, next) => {
    const postObject = { titre: req.body.titre, description: req.body.description, date: req.body.date }
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
    console.log(req.body)
    const postObject = { titre: req.body.titre, description: req.body.description, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
    Post.findOne({ _id: req.params.id })
        .then((post) => {
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ ...postObject, _id: req.params.id }))
                    .catch(error => res.status(500).json({ error }))
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(500).json({ error }))
                })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.getSomePosts = (req, res, next) => {
    const pageNumber = req.query.pageNumber
    const pageSize = req.query.pageSize
    Post.find()
        .sort({date: -1})
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .then(posts => res.status(200).json(posts))
}
