const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const out = require('../middleware/notauth')

router.get('/', out, (req, res) => {
    res.render('auth/login', {
        title: 'Войти',
        isLogin: true,
        loginError: req.flash('loginError')
    })
})

router.post('/', out, async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ email })

        if(candidate) {
            const checkPassword = await bcrypt.compare(password, candidate.password);

            if(checkPassword) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if(err) {
                        throw err
                    } else {
                        res.redirect('/')
                    }
                })
            } else {
                req.flash('loginError', 'Неправильный пароль.')
                res.redirect('/auth')
            }
        } else {
            req.flash('loginError', 'Такого пользователья не существует.')
            res.redirect('/auth')
        }

    } catch (e) {
        console.log(e)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

router.get('/out', (req, res) => {
    res.render('auth/out', {
        title: 'Хотите выйти?',
        userName: req.user ? req.user.name.toString() : null,
        userId: req.user ? req.user._id.toString() : null
    })
})

router.get('/registration', out, (req, res) => {
    res.render('auth/signup', {
        title: 'Регистрация',
        regError: req.flash('regError')
    })
})

router.post('/registration', out, async (req, res) => {
    try {
        const {email} = req.body
        const candidate = await User.findOne({ email })
        
        if(candidate){
            req.flash('regError', 'Пользователь с таким email уже существует')
            res.redirect('/auth/registration')
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                password: hashPassword,
                country: req.body.country,
                posts: {items: []}
            })
            await user.save()
            res.redirect('/auth')
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router