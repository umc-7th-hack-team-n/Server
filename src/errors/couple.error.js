export class NonExistCoupleInfoError extends Error {
  errorCode = 'CP005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

//src/errors/couple.error.js

export class NotFoundCouple extends Error {
  errorCode = 'CP001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
} //존재하지 않는 커플 데이터 조회
