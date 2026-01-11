# 📚 BookStore - Complete Book Store Application

A full-featured book store application built with Node.js, Express.js, HTML, CSS, and JavaScript. Features 25 curated books across multiple genres with a modern, responsive frontend and a RESTful API backend.

## 🌟 Features

### Frontend
- **Modern Responsive Design**: Beautiful, mobile-friendly interface
- **Book Gallery**: Display all 25 books in an attractive grid layout
- **Category Filtering**: Browse books by 8 different categories
- **Search Functionality**: Search books by title or author
- **Sorting Options**: Sort by price (low/high) or title (A-Z)
- **Shopping Cart**: Full cart functionality with quantity management
- **Book Details Modal**: Quick view of book information
- **Toast Notifications**: User feedback for actions
- **Smooth Animations**: Enhanced user experience

### Backend (API)
- **RESTful API**: Complete set of endpoints for books and cart
- **Book Management**: Get all books, by ID, by category, or search
- **Shopping Cart**: Add, update, remove items, and clear cart
- **Cart Persistence**: Server-side cart storage during session

## 📁 Project Structure

```
book-store/
├── package.json          # Project dependencies and scripts
├── server.js             # Express server with API routes
├── README.md             # This file
└── public/               # Frontend files
    ├── index.html        # Main HTML structure
    ├── styles.css        # Complete styling
    └── app.js            # Frontend JavaScript
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd "/Users/gyanmatrix/Desktop/book store 1"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to: `http://localhost:3000`

## 📚 Available Books (25 Total)

### Classic (3 books)
1. The Great Gatsby - $12.99
2. To Kill a Mockingbird - $14.99
3. The Catcher in the Rye - $10.99

### Fantasy (3 books)
4. The Hobbit - $15.99
5. Harry Potter and the Philosopher's Stone - $16.99
6. The Lord of the Rings - $25.99
7. To Kill a Kingdom - $13.99

### Thriller (4 books)
8. The Da Vinci Code - $14.99
9. The Girl with the Dragon Tattoo - $15.99
10. Gone Girl - $14.99
11. The Silent Patient - $16.99

### Science Fiction (3 books)
12. Dune - $16.99
13. Neuromancer - $14.99
14. Project Hail Mary - $18.99

### Dystopian (2 books)
15. 1984 - $11.99
16. Fahrenheit 451 - $11.99

### Romance (1 book)
17. Pride and Prejudice - $9.99

### Memoir (3 books)
18. Educated - $17.99
19. Becoming - $19.99
20. The Diary of a Young Girl - $9.99

### Self-Help (3 books)
21. Atomic Habits - $16.99
22. The 7 Habits of Highly Effective People - $15.99
23. The Power of Now - $13.99

### Psychology (1 book)
24. Thinking, Fast and Slow - $17.99

### Adventure (1 book)
25. The Alchemist - $12.99

## 🔗 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book by ID
- `GET /api/books/category/:category` - Get books by category
- `GET /api/books/search/:query` - Search books by title or author

### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

## 🎨 Categories

1. Classic - Timeless literary masterpieces
2. Fantasy - Magical worlds and adventures
3. Thriller - Heart-pounding suspense
4. Science Fiction - Futuristic adventures
5. Romance - Love stories that captivate
6. Dystopian - Alternate futures
7. Memoir - Personal stories and experiences
8. Self-Help - Personal growth and development

## 💻 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Client-side logic
- **Fetch API** - HTTP requests

## 🎯 Key Features

### Responsive Design
- Works on desktop, tablet, and mobile
- Mobile hamburger menu
- Touch-friendly cart interface

### User Experience
- Instant search results
- Smooth page transitions
- Loading states
- Error handling
- Empty state handling

### Shopping Cart
- Real-time cart updates
- Quantity adjustment (+/-)
- Individual item removal
- Clear cart functionality
- Total price calculation

## 🔧 Customization

### Adding New Books
Edit `server.js` and add new entries to the `books` array:

```javascript
{
    id: 26,
    title: "Your Book Title",
    author: "Author Name",
    price: 19.99,
    category: "Category Name",
    image: "https://example.com/cover.jpg",
    description: "Book description here."
}
```

### Changing Colors
Edit `public/styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
}
```

### Adding New Categories
1. Add category to book entries in `server.js`
2. Add category card in `public/index.html`
3. No API changes needed

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production
```bash
# Set environment variable
export PORT=80

# Start server
npm start
```

### Platform Deployment
- **Vercel/Netlify**: Add `server.js` as a serverless function
- **Heroku**: Use the Node.js buildpack
- **Docker**: Create Dockerfile with Node.js container

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- All the amazing authors whose books are featured
- Open Library for book covers and metadata
- The Node.js and Express.js communities

---

**Happy Reading! 📚**

