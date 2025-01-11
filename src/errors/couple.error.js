export class NonExistCoupleInfoError extends Error {
    errorCode = "CP005";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.data = data;
    }
}