import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
export default function handleError(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new BadRequest().sendMessage(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendMessage(res);
  } else if (err instanceof ErrorBase) {
    err.sendMessage(res);
  } else {
    new ErrorBase().sendMessage(res);
  }
} 