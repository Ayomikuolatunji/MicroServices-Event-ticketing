import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
