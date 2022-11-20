import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_SECRET } from '../config/variables.js';
import { GQLError } from '../utils/return_statements/errors.js';
import { createAppUser, createErrorThrowingUser, createUnloggedUser} from '../types/AppUser.js';
import crypto from 'crypto';

/**
 * Creates a access token for user.
 * @param content 
 * @returns 
 */
export function createToken(userID: number) {
  const content = {
    id_user: userID
  }
  return jwt.sign(content, JWT_SECRET, { expiresIn: '5min'});
}

/**
 * 
 * @param token Verifies access token from user.
 * @returns 
 */
export function verifyToken(token:string) {
  try{
    const verified = jwt.verify(token, JWT_SECRET);
    if(typeof verified === "string") return createErrorThrowingUser(new GQLError().notAuthenticated());
    const user = createAppUser(verified.id_user);
    return user; 
  }
  catch(err:any){
    if(err.name == "TokenExpiredError"){
      
      const content = jwt.decode(token);
      return createErrorThrowingUser(new GQLError().expired(content));
    }
    else return createErrorThrowingUser(new GQLError().notAuthenticated());
  }
}

/**
 * Takes authorization string from request and verify its content.
 * @param authString 
 * @returns 
 */
export async function verifyTokenFromHeader(authString: string|string[]|undefined){
  if(typeof authString == "object") return createUnloggedUser()
  if(authString === undefined) return createUnloggedUser();

  const token = stripTokenFromHeader(authString)

  return await verifyToken(token);
}

/**
 * Splits string in format "Bearer Token" in half and returns only the token part.
 * @param headerContent 
 * @returns 
 */
export function stripTokenFromHeader(headerContent: string|undefined){
  if(headerContent && headerContent.search("Bearer") != -1){
    return headerContent.split(' ')[1]
  }
  return ''
}

/**
 * Creates a refresh token for a user.
 * @param content 
 * @returns 
 */
export function createRefreshToken(id_user:number){
  return jwt.sign({id_user}, REFRESH_SECRET);
}

/**
 * Verifies a refresh token via private key.
 * @param token 
 * @returns 
 */
export async function verifyRefreshToken(token:string){
  try{
    const content = jwt.verify(token, REFRESH_SECRET);
    return((<any>content).id_user);
  } catch{
    throw new GQLError().notAuthenticated()
  }
}

export function generateHashOfLength(length: number){
  if(length % 2 == 1) return crypto.randomBytes((length+1)/2).toString("hex").slice(0, length);
  return crypto.randomBytes(length/2).toString("hex");
}