//Importing packages
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

//Iniciate express
const app = express()

//Connection with database
const conn = require('./db/conn')

//Importing models
const Tought = require('./models/Tought')
const User = require('./models/User')

//Importing Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//Importing controller
const ToughtController = require('./controllers/ToughtController')

//Template engine - Iniciate handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Get body's answer
app.use(
    express.urlencoded({
        extended: true
    })
)

//Get JSON data
app.use(express.json())

//Session midleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

//Flash messages
app.use(flash())

//Public path
app.use(express.static('public'))

//Set session to res
app.use((req,res,next)=>{
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

//Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

//Inicializing the application
conn
    //.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(3000)
}).catch((err)=>console.log(err))