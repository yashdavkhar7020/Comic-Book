// routes/comicBookRoutes.js
const express = require('express');
const router = express.Router();
const comicBookController = require('../controllers/comicBookController');

// Create a new Comic Book
router.post('/', comicBookController.createComicBook);

// Get all Comic Books
router.get('/', comicBookController.getAllComicBooks);

// Get a single Comic Book by ID
router.get('/:id', comicBookController.getComicBookById);

// Update a Comic Book
router.put('/:id', comicBookController.updateComicBook);

// Delete a Comic Book
router.delete('/:id', comicBookController.deleteComicBook);

module.exports = router;
