# Uvicorn
Uvicorn is a lightweight ASGI web server used to run FastAPI apps (similar to how node index.js runs an Express server).

## ⚡ Why We Use Uvicorn

We use Uvicorn to run the FastAPI backend server.
FastAPI itself is just a framework — it defines endpoints, routes, and logic — but it can’t actually serve HTTP requests on its own.

That’s where Uvicorn comes in.

## ⚙️ What Uvicorn Does

1. **ASGI Server**: Uvicorn is an ASGI (Asynchronous Server Gateway Interface) server, built to run modern async frameworks like FastAPI.
2. **Handles Requests**: It listens for incoming HTTP requests, passes them to FastAPI, and sends responses back to the client.
3. **High Performance**: It’s extremely fast, lightweight, and designed for concurrent connections (perfect for APIs and AI workloads).
4. **Hot Reload (Development Mode)**: The --reload flag restarts the server automatically when you change your code — no need to stop/start manually.

 ---
### 🛠️ Example Command
```
uvicorn app:app --reload
```
| Part       | Meaning                                              |
| ---------- | ---------------------------------------------------- |
| `app`      | Python filename (`app.py`)                           |
| `:app`     | FastAPI instance inside the file (`app = FastAPI()`) |
| `--reload` | Auto-reload during development                       |

### Running

Once you run:
```
uvicorn app:app --reload
```

You’ll see something like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

- Your FastAPI backend is live at localhost:8000
- http://127.0.0.1:8000/docs → Swagger UI to test endpoints
- http://127.0.0.1:8000/ → Base URL (if any routes defined)
