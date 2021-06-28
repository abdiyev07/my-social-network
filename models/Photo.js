import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose

const photoSchema = new Schema({
  url: { type: String, required: true },
  user_id: { type: Types.ObjectId, required: true, ref: 'User' },
  likes: { type: Array, required: true },
})

export default model('Photo', photoSchema)
