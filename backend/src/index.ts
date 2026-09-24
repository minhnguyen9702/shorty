import "dotenv/config";
import express from "express";
import { linksRouter } from "./routes/links.ts";

const app = express();
app.use(express.json());
app.use(linksRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});