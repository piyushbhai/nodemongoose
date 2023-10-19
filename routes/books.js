const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const titleFilter = req.query.title || '';
    const authorFilter = req.query.author || '';
    const genreFilter = req.query.genre || '';
  
    try {
      const filter = {};
      if (titleFilter) filter.title = { $regex: titleFilter, $options: 'i' };
      if (authorFilter) filter.author = { $regex: authorFilter, $options: 'i' };
      if (genreFilter) filter.genre = { $regex: genreFilter, $options: 'i' };
  
      const books = await Book.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
  
      const totalBooks = await Book.countDocuments(filter);
  
      res.json({
        books,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Create a book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.year != null) {
    res.book.year = req.body.year;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted This Book' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
}

module.exports = router;
