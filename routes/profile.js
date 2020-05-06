const {Router} = require('express')
const router = Router()
const User = require('../models/user')

function mapPostItems(posts){
    return posts.items.map(c => ({
        ...c.postId._doc,
        id: c.postId.id,
        count: c.count
    }))
}

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('auth/profile', {
        title: `Аккаунт ${user.name}`,
        user,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/posts/:id', async (req, res) => {
    try {
        const author = await User.findById(req.params.id)
        const user = await User.findById(req.params.id)
        .populate('posts.items.postId')

        const posts = mapPostItems(user.posts)

        res.render('auth/posts', {
        title: `Посты: ${author.name}`,
        posts: posts.reverse(),
        author,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
    } catch(e) {
        console.log(e)
    }
})

module.exports = router