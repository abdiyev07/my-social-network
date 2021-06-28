import User from '../../models/User.js'

export default async (req, res) => {
  try {
    const { phone = null, first_name = null, last_name = null, password = null, email = null } = req.body

    if (!phone || !first_name || !last_name || !password) {
      return res.status(400).json({ message: 'Отсутствуют обязательные поля для регитрации' })
    }

    if (password.length < 6 || phone.length !== 11) {
      return res.status(400).json({ message: 'Неверный формат пароля или номера телефона' })
    }

    const candidate = await User.findOne({ phone })

    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким номером уже зарегистрирован' })
    }

    const user = new User({
      phone,
      password,
      first_name,
      last_name,
      email,
    })

    await user.save()

    res.json({ message: 'Регистрация прошла успешна' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Произошла серверная ошибка...' })
  }
}
