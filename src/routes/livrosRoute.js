import express from "express";
import LivroController from "../controllers/livrosController.js";
import handlePagination from "../middlewares/handlePagination.js";


const router = express.Router();

router
  .get("/livros", LivroController.listarLivros, handlePagination)
  .get("/livros/busca", LivroController.listarLivroPorFiltro, handlePagination)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);


export default router;