# 🏠 Node.js + MongoDB Real Estate Scraper App

This project is a **full-stack web app** that allows you to:
-  Scrape real estate listings from [Zimmo](https://www.zimmo.be)
-  Select and store specific listings
-  Add personal notes per listing
-  Display images, price, location, and links
-  Delete or edit saved listings
-  Save everything persistently in MongoDB

---

## Project Setup

### 1. Initialize the Project

```bash
mkdir real-estate-scraper
cd real-estate-scraper
npm init -y
```

### 2. Install Dependencies

```bash
npm install express mongoose cors puppeteer cheerio
npm install --save-dev nodemon
```

### 3. Run MongoDB with Docker

```bash
docker run --name mongodb -d -p 27017:27017 mongo
```

To verify it's running:

```bash
docker ps
```

### 4. Add Dev Script in `package.json`

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

Start your server:

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Route                      | Action                      |
|--------|----------------------------|-----------------------------|
| GET    | `/api/houses`             | Get all saved listings      |
| POST   | `/api/houses`             | Save a new listing          |
| DELETE | `/api/houses/:id`         | Delete a listing            |
| PUT    | `/api/houses/:id/note`    | Add/edit a personal note    |
| GET    | `/api/scrape`             | Scrape listings from Zimmo  |

---

## Frontend (`index.html`)

Uses JavaScript + Fetch API to:
- Load all saved listings
- Save a listing from the form or from scrape
- Delete or edit listings
- Add a **note** to saved listings
- Display title, location, image, price, link

**UI**: Built with Bootstrap 5

---

##  MongoDB Shell Access (Optional)

Connect to MongoDB running in Docker:

```bash
docker exec -it mongodb mongosh
```

Inside the shell:

```js
use testdb
show collections
db.houses.find().pretty()
```

---

##  Project Status

-  Express backend running
-  MongoDB container active
-  Zimmo scraping functional
-  Full CRUD API operational
-  Interactive frontend working

---

##  Optional Next Steps

- [ ] Dockerize the Node.js app with `docker-compose`
- [ ] Add authentication (JWT)
- [ ] Deploy the app (e.g. Render, Railway, Vercel)
- [ ] Enable multi-city scraping
- [ ] Connect MongoDB Compass for DB GUI

---



