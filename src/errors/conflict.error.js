export class NonExistCoupleError extends Error {
    errorCode = "C005";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}