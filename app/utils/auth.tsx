// utils/auth.js
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: { headers: { cookie: any; }; }) => {
  if (!req.headers.cookie) {
    return null;
  }

  const { token } = cookie.parse(req.headers.cookie);

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};