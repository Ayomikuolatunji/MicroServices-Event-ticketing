import { CustomError } from "./custom-error";

export class InternalServerError extends CustomError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  statusCode = 500;

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
