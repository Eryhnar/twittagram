class NotFoundError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "NorFoundError";
        this.statusCode = statusCode;
    }
}
export default NotFoundError;