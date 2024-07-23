import express, { Express } from "express";
import  bodyParser  from "body-parser";
import { routesInit } from "./bootstrap";
import path from "path";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
);

app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "ejs");

routesInit(app);

app.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
