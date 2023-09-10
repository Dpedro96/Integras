import UserException from '../domain/exception/UserException';

class ErrorHandler {
    static handle(err) {
        if (err instanceof UserException) {
            return { 
                success: false, 
                message: err.message, 
                errorCode: err.errorCode 
            };
        }
        
        return {
            success: false,
            message: "Um erro desconhecido ocorreu.",
            errorCode: 500
        };
    }
}

export default ErrorHandler;
