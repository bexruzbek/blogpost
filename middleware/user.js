const User = require('../models/user')

module.exports = async function (req, res, next) {
    try {
        if(!req.session.user){
            return next()
        }
        
        const {_id} = req.session.user
        req.user = await User.findOne({ _id })
        next() 
    } catch (e) {
        console.log(e)
    }
}