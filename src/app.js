import express from "express";
import "dotenv/config.js";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import handleError from "./middlewares/handleError.js";
import handle404 from "./middlewares/handle404.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
  console.log("Conectado com o MongoDB");
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

routes(app);

app.use(handle404);

app.use(handleError);

export default app;