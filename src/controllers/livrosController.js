import NotFound from "../errors/NotFound.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const getBooks = livros.find();

      req.result = getBooks;

      next();
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResponse = await livros.findById(id)
        .populate("author", "nome")
        .exec();

      if (livrosResponse !== null) {
        res.status(200).send(livrosResponse);
      } else {
        next(new NotFound("Id não Localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livrosResponse = await livro.save();

      res.status(201).send(livrosResponse.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResponse = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livrosResponse !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NotFound("Id não Localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResponse = await livros.findByIdAndDelete(id);

      if (livrosResponse !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFound("Id Não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas, authorName } = req.query;

      let busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
      if (minPaginas || maxPaginas) busca.numeroPaginas = {};
      if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
      if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
      if (authorName) {
        const author = await autores.findOne({ nome: authorName });
        if (author !== null) {
          busca.author = author._id;
        } else {
          busca = null;
        }
      }

      if (busca !== null) {
        const livrosResponse = livros.find(busca).populate("author");
        req.result = livrosResponse;
        next();
      } else {
        res.status(404).send("Autor não encontrado");
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
