import "dotenv/config";
import express from "express";
import { baseUrl, port } from "./config.ts";
import { linksRouter } from "./routes/links.ts";

const app = express();
app.use(express.json());
app.use(linksRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}, serving ${baseUrl}`);
});