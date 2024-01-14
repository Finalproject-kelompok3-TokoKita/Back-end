class DataNotFoundError extends Error {
    constructor(message) {
        super();
        this.name = "Data Not Found Error";
        this.code = 200;
        this.message = message;
    }
}

module.exports = DataNotFoundError;