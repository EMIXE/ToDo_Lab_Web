const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const studentsRoutes = require('./routes/students')

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

app.use(studentsRoutes)

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

