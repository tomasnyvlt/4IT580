import { GraphQLError } from "graphql";

export class GQLError {
  message?: string;
  code?: string;

  constructor(message?: string, code?: string) {
    this.message = message;
    this.code = code;
  }

  error(
    message: string,
    code: string,
    argumentName?: string,
    data?: any
  ): GraphQLError {
    return new GraphQLError(message, {
      extensions: {
        code: code,
        argumentName: argumentName,
        data: data,
      },
    });
  }

  //User is not authenticated
  notAuthenticated() {
    return this.error("User is not authenticated!", "NOT_AUTHENTICATED");
  }

  noNewRows() {
    return this.error("Adding new rows failed!", "NO_NEW_ROWS");
  }

  //User is not authorized for this operation
  notAuthorized() {
    return this.error("User is not authorized!", "NOT_AUTHORIZED");
  }

  //Invalid argument provided
  invalidArgument(argument?: string) {
    return this.error("Invalid argument value!", "INVALID_ARG", argument);
  }
  //Nothing was found
  noMatches() {
    return this.error("No matches were found!", "NO_MATCHES");
  }
  expired(data?: any) {
    return this.error("Access token has expired!", "EXPIRED", undefined, data);
  }
  emailExists() {
    return this.error(
      "User with this email already exists.",
      "USER_EMAIL_EXISTS"
    );
  }
  invalidEmail() {
    return this.error("Email is not in valid form.", "INVALID_EMAIL");
  }
  invalidPasswordContent() {
    return this.error(
      "Password must contain combination of atleast one lower case character, one upper case character, one number and one special character.",
      "INVALID_PSW"
    );
  }
  wrongPasswordLength() {
    return this.error(
      `Password must have atleast length of 6 characters.`,
      "WRONG_LENGTH"
    );
  }
  notVerified() {
    return this.error("Not verified", "NOT_VERIFIED");
  }
  noEventRecieverSet() {
    return this.error(
      "No second reciever of the event set.",
      "NO_EVENT_RECIEVER"
    );
  }
}
