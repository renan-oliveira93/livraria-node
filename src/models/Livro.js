import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O id do autor é obrigatório"],
      autopopulate: true
    },
    editora: {
      type: String,
      required: [true, "O campo editora é obrigatório"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editpra {VALUE} não é válida para cadastro"
      }
    },
    numeroPaginas: {
      type: Number,
      min: [10, "O número minimo de páginas permitos é 10"],
      max: [5000, "O número máximo de páginas permitido é 5000"]
    }
  }
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("books", livroSchema);

export default livros;