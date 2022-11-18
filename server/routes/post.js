const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

const postsCtrl = require('../controllers/post')
const likeCtrl = require('../controllers/like')

router.use((req, res, next) => {
    console.log('Requête reçue !', req.method, req.url)
    next()
})
router.get('/', auth, postsCtrl.getSomePosts)
router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.put('/:id', auth, multer, postsCtrl.modifyPost)
router.delete('/:id', auth, postsCtrl.deletePost)
router.post('/:id/like', auth, likeCtrl.likes)


router.use((req, res, next) => {
    res.status(201)
    next()
})

router.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' })
    next()
})

router.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !')
})

module.exports = router