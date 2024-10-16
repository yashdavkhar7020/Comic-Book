// controllers/comicBookController.js
const ComicBook = require('../models/ComicBook');

// Create a new Comic Book
exports.createComicBook = async (req, res) => {
    try {
        const comic = new ComicBook(req.body);
        const savedComic = await comic.save();
        res.status(201).json(savedComic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Comic Books with Pagination, Filtering, Sorting
exports.getAllComicBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'bookName', order = 'asc', ...filters } = req.query;

        // Build filter object
        const filterObj = {};
        if (filters.authorName) filterObj.authorName = { $regex: filters.authorName, $options: 'i' };
        if (filters.yearOfPublication) filterObj.yearOfPublication = Number(filters.yearOfPublication);
        if (filters.condition) filterObj.condition = filters.condition;
        if (filters.price) filterObj.price = Number(filters.price);
        // Add more filters as needed

        const comics = await ComicBook.find(filterObj)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await ComicBook.countDocuments(filterObj);

        res.json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            comics,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Comic Book by ID
exports.getComicBookById = async (req, res) => {
    try {
        const comic = await ComicBook.findById(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic Book not found' });
        res.json(comic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Comic Book
exports.updateComicBook = async (req, res) => {
    try {
        const updatedComic = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedComic) return res.status(404).json({ message: 'Comic Book not found' });
        res.json(updatedComic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Comic Book
exports.deleteComicBook = async (req, res) => {
    try {
        const deletedComic = await ComicBook.findByIdAndDelete(req.params.id);
        if (!deletedComic) return res.status(404).json({ message: 'Comic Book not found' });
        res.json({ message: 'Comic Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
