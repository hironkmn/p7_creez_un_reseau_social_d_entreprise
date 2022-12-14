const Post = require("../models/Post")

exports.likes = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((like) => {
            console.log('coucou2', like, req.body)
            if (!like.usersLiked.includes(req.body.userId) && req.body.like === 1){
                console.log(req.body)
                Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }})
                    .then(() => {console.log('coucou'); res.status(201).json({ message: "Post like +1" })})
                    .catch((error) => res.status(500).json({ error }))
            } else if (like.usersLiked.includes(req.body.userId) && req.body.like === 0){
                Post.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }})
                    .then(() => res.status(201).json({ message: "Post like 0" }))
                    .catch((error) => res.status(500).json({ error }))
            }
        })
    }