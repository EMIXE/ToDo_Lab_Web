const {Router} = require('express')
const router = Router()
const Student = require('../models/Student')

router.get('/', async (req,res) => {
    const students = await Student.find({})

    res.render('index', {
        title: 'Students list',
        isIndex: true,
        students
    })
})

router.get('/create', (req,res) => {
    res.render('create', {
        title: 'Create student',
        isCreate: true
    })
})

router.get('/read', (req,res) => {
        res.render('read', {
        title: 'Read student',
        isRead: true
    })
})

router.get('/update', (req,res) => {
    res.render('update', {
        title: 'Update student',
        isUpdate: true
    })
})
router.get('/delete', (req,res) => {
    res.render('delete', {
        title: 'Delete student',
        isDelete: true
    })
})

router.post('/create', async (req, res) => {
    const students = await Student.find({})
    const student = new Student({
        _id: students.length+1,
        name: req.body.name,
        surname: req.body.surname
    })

    await student.save()
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    const student = await Student.findByIdAndRemove(req.body.id)
    res.redirect('/')
})

router.get('/read/:id', async (req,res) => {
    const result = await Student.findById(req.query.id)
    res.send('<p>' + result.name + " " + result.surname +'</p>')
})

router.post('/update', (req,res) => {
    const id = {_id: req.body.id}
    const data = {name: req.body.name, surname: req.body.surname}
    Student.updateOne(id, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })
    
})

module.exports = router