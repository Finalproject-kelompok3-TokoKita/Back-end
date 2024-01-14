class BadRequestError extends Error {
    constructor(message) {
        super();
        this.name = "Bad Request Error";
        this.code = 400;
        this.message = message;
    }
}

module.exports = BadRequestError;