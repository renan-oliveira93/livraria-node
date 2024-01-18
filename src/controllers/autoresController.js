import NotFound from "../errors/NotFound.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const findAutores = autores.find();

      req.result = findAutores;

      next();
    } catch (err) {
      res.status(500).send({ message: "- Falha ao listar autores" });
    }
  };


  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor !== null) {
        res.status(200).send(autor);
      } else {
        next(new NotFound("Id não Localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const createAutor = await autor.save();
      res.status(201).send(createAutor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (autor !== null) {
        res.status(200).send({ message: `Autor ${autor.nome} Atualizado` });
      } else {
        next(new NotFound("Id não localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);
      if (autor !== null) {
        res.status(200).send({ message: `${autor.nome} deletado com sucesso!!! -- Não era isso que você queria fazer? -- Faz um post de novo -- body = ${autor} ` });
      } else {
        next(new NotFound("Id não Localizado"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
