export class coupleNotFoundError extends Error {
  errorCode = 'CP001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class coupleIdNotValidError extends Error {
  errorCode = 'CP002';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
