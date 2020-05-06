const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const Post = require('../models/post')

router.get('/', async (req, res) => {
    const posts = await Post.find()
    const popular = await Post.find()
    res.render('index', {
        title: 'Home Page',
        isHome: true,
        popular: popular.sort((a, b) => a.visits > b.visits ? 1 : -1).slice(-6).reverse(),
        posts: posts.slice(-6).reverse(),
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        isAbout: true,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/howtouse', (req, res) => {
    res.render('howtouse', {
        title: 'How to use',
        isHowToUse: true,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/must-reg', (req, res) => {
    res.render('must-reg', {
        title: 'Добавить пость',
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/conditions', (req, res) => {
    res.render('conditions', {
        title: 'Условия использования',
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

module.exports = router