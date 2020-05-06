const {Router} = require('express')
const router = Router()
const Post = require('../models/post')
const auth = require('../middleware/auth')
const User = require('../models/user')

router.get('/', auth, async (req, res) => {
    const author = await User.findById(req.session.user._id)
    res.render('add', {
        title: 'Добавить новый пост',
        isAdd: true,
        author,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.post('/', auth, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        img: req.body.img,
        category: req.body.category,
        posttext: req.body.posttext,
        author: req.body.authorId,
        commentary: {items: []},
        visits: 1
    })

    try {
        const user = await User.findById(req.session.user._id)
        await user.addToUserPosts(post)
        await post.save()
        res.redirect('/')    
    } catch (error) {
        console.log(error)
    }
})

module.exports = router