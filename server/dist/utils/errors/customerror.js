class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Set the name to the class name
    }
}
// Example usage
export default CustomError;
//# sourceMappingURL=customerror.js.map