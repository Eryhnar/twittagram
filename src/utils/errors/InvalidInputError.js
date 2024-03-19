class InvalidInputError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "InvalidInputError";
        this.statusCode = statusCode;
    }
}
export default InvalidInputError;