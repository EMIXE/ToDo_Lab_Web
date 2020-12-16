const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const todosRoutes = require('./routes/todos')
const usersRoutes = require('./routes/users')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


var sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        url: 'mongodb+srv://Artyom:30041969n@cluster0.atbrl.mongodb.net/WEB_Lab_0'
    })
  });
app.use(sessionMiddleware);

app.use(passport.initialize())

//require('./middleware/passport')(passport)
app.use(todosRoutes)
app.use(usersRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Artyom:30041969n@cluster0.atbrl.mongodb.net/WEB_Lab_0', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()

