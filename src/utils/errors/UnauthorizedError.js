class UnauthorizedError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = statusCode;
    }
}
export default UnauthorizedError;