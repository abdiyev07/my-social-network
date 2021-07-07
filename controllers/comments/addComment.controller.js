import Post from '../../models/Post.js'
import Comment from '../../models/Comment.js'

export default async (req, res) => {
  try {
    const user_id = req.user.user_id
    const { comment = null, post_id = null } = req.body
    if (!comment) {
      return res.status(400).json({ message: 'Отсутствует комментарии для добавления' })
    }

    const post = await Post.findById(post_id)
    if (!post) {
      return res.status(400).json({ message: 'Пост с таким id не был найден' })
    }

    const newComment = new Comment({
      body: comment,
      created_at: Date.now(),
      author: user_id,
    })

    const addedComment = await newComment.save()

    const updatedComments = [...post.comments, { ...addedComment }]

    // STOP

    await Post.findByIdAndUpdate(post._id, { comments: updatedComments }, { rawResult: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'При добавлении комментарии произошел технический сбой' })
      }
      return res.status(201).json({ message: 'Комментарии успешно добавлен' })
    })
  } catch (e) {
    console.log(e)
  }
}
