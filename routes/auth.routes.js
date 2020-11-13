const {Router} = require('express')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const router = Router()
const config = require('config')

router.post(
  '/register',
  [
    check('email', 'Некорректный email!').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов!')
      .isLength({ min: 6 }),
    check('name', 'Минимальная длина Ника 6 символов!').isLength({ min: 6 })  
  ],
   async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Некорректные данные при регистрации!'
       })
    }

    const {email, password, name} = req.body

    const candidate = await User.findOne({email})

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует!' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword, name })
    
    await user.save()

    res.status(201).json({ message: 'Пользователь был создан!' })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  }
})

router.get('/info', auth ,async (req, res) => {
  try {
    const user = await User.find({_id: req.user.userId})

    res.status(200).json({
      email: user[0].email,
      name: user[0].name
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  } 
})

router.patch('/change', auth, async (req, res) => {
  const updated = {
    name: req.body.name
  }

  try {
    const user = await User.findOneAndUpdate(
      {_id: req.user.userId,},
      {$set: updated},
      {new: true}
    )
      // .select('name email gender avatarUrl')
      // .exec()

    res.status(200).json(user)
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  }
})

router.post(
  '/login', 
  [
    check('email', 'Введите корректный email!').normalizeEmail().isEmail(),
    check('password', 'Введите корректный пароль!').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему!'
         })
      }
  
      const {email, password} = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Такой пользователь не существует!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль!' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      ) 

      res.json({ token, userId: user.id })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
})

module.exports = router 