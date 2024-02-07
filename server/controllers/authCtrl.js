import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authCtrl = {
  register: async (req, res) => {
    try {
      const { email, fullname, username, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({
          message: 'Пользователь с таким эл. адресом уже существует'
        });

      const usernameIsValid = await User.findOne({ username });

      if (usernameIsValid)
        return res.status(400).json({
          message: 'Пользователь с таким именем уже существует'
        });

      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = await User.create({
        email,
        fullname,
        username,
        password: hashedPassword
      });

      res.status(200).json({
        newUser,
        message: 'Пользователь создан успешно'
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: 'Пользователь не найден' });

      const passwordValidation = await bcrypt.compare(password, user.password);
      if (!passwordValidation)
        return res
          .status(401)
          .json({ message: 'Неверный эл. адрес или пароль' });

      const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: '1h'
      });

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '30d'
        }
      );

      res.cookie('refreshToken', refreshToken);

      res.status(200).json({ message: 'Вход выполнен успешно', user, token });
    } catch (error) {
      console.log(error);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Вы успешно вышли' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;

      if (!token)
        return res.status(401).json({ message: 'Вы не были авторизованы' });

      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, result) => {
        if (err)
          return res.status(401).json({ message: 'Вы не были авторизованы' });

        const user = await User.findById({ _id: result.id })
          .select('-password')
          .populate(
            'followers following',
            'avatar username fullname followers following'
          );

        const access_token = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: '1h'
          }
        );

        res.json({ user, token: access_token });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
