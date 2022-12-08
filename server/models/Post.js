const mongoose = require('mongoose')

const postsSchema = mongoose.Schema ({
    userId: { type: String, required: true },
    titre: { type: String, required: true},
    description: { type: String, rerquired: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    date: {type: String, required: true }
})

module.exports = mongoose.model('Post', postsSchema)