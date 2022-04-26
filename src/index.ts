import express from "express";
import morgan from "morgan";
import cors from "cors";
import setUpRoutes from "./routes";
import connectdb from "./config/db";

connectdb();
const app = express();

const PORT = process.env.PORT || 8080;
// Apply middlewares
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//setup all the routes
setUpRoutes(app);

app.get("/", (req, res) => {
  res
    .status(200)
    .end(
      "No es el coche que tu conduces... Es el conductor que conduce el coche el que hace la conduccion. Toreto 2020, Mega Rapido Mega Furioso 5:15"
    );
});

app.listen(PORT, () => {
  console.log(`App listening in PORT ${PORT}`);
});
