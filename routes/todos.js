const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')
const passport = require('passport')
session = require('express-session');

router.get('/', async (req,res) => {
    if(req.session.user) {
        const todos = await Todo.find({user: req.session.user.email})
        res.render('index', {
            title: 'Todos list',
            isIndex: true,
            User : req.session.user,
            todos
        })
    } else {
        res.render('index', {
            title: 'Todos list',
            isIndex: true
        })
    }
    
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
    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        user: req.session.user.email
    })

    await todo.save()
    res.redirect('/')
})

router.post('/delete', async (req,res) => {
    const todo = await Todo.findByIdAndRemove(req.body.id)
    res.redirect('/')
})

router.get('/read/:id', async (req,res) => {
    var id = req.params.id
    console.log(id)
    const result = await Todo.findById(id)
    res.render('read', {
        title: 'Read todo',
        result
    })
    //res.send('<p> Your todo: ' + result.name + " " + result.description + " " + result.completed + '</p>')
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