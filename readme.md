# Node.js + MongoDB (Docker) Project Setup - Commands and Explanations

This markdown file summarizes **all the commands** along with clear **explanations**.

---

## 1. Create and Initialize Node.js Project

```bash
mkdir nodejs-exercise
cd nodejs-exercise
npm init -y
```

**Explanation:**
- Create a new project folder.
- Initialize a `package.json` file automatically.

---

## 2. Install Project Dependencies

```bash
npm install express mongoose cors
npm install --save-dev nodemon jest supertest
```

**Explanation:**
- Install **Express** for API routes.
- Install **Mongoose** to connect Node.js with MongoDB.
- Install **CORS** to allow frontend requests.
- Install **nodemon** for automatic server reload during development.
- Install **jest** and **supertest** for writing tests.

---

## 3. Set Up Docker MongoDB Container

```bash
docker run --name mongodb -d -p 27017:27017 mongo
```

**Explanation:**
- Pull and run the official **MongoDB Docker image**.
- Name the container `mongodb`.
- Bind port **27017** from the container to your local machine.

To check running containers:
```bash
docker ps
```

---

## 4. Start the Node.js Server

```bash
npm run dev
```

**Explanation:**
- Starts the server using **nodemon**.
- Watches for file changes and restarts automatically.

---

## 5. Basic CRUD Operations Implemented

| Method | Endpoint | Action |
|:-------|:---------|:-------|
| GET    | `/api/articles` | List all articles |
| GET    | `/api/articles/:id` | Get a single article |
| POST   | `/api/articles` | Create a new article |
| PUT    | `/api/articles/:id` | Update an article |
| DELETE | `/api/articles/:id` | Delete an article |

**Explanation:**
- We have built a full CRUD API using Express and MongoDB.
- Mongoose automatically handles collection creation when saving documents.

---

## 6. Frontend Interaction

Frontend (`index.html`) uses **JavaScript Fetch API** to:
- Load articles.
- Create new articles.
- Edit articles.
- Delete articles.

---

## 7. MongoDB Quick Access (Optional)

Connect to MongoDB inside Docker:

```bash
docker exec -it mongodb mongosh
```

Inside Mongo shell:
```bash
use testdb
show collections
db.articles.find().pretty()
```

**Explanation:**
- `mongosh` is MongoDB's shell.
- You can explore and query your database directly.

---

#  Project Status
- Node.js server running 
- MongoDB container running 
- Full CRUD API working 
- Frontend connected to backend 

---

#  Next Steps (Optional)
- Connect with MongoDB Compass (GUI for DB browsing)
- Dockerize Node.js app (Docker Compose)
- Add authentication (JWT)
- Prepare deployment to production (Render, Railway, Vercel)

---


