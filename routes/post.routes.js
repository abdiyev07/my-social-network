import { Router } from 'express'
import addPostController from '../controllers/posts/addPost.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const router = Router()

router.post('/add', authMiddleware, addPostController)
