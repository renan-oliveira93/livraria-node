import ErrorBase from "./ErrorBase.js";

class BadRequest extends ErrorBase {
  constructor(message = "Um ou mais dados estão incorretos") {
    super(message, 400);
  }
}

export default BadRequest;
