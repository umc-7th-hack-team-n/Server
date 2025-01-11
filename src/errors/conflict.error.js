export class NonExistCoupleError extends Error {
  errorCode = 'C005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

//monthly-conflict-api
export class MonthNotValidError extends Error {
  errorCode = 'CT001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ConflictNotFoundError extends Error {
  errorCode = 'CT002';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ConflictIdNotValidError extends Error {
  errorCode = 'CT003';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
