const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    commentator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Comment', commentSchema)