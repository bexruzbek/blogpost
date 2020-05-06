const {Router} = require('express')
const router = Router()
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comments')
const auth = require('../middleware/auth')

function mapPostItems(post){
    return post.items.map(c => ({
        ...c.postId._doc, 
        id: c.postId.id
    }))
}

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name')
        res.render('category/all', {
            title: 'Все посты',
            posts: posts.reverse(),
            userId: req.user ? req.user._id.toString() : null,
            userName: req.user ? req.user.name.toString() : null
        })    
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {$inc: {visits: 1}}, {new: true})
            .populate('author', 'name')
        const comments = await Comment.find({postId: req.params.id})
            .populate('commentator', 'name')
    
        res.render('post-page', {
            title: `${post.title}`,
            post,
            userName: req.user ? req.user.name.toString() : null,
            userId: req.user ? req.user._id.toString() : null,
            comments
        })    
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/comment', async (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        commentator: req.session.user._id,
        postId: req.body.postId
    })
    try {
        const user = await User.findById(req.user._id)
        const post = await Post.findById(req.params.id)
        await post.addCommentToPost(comment, user)
        await comment.save()
        res.redirect(`.`)    
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow){
        res.redirect('/')
    }

    try {
        const post = await Post.findById(req.params.id)
        
        if (post.author.toString() !== req.user._id.toString()){
            return res.redirect('/posts')
        }
        res.render('edit-post', {
        title: `Редактировать ${post.title}`,
        post,
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
        })    
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/delete', auth, async (req, res) => {
    await Post.deleteOne({_id: req.params.id})
    await req.user.removeFromUserPosts(req.params.id)

    const user = await req.user.populate('posts.items.postId').execPopulate()
    const posts = mapPostItems(user.posts)
    const post = {posts}
    res.status(200).json(post)
    res.redirect('/posts')
})

router.post('/edit', auth, async (req, res) => {
    try {
        const {id} = req.body
        delete req.body.id
        const post = await Post.findById(id)
        if(post.author.toString() !== req.user._id.toString()){
            return res.redirect('/posts')
        } 
        await Post.findByIdAndUpdate(id, req.body)
        res.redirect('/posts')    
    } catch (e) {
        console.log(e)
    }
})

module.exports = router