const express = require('express')
const exphbs = require('express-handlebars')
const paginateHelper = require('express-handlebars-paginate')
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const postsRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/category')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const keys = require('./keys')
const app = express()


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./utils/hbs-helpers')
})

hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination)

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/category', categoryRoutes)
app.use('/posts', postsRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

async function start(){
    try {
        mongoose.connect(keys.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, ()=> {
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()