import express, { Express } from "express";
import  bodyParser  from "body-parser";
import { routesInit } from "./server/bootstrap";
import path from "path";

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("views", path.join(__dirname, "./server/views/"));
app.set("view engine", "ejs");

routesInit(app);

app.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
