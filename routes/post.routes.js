const {Router} = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {title, amount, type, text} = req.body 

    const existing = await Post.findOne({ title })  

    if (existing) {
      return res.json({ post: existing })
    }

    const post = new Post({
      title, amount, type, text, owner: req.user.userId
    })

    await post.save()

    res.status(201).json({ post })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  }
})

module.exports = router 