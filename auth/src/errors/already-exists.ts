import { CustomError } from "./custom-error";

export class AlreadyExist extends CustomError {
  statusCode: number;
  constructor(public message: string) {
    super(message);
    this.statusCode = 403;
    this.message = message;
    Object.setPrototypeOf(this, AlreadyExist.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
