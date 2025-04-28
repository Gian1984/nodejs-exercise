const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String
});
const Article = mongoose.model('Article', ArticleSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Hello Politico Node.js Test!');
});

// Get all articles
app.get('/api/articles', async (req, res, next) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        next(err);
    }
});

// Get single article by ID
app.get('/api/articles/:id', async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        next(err);
    }
});

// Create new article
app.post('/api/articles', async (req, res, next) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ message: 'Title and Author are required' });
        }
        const newArticle = new Article({ title, author });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        next(err);
    }
});

// ✏️ Update article by ID
app.put('/api/articles/:id', async (req, res, next) => {
    try {
        const { title, author } = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { title, author },
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (err) {
        next(err);
    }
});

// Delete article by ID
app.delete('/api/articles/:id', async (req, res, next) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

