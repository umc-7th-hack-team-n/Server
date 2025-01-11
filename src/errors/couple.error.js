//src/errors/couple.error.js

export class NotFoundCouple extends Error {
    errorCode = "CP001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    
    }
}//존재하지 않는 커플 데이터 조회 

export class DuplicateCouple extends Error {

    errorCode = "CP002";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    
    }

}//중복된 커플 데이터 





