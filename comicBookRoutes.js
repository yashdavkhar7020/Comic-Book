// routes/comicBookRoutes.js
const express = require('express');
const router = express.Router();
const comicBookController = require('../controllers/comicBookController');


router.post('/', comicBookController.createComicBook);

router.get('/', comicBookController.getAllComicBooks);

router.get('/:id', comicBookController.getComicBookById);

router.put('/:id', comicBookController.updateComicBook);

router.delete('/:id', comicBookController.deleteComicBook);

module.exports = router;
