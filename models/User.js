const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true, unique: true},
  notes: [{ type: Types.ObjectId, ref: 'Note' }],
  posts: [{ type: Types.ObjectId, ref: 'Post' }]
})

module.exports = model('User', schema)