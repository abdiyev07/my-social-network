import User from '../../models/User.js'

export default async (req, res) => {
  try {
    const { phone = null, password = null } = req.body

    if (!phone || !password) {
      return res.status(400).json({ message: 'Отсутствуют обязательные поля для логина' })
    }

    if (password.length < 6 || phone.length !== 11) {
      return res.status(400).json({ message: 'Неверный формат пароля или номера телефона' })
    }

    const user = await User.findOne({ phone: phone })

    // user._id

    if (!user) {
      return res.status(400).json({ message: 'Пользователь с таким номером отсутствует в базе' })
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Неверный пароль' })
    }

    // Домашнее задание 1. Завершить функционал логина: Возвращать нужно токен (вшить в токен user_id), user_id, posts, photos, friends
    // Домашнее задание 2. Реализовать middleware для авторизации
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Произошла серверная ошибка...' })
  }
}
