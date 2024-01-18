import NotFound from "../errors/NotFound.js";

export default function handle404(req, res, next) {
  const err404 = new NotFound();
  next(err404);
}