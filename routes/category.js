const {Router} = require('express')
const router = Router()
const Post = require('../models/post')

router.get('/it-hitech', async (req, res) => {
    const posts = await Post.find({category: 'IT Hi-tech'})
    res.render('category/it', {
        title: 'IT Hi-Tech',
        posts,
        category: 'IT Hi-Tech',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/politics', async (req, res) => {
    const posts = await Post.find({category: 'Политика'})
    res.render('category/category', {
        title: 'Политика',
        posts,
        category: 'Политика',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/music', async (req, res) => {
    const posts = await Post.find({category: 'Музыка'})
    res.render('category/category', {
        title: 'Музыка',
        posts,
        category: 'Музыка',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/earn-money-inet', async (req, res) => {
    const posts = await Post.find({category: 'Заработок в Интернете'})
    res.render('category/category', {
        title: 'Заработок в Интернете',
        posts,
        category: 'Заработок в Интернете',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/beauty', async (req, res) => {
    const posts = await Post.find({category: 'Beauty'})
    res.render('category/category', {
        title: 'Beauty',
        posts,
        category: 'Beauty',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/education', async (req, res) => {
    const posts = await Post.find({category: 'Образование'})
    res.render('category/category', {
        title: 'Образование',
        posts,
        category: 'Образование',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/sport', async (req, res) => {
    const posts = await Post.find({category: 'Спорт'})
    res.render('category/category', {
        title: 'Спорт',
        posts,
        category: 'Спорт',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

router.get('/cinema', async (req, res) => {
    const posts = await Post.find({category: 'Кино'})
    res.render('category/category', {
        title: 'Кино',
        posts,
        category: 'Кино',
        userId: req.user ? req.user._id.toString() : null,
        userName: req.user ? req.user.name.toString() : null
    })
})

module.exports = router