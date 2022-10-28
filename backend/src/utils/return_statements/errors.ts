import { GraphQLError } from 'graphql';
//TODO
export class GQLError {
  message?: string;
  code?: string;

  constructor(message?: string, code?: string) {
    this.message = message;
    this.code = code;
  }

  error(message: string, code: string, argumentName?: string): GraphQLError {
    return new GraphQLError(message, {
      extensions: {
        code: code,
        argumentName: argumentName,
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
  expired(){
    return this.error('Access token has expired!', 'EXPIRED');
  }
}
