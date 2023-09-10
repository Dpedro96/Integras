class UserException extends Error {
  constructor(message, errorCode) {
      super(message);
      this.name = this.constructor.name;
      this.errorCode = errorCode || 500; // 500 é o código padrão de erro do servidor
  }
}

export default UserException;
