const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

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

// Mongoose Schema aggiornato
const HouseSchema = new mongoose.Schema({
    title: String,
    link: String,
    location: String,
    price: String,
    image: String,  // <-- Aggiunto
    note: String    // <-- Aggiunto
});
const House = mongoose.model('House', HouseSchema);

// Home
app.get('/', (req, res) => {
    res.send('Hello Immobilier Node.js!');
});

// Get all houses
app.get('/api/houses', async (req, res, next) => {
    try {
        const houses = await House.find();
        res.json(houses);
    } catch (err) {
        next(err);
    }
});

// Get house by ID
app.get('/api/houses/:id', async (req, res, next) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json(house);
    } catch (err) {
        next(err);
    }
});

// Create new house
app.post('/api/houses', async (req, res, next) => {
    try {
        const { title, link, location, price, image, note } = req.body;
        if (!title || !link) {
            return res.status(400).json({ message: 'Title and Link are required' });
        }
        const newHouse = new House({ title, link, location, price, image, note });
        await newHouse.save();
        res.status(201).json(newHouse);
    } catch (err) {
        next(err);
    }
});

// Update house (full)
app.put('/api/houses/:id', async (req, res, next) => {
    try {
        const { title, link, location, price, image, note } = req.body;
        const updatedHouse = await House.findByIdAndUpdate(
            req.params.id,
            { title, link, location, price, image, note },
            { new: true, runValidators: true }
        );
        if (!updatedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json(updatedHouse);
    } catch (err) {
        next(err);
    }
});

// Update ONLY note
app.put('/api/houses/:id/note', async (req, res, next) => {
    try {
        const { note } = req.body;
        const updatedHouse = await House.findByIdAndUpdate(
            req.params.id,
            { note },
            { new: true, runValidators: true }
        );
        if (!updatedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json(updatedHouse);
    } catch (err) {
        next(err);
    }
});

// Delete house
app.delete('/api/houses/:id', async (req, res, next) => {
    try {
        const deletedHouse = await House.findByIdAndDelete(req.params.id);
        if (!deletedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json({ message: 'House deleted successfully' });
    } catch (err) {
        next(err);
    }
});

// Scrape from Zimmo
app.get('/api/scrape', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');

        await page.goto('https://www.zimmo.be/fr/ixelles-1050/a-vendre/maison/', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        const html = await page.content();
        const $ = cheerio.load(html);

        const houses = [];

        $('.property-item').each((i, elem) => {
            const address = $(elem).find('.property-item_address').text().trim().toLowerCase();
            if (address.includes('1050 ixelles') || address.includes('1050 elsene')) {
                const title = $(elem).find('.property-item_title a').text().trim() || 'Sans titre';
                const link = 'https://www.zimmo.be' + ($(elem).find('.property-item_title a').attr('href') || '');
                const price = $(elem).find('.property-item_price').text().trim().replace(/\s+/g, ' ');
                const image = $(elem).find('.property-item_photo-container img').attr('src') || '';

                houses.push({ title, link, location: address, price, image });
            }
        });

        await browser.close();
        res.json(houses);

    } catch (err) {
        console.error('Zimmo scraping failed:', err.message);
        res.status(500).json({ message: 'Scraping error', error: err.message });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
