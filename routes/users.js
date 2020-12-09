const {Router} = require('express')
const router = Router()
const controller = require('../controllers/auth')
const User = require('../models/User')
const bcrypt = require('bcryptjs');

//router.post('/login', controller.login)

router.post('/register', async (req,res) => {
    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {
        res.status(409).json({
            message: 'This email is exist! Try to another email'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password,salt)
       })
       try {
           await user.save()
           res.status(201).json(user)
       } catch(e) {
           //TODO error
       }
    }
    
})

router.get('/register', (req,res) => {
    res.render('registration', {
        title: 'Registrrr'
    })
})
// const User = require('../models/User')

// const uuidv4 = require('uuid/v4');



// let auth = function(req, res, next) {
//     User
//       .getToken(req.headers.authorization)
//       .then((results)=>{
//         if (results.length == 0) {
//           const err = new Error('Не авторизован!');
//           err.status = 401;
//           next(err); 
//         } else {
//           next()
//         }
//       })
//       .catch((err)=>{
//         next(err);
//       })
//   }

// const isValidPassword = function(user, password) {
//     return bcrypt.compareSync(password, user.password);
//   }

//   router.get('/registration', (req,res) => {
//       res.render('registration', {
//         title: 'Registration'
//       })
//   })

//   router.get('/secret', auth, (req, res)=>{
//     res.json({
//       message: 'Секретная страница!'
//     })   
//   });
  
//   router.post('/registration', (req, res, next)=>{
//     if(req.body.password === req.body.repeatPassword){
//       User
//         .getUser(req.body.email)
//         .then((results)=>{
//           if (results.length == 0){
//             data = {
//               email: req.body.email,
//               password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
//             };
//             User
//               .add('users', data)
//               .then((results)=>{
//                 res.json({
//                   message: 'Пользователь добавлен: ' + results[0]
//                 })
//               })
//               .catch((err)=>{
//                 next(err);
//               })
//           } else {
//             const err = new Error('Такой пользователь уже есть!');
//             err.status = 400;
//               next(err);
//           }
//         })
//         .catch((err)=>{
//           next(err);
//         })
//     } else {
//       const err = new Error('Не совпадает пароль и подтверждение пароля!');
//       err.status = 400;
//         next(err);        
//     }
//   })
  
//   // router.post('/login', (req, res, next)=>{
//   //   db
//   //     .getUser(req.body.email)
//   //     .then((results)=>{
//   //       if (isValidPassword(results[0], req.body.password)) {
//   //         data ={};
//   //         data.login=req.body.email;
//   //         data.token=uuidv4();
//   //         db
//   //           .delete(req.body.email)
//   //           .then((results)=>{
//   //             db
//   //               .add('token', data)
//   //               .then((results)=>{
//   //                 res.json({
//   //                   token: results.token
//   //                 })                            
//   //               })
//   //               .catch((err)=>{
//   //                 next(err)
//   //               })
//   //           })
//   //           .catch((err)=>{
//   //             next(err)
//   //           })
//   //       } else {
//   //         const err = new Error('Не верный логин или пароль!');
//   //         err.status = 400;
//   //         next(err); 
//   //       }
//   //     })
//   //     .catch((err)=>{
//   //       next(err);
//   //     })
//   // })
module.exports = router