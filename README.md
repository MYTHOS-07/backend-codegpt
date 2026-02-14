# Backend CodeGPT

A lightweight Express + MongoDB backend for a chat assistant. It stores chat threads in MongoDB and calls the OpenAI Chat Completions API to generate assistant replies.

## What this project does

- Accepts a message and thread ID, then creates or updates a chat thread
- Calls OpenAI for an assistant response
- Stores the user/assistant messages in MongoDB
- Lists, reads, and deletes chat threads

## Tech stack and where it is used

- Node.js (ES modules): runtime for the server
- Express: HTTP server, routing, and middleware
- MongoDB + Mongoose: database and schema modeling
- dotenv: load environment variables
- CORS: allow cross-origin requests
- OpenAI API: chat completions for assistant replies

## Project structure and responsibilities

```
backend-codegpt/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── middlewares/
│   │   └── logger.js
│   ├── routes/
│   │   └── chatRoute.js
│   ├── controllers/
│   │   └── chat.controller.js
│   ├── service/
│   │   └── chat.service.js
│   ├── models/
│   │   └── Thread.js
│   ├── utils/
│   │   └── openAi.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

- [src/server.js](src/server.js)
  - App entry point: sets up Express, middleware, routes, and starts the server
- [src/config/config.js](src/config/config.js)
  - Centralized configuration: reads env vars (name, port, MongoDB URL, OpenAI key)
- [src/config/db.js](src/config/db.js)
  - Mongoose connection helper
- [src/middlewares/logger.js](src/middlewares/logger.js)
  - Simple request logger middleware
- [src/routes/chatRoute.js](src/routes/chatRoute.js)
  - API routes for chat/thread operations
- [src/controllers/chat.controller.js](src/controllers/chat.controller.js)
  - Request validation and response formatting
- [src/service/chat.service.js](src/service/chat.service.js)
  - Core business logic: create chat, call OpenAI, persist threads
- [src/models/Thread.js](src/models/Thread.js)
  - Mongoose schemas for threads and messages
- [src/utils/openAi.js](src/utils/openAi.js)
  - Calls OpenAI Chat Completions API and returns the assistant content

## API endpoints

Base path: `/api`

- `POST /api/test`
  - Saves the request body into a new Thread document (basic validation example)
- `POST /api/chat`
  - Body: `{ "threadId": "abc", "message": "Hello" }`
  - Creates or updates a thread, calls OpenAI, returns the assistant reply
- `GET /api/thread`
  - Returns all chat threads (latest first)
- `GET /api/thread/:threadId`
  - Returns the messages for a single thread
- `DELETE /api/thread/:threadId`
  - Deletes a thread by ID

## Environment variables

Create a `.env` file in the project root:

```env
NAME=MYTHOS GPT
VERSION=1.0
PORT=3000
MONGODB_URL=mongodb://localhost:27017/codegpt
OPENAI_API_KEY=your_openai_api_key
```

## Run locally

```bash
npm install
npm run dev
```

## Sample request

```bash
curl -X POST http://localhost:3000/api/chat \
	-H "Content-Type: application/json" \
	-d "{\"threadId\":\"demo-1\",\"message\":\"Hello there\"}"
```

## What I learn by building this Project

- Structure an Express backend with routes, controllers, services, and models
- Use Mongoose schemas and persist nested message arrays
- Integrate third-party APIs (OpenAI) and handle HTTP errors
- Manage configuration with environment variables
- Build simple middleware (request logging)

## Notes

- Node.js 18+ is recommended because it includes built-in `fetch` used by the OpenAI utility.
- If the OpenAI request fails, the service returns `null` to prevent a crash; you may want to improve error handling for production use.
