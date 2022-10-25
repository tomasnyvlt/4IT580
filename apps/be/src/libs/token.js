import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/variables';

export function createToken(content) {
  return jwt.sign(content, JWT_SECRET);
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
