class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "Unauthorized User Error";
        this.status = 401;
    }
}