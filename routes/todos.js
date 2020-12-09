const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

// function functionChanged()
// {
//     const todo = Todo.findById(req.body.id)
//     todo.completed = true
// }

router.get('/', async (req,res) => {
    const todos = await Todo.find({})

    //Handlebars.registerHelper('functionChanged()', functionChanged());

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req,res) => {
    res.render('create', {
        title: 'Create student',
        isCreate: true
    })
})

// router.get('/read', (req,res) => {
//         res.render('read', {
//         title: 'Read student',
//         isRead: true
//     })
// })

router.get('/update', (req,res) => {
    res.render('update', {
        title: 'Update todos',
        isUpdate: true
    })
})
router.get('/delete', (req,res) => {
    res.render('delete', {
        title: 'Delete todo',
        isDelete: true
    })
})

router.post('/create', async (req, res) => {
    const todos = await Todo.find({})
    const todo = new Todo({
        _id: todos.length+1,
        name: req.body.name,
        description: req.body.description
    })

    await todo.save()
    res.redirect('/')
})

router.post('/delete', async (req,res) => {
    const todo = await Todo.findByIdAndRemove(req.body.id)
    res.redirect('/')
})

router.get('/read/:id', async (req,res) => {
    const result = await Todo.findById(req.query.id)
    res.send('<p>' + result.name + " " + result.description + " " + result.completed + '</p>')
})

router.post('/update', (req,res) => {
    const id = {_id: req.body.id}
    const data = {name: req.body.name, description: req.body.descrition}
    Todo.updateOne(id, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })
    
})

module.exports = router