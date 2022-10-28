import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/variables.js';


export function createToken(content:TokenContent) {
  return jwt.sign(content, JWT_SECRET);
}

export function verifyToken(token:string) {
  const verified = jwt.verify(token, JWT_SECRET);
  const tokenContent:TokenContent = {
    loggedIn: true,
    id_user: (<any>verified).id_user
  }
  return tokenContent
}

export function verifyTokenFromHeader(authString: string|string[]|undefined){
  const content:TokenContent = {
    loggedIn: false,
    id_user: null
  }
  if(typeof authString == "object") return content
  const token = stripTokenFromHeader(authString)
  if(token.length > 0){
    const readContent = verifyToken(token);
    content.loggedIn = true;
    content.id_user = readContent.id_user;

  }
  return content
}

export function stripTokenFromHeader(headerContent: string|undefined){
  if(headerContent && headerContent.search("Bearer") != -1){
    return headerContent.split(' ')[1]
  }
  return ''
}