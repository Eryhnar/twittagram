class UndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UndefinedError";
  }
}
export default UndefinedError;