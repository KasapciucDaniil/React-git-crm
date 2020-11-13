const {Router} = require('express')
const Note = require('../models/Note')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {title, limit} = req.body

    const existing = await Note.findOne({ title })  

    if (existing) {
      return res.json({ note: existing })
    }

    const note = new Note({
      title, limit, owner: req.user.userId
    })

    await note.save()

    res.status(201).json({ note })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  }
})

// router.post('/generatePost', auth, async (req, res) => {
//   try {
//     const {title, amount, type, text} = req.body

//     const existing = await Post.findOne({ title }) 

//     if (existing) {
//       return res.json({ post: existing })
//     }

//     const post = new Post({
//       title, type, text,amount,owner: req.user.userId
//     })

//     await post.save()

//     res.status(201).json({ post })

//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
//   }
// })

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id)
//     res.json(note)
//   } catch (e) {
//     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//   }
// })

router.patch('/changeNote', auth, async (req,res) => {
  const updated = {
    title, 
    limit
  } = req.body

  try {
    const note = await Note.findByIdAndUpdate(
      {_id: req.body._id,},
      {$set: updated},
      {new: true}
    )
     console.log(note)
    res.status(200).json(note)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId })
    res.json(notes)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
  } 
})

module.exports = router