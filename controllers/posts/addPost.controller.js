import Post from '../../models/Post.js'

export default async (req, res) => {
  try {
    const user_id = req.user.user_id
    const { post = null } = req.body
    if (!post) {
      return res.status(400).json({ message: 'Запрещено добавлять пустой пост' })
    }
    
    const newPost = new Post({
      body: post,
      created_at: Date.now(),
      author: user_id,
      likes: [],
      comments: []
    })

    const addedPost = await newPost.save()
    
  } catch (e) {
    console.log(e)
  }
}
