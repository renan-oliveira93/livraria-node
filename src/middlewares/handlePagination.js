import BadRequest from "../errors/BadRequest.js";

export default async function handlePagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenation = "_id:-1" } = req.query;

    let [orderField, order] = ordenation.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const response = await result.find()
        .sort({ [orderField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(response);
    } else {
      next(BadRequest());
    }
  } catch (error) {
    next(error);
  }
}