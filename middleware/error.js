module.exports = function(req, res, next){
    res.status(404).render('404',{
        title: 'Страница не найдено',
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
}