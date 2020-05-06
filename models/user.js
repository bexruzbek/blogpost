const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    posts: {
        items: [
            {
                count: {
                    type: Number,
                    default: 0
                },
                postId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToUserPosts = function(post) {
    const clonedItems = [...this.posts.items]
    clonedItems.push({
        postId: post._id,
        count: 1
    })

    const newCart = {items: clonedItems}
    this.posts = newCart
    return this.save()
}

userSchema.methods.removeFromUserPosts = function(id) {
    let items = [...this.posts.items]
    const idx = items.findIndex(c => c.postId.toString() === id.toString())

    items = items.filter(c => c.postId.toString() !== id.toString())

    this.posts = {items}
    return this.save()
}

module.exports = model('User', userSchema)