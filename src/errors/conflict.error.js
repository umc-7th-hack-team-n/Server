export class MonthNotValidError extends Error {
  errorCode = 'CT001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
