import { GraphQLError } from 'graphql';
//TODO
export class GQLError {
  message?: string;
  code?: string;

  constructor(message?: string, code?: string) {
    this.message = message;
    this.code = code;
  }

  error(message: string, code: string, argumentName?: string, data?: any): GraphQLError {
    return new GraphQLError(message, {
      extensions: {
        code: code,
        argumentName: argumentName,
        data: data
      },
    });
  }

  //User is not authenticated
  notAuthenticated() {
    return this.error('User is not authenticated!', 'NOT_AUTHENTICATED');
  }

  //User is not authorized for this operation
  notAuthorized() {
    return this.error('User is not authorized!', 'NOT_AUTHORIZED');
  }

  //Invalid argument provided
  invalidArgument(argument?: string) {
    return this.error('Invalid argument value!', 'INVALID_ARG', argument);
  }
  //Nothing was found
  noMatches() {
    return this.error('No matches were found!', 'NO_MATCHES');
  }
  expired(data?: any){
    return this.error('Access token has expired!', 'EXPIRED', undefined, data);
  }
  emailExists(){
    return this.error('User with this email already exists.', 'USER_EMAIL_EXISTS');
  }
  usernameExists(){
    return this.error('User with this user name already exists.', 'USER_NAME_EXISTS');
  }
  invalidEmail(){
    return this.error('Email is not in valid form.', 'INVALID_EMAIL');
  }
}
