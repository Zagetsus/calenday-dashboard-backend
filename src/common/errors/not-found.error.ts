export class NotFoundError extends Error {
  constructor(message = 'Unexpected error') {
    super(message);
    this.name = NotFoundError.name;
  }
}
