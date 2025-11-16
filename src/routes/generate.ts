import { Router, Request, Response } from "express";
import ollama from "ollama";
import wrapAnsi from "wrap-ansi";
import chalk from "chalk";

const router = Router();

/**
 * Preq for both endpoints: ensure that you have pulled the 
 * model llama3 e.g. ollama pull llama3. 
 */

/**
 * Preq: ensure that you have pulled the model llama3 e.g.
 * ollama pull llama3.
 * This repo uses llama purely because it's free. You can 
 * use any other model of your choice compitable with ollama
 * POST /generate
 * Body: { prompt: string }
 */
router.post("/", async (req: Request, res: Response) => {

  console.log(chalk.yellow("Received a request to query the LLM..."));
  const { prompt } = req.body;
  console.log(chalk.cyan(`Prompt: ${prompt}`));

  const interval = setInterval(() => process.stdout.write("."), 500);

      // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  
  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" }).end();
  }

  try {
    const response = await ollama.chat({
      model: "llama3",
      messages: [{ role: "user", content: prompt }],
    });

    const output = response.message.content;

    // Format for terminal
    console.log(formatForTerminal("LLM Response", output));

    // Send JSON back to client
    res.json({ output });
  } catch (error: any) {
    console.error(chalk.red("Error generating:"), error);
    res.status(500).json({ error: "Failed to generate text" });
  } finally {
    clearInterval(interval);
    console.log(chalk.magenta("Done! Waiting for the next prompt 😊"));
  }
});

function formatForTerminal(title: string, content: string): string {
  const width = process.stdout.columns || 80;
  const wrapped = wrapAnsi(content, width - 4, { hard: true });
  return `
    ${chalk.green("======================================")}
    ${chalk.blueBright(">>> " + title)}
    ${chalk.green("--------------------------------------")}
    ${wrapped}
    ${chalk.green("======================================")}
  `;
}
/**
 * This endpoint is to return a streaming response to an html front-end.
 */
router.get("/stream", async (req: Request, res: Response) => {
  const prompt = req.query.prompt as string;
  console.log("received a request for a prompt");
  if (!prompt) {
    res.status(400).end("Prompt required");
    return;
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders(); // important for SSE

  try {
    const stream = await ollama.chat({
      model: "llama3",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    for await (const part of stream) {
      const text = part.message?.content || "";

      // Send dot if blank (simulating your frontend dot display)
      if (text.trim() === "") {
        console.log('received a blank message');
      } else {
        res.write(`data: ${text}\n\n`);
      }
    }

    // SSE close event
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    res.write(`data: [Error: ${err}]\n\n`);
    res.end();
  }
});


export default router;
