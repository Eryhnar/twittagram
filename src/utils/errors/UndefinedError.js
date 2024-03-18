class UndefinedError extends Error {
  constructor(message, error) {
    super(message);
    this.name = "UndefinedError";
    this.error = error;
    this.message = error.message
  }
}
export default UndefinedError;