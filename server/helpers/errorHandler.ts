export default class CustomError extends Error {
  public code: string = '';
  public status: number = 0;

  constructor(code = 'GENERIC', status = 500, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.status = status;
  }
}
