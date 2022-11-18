const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()


const userRoutes = require('./routes/user')
const postsRoutes = require('./routes/post')

mongoose.connect(`mongodb+srv://mzerrouk:${process.env.PASSWORD}@cluster0.hqtbroj.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.options('/*', (_, res) => {
    res.sendStatus(200)
})

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/posts', postsRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app