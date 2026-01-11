const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Book data with 25 books
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, category: "Classic", image: "/images/Great.jpg"},

  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14.99, category: "Classic", image: "/images/to-kill-a-mockingbird.jpg" },

  { id: 3, title: "1984", author: "George Orwell", price: 11.99, category: "Dystopian", image: "/images/1984.jpg" },

  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 9.99, category: "Romance", image: "/images/pride.jpg" },

  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 10.99, category: "Classic", image: "/images/catcher.jpg" },

  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", price: 15.99, category: "Fantasy", image: "/images/hobbit.jpg" },

  { id: 7, title: "Fahrenheit 451", author: "Ray Bradbury", price: 11.99, category: "Dystopian", image: "/images/farenh.jpg" },

  { id: 8, title: "The Alchemist", author: "Paulo Coelho", price: 12.99, category: "Adventure", image: "/images/alch.jpg" },

  { id: 9, title: "The Da Vinci Code", author: "Dan Brown", price: 14.99, category: "Thriller", image: "/images/dan.jpg" },

  { id: 10, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", price: 16.99, category: "Fantasy", image: "/images/harry.jpg" },

  { id: 11, title: "The Lord of the Rings", author: "J.R.R. Tolkien", price: 25.99, category: "Fantasy", image: "/images/lord.jpg" },

  { id: 12, title: "To Kill a Kingdom", author: "Alexandra Christo", price: 13.99, category: "Fantasy", image: "/images/kill.jpg" },

  { id: 13, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", price: 15.99, category: "Thriller", image: "/images/dragon.jpg" },

  { id: 14, title: "Gone Girl", author: "Gillian Flynn", price: 14.99, category: "Thriller", image: "/images/gone.jpg" },

  { id: 15, title: "The Silent Patient", author: "Alex Michaelides", price: 16.99, category: "Thriller", image: "/images/silent.jpg" },

  { id: 16, title: "Educated", author: "Tara Westover", price: 17.99, category: "Memoir", image: "/images/edu.jpg" },

  { id: 17, title: "Becoming", author: "Michelle Obama", price: 19.99, category: "Memoir", image: "/images/become.jpg" },

  { id: 18, title: "The Diary of a Young Girl", author: "Anne Frank", price: 9.99, category: "Memoir", image: "/images/diary.jpg" },

  { id: 19, title: "Dune", author: "Frank Herbert", price: 16.99, category: "Science Fiction", image: "/images/dune.jpg" },

  { id: 20, title: "Neuromancer", author: "William Gibson", price: 14.99, category: "Science Fiction", image: "/images/neur.jpg" },

  { id: 21, title: "Project Hail Mary", author: "Andy Weir", price: 18.99, category: "Science Fiction", image: "/images/mary.jpg" },

  { id: 22, title: "Atomic Habits", author: "James Clear", price: 16.99, category: "Self-Help", image: "/images/atomic.jpg" },

  { id: 23, title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 15.99, category: "Self-Help", image: "/images/7.jpg" },

  { id: 24, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 17.99, category: "Psychology", image: "/images/think.jpg" },

  { id: 25, title: "The Power of Now", author: "Eckhart Tolle", price: 13.99, category: "Self-Help", image: "/images/power.jpg" }
];


// Cart array to store items
let cart = [];

// API Routes

// Get all books
app.get('/api/books', (req, res) => {
    res.json({
        success: true,
        data: books,
        count: books.length
    });
});

// Get single book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    
    if (book) {
        res.json({
            success: true,
            data: book
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
});

// Get books by category
app.get('/api/books/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredBooks = books.filter(book => 
        book.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json({
        success: true,
        data: filteredBooks,
        count: filteredBooks.length
    });
});

// Search books
app.get('/api/books/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const searchResults = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    
    res.json({
        success: true,
        data: searchResults,
        count: searchResults.length
    });
});

// Cart Routes

// Get cart
app.get('/api/cart', (req, res) => {
    res.json({
        success: true,
        data: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
});

// Add to cart
app.post('/api/cart', (req, res) => {
    const { bookId, quantity = 1 } = req.body;
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...book,
            quantity
        });
    }
    
    res.json({
        success: true,
        message: 'Book added to cart',
        data: cart,
        cartTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
});

// Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { quantity } = req.body;
    
    const cartItem = cart.find(item => item.id === bookId);
    
    if (!cartItem) {
        return res.status(404).json({
            success: false,
            message: 'Item not found in cart'
        });
    }
    
    if (quantity <= 0) {
        cart = cart.filter(item => item.id !== bookId);
    } else {
        cartItem.quantity = quantity;
    }
    
    res.json({
        success: true,
        data: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== bookId);
    
    res.json({
        success: true,
        message: 'Item removed from cart',
        data: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
    cart = [];
    
    res.json({
        success: true,
        message: 'Cart cleared',
        data: cart,
        total: 0
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Book Store Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

