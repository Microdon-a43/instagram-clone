import User from '../models/user.js';
import jwt, { decode } from 'jsonwebtoken';

// function isAuthenticated(token, refreshToken) {
//   try {
//     const { exp } = decode(token);
//     // const { exp } = decode(refreshToken);
//     console.log(exp * 1000);
//     if (Date.now() >= exp * 1000) {
//       return false;
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
//   return true;
// }

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const refreshToken = req.cookies.refreshToken;
    // const result = isAuthenticated(token, refreshToken);
    // console.log('Now', Date.now());

    if (!token)
      return res.status(401).json({ message: 'Вы не были авторизованы1' });

    jwt.verify(token, process.env.ACCESS_TOKEN, async (error, result) => {
      if (error)
        return res.status(401).json({ message: 'Вы не были авторизованы2' });

      const user = await User.findOne({ _id: result.id });

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
