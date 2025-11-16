import express, { Request, Response } from "express";
import dotenv from "dotenv";
import generateRouter from "./routes/generate";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/generate", generateRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript + LLaMA API is running 🚀");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});