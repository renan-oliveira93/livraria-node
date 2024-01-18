import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(err) {
    const errMessage = Object.values(err.errors).map((err => err.message)).join("; ");
    super(`${errMessage}`);
  }
}

export default ValidationError;