export default class LoginException extends Error {
    constructor(message) {
      super(message);
      this.name = "LoginException";
    }
  }