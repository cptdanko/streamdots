# Streamdots: Streaming LLaMA responses with live dot indicator

---

## 📖 Overview

`streamdots` is a **Node.js + Express API built with TypeScript** that integrates with [Ollama](https://ollama.ai) to run LLaMA models.  
It demonstrates how to expose a `/generate/stream` endpoint that streams progress indicators (dots) to the client while the LLM processes a prompt, and then returns the generated output.  

p.s. this repo was built to have the inspiration to write [post 1 on My Day To-Do blog](https://mydaytodo.com/local-llm-api-ollama-llama3-nodejs-typescript/) and [post 2 on Medium.](https://medium.com/@bhuman.soni/building-real-time-ai-apps-with-ollama-llama-3-node-js-typescript-express-8629749a6bb9)

This repo is ideal if you want to learn:
- How to scaffold an Express + TypeScript project
- How to integrate LLaMA via Ollama
- How to use **Server-Sent Events (SSE)** for real‑time progress updates
- How to build a simple frontend that consumes streaming responses

---

## ⚙️ Setup Instructions

 **Clone the repo**
   ```bash
   git clone https://github.com/cptdanko/streamdots.git
   cd streamdots
   npm install
   ollama pull llama3
   npm run dev
  ```
### Test the API

- Visit http://localhost:3000/generate/stream?prompt=Hello world (SSE endpoint)

- Or open the included public/demo.html in your browser to see dots + output in action

## 🖥️ Demo
The included public/demo.html shows how to connect to the SSE endpoint from a simple HTML page. When you enter a prompt and click Generate, you’ll see:

Progress dots (.) streamed while the LLM is working

Final output text once the response is complete

A [DONE] marker when the stream ends

## 🗂️ Architecture
Here’s how the pieces fit together:


- Frontend: Sends prompt, listens for SSE messages (dots + output).

- Express Server: Streams progress indicators and final LLM response.

- Ollama: Runs the LLaMA model locally and returns generated text.


## 📚 Learn More
Want to dive deeper into JavaScript and Node.js concepts? Check out these posts on My Day To-Do Blog:

[Build Neural Network in JavaScript with Brain.js](https://mydaytodo.com/build-neural-network-javascript-brainjs/)

[Beginner’s Guide to Building AI Models with Synaptic.js (Step-by-Step Tutorial)](https://mydaytodo.com/how-to-build-ai-model-using-synapticjs-javascript-tutorial/)

[End to end UI testing with playwright](https://mydaytodo.com/playwright-for-end-to-end-ui-testing-a-complete-guide/)


Initializing a Node.js Project with TypeScript

These articles provide practical insights into JavaScript, Node.js, and TypeScript — the same stack powering this repo.

## ⭐ Support the Project
If you find this repo useful or fun, then sstar this repository ⭐ on GitHub to help others discover it

Share it with friends who are exploring Node.js, TypeScript, or LLM streaming

Contribute improvements via pull requests

