import express from "express";
import livros from "./livrosRoute.js";
import autores from "./autoresRoute.js";

const routes = (api) => {
  api.route("/").get((req, res) => {
    res.status(200).send({ titulo: "home page" });
  });
  api.use(
    express.json(),
    livros,
    autores
  );
};
export default routes;