const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    posttext: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    commentary: {
        items: [
            {
                comment: {
                    type: Schema.Types.ObjectId,
                    ref: 'Comment',
                    required: true
                },
                userCom: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                } 
            }
        ]
    },
    visits: {
        type: Number,
        required: true
    }
})

postSchema.methods.addCommentToPost = function(comment, user) {
    const clonedItems = [...this.commentary.items]
    try {
        clonedItems.push({
            comment: comment._id,
            userCom: user._id
        })
        
        const newCommentary = {items: clonedItems}
        this.commentary = newCommentary
        return this.save()    
    } catch (e) {
        console.log(e)
    }
}


module.exports = model('Post', postSchema)