"""
BookStore - A full-featured book store application built with Python Flask
"""

from flask import Flask, jsonify, request, send_from_directory, render_template
import os

app = Flask(__name__, template_folder='templates', static_folder='public')

# Book data with 25 books
books = [
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 12.99,
        "category": "Classic",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
        "description": "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
    },
    {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 14.99,
        "category": "Classic",
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird.jpg",
        "description": "A novel about the serious issues of rape and racial inequality told through young eyes."
    },
    {
        "id": 3,
        "title": "1984",
        "author": "George Orwell",
        "price": 11.99,
        "category": "Dystopian",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
        "description": "A dystopian novel set in a totalitarian society, following Winston Smith."
    },
    {
        "id": 4,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "price": 9.99,
        "category": "Romance",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/Pride_and_Prejudice.jpg",
        "description": "A romantic novel following Elizabeth Bennet as she deals with issues of manners and marriage."
    },
    {
        "id": 5,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "price": 10.99,
        "category": "Classic",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8c/The_Catcher_in_the_Rye_%281951%29_first_edition_cover.jpg",
        "description": "A story about teenage alienation and loss of innocence in the protagonist Holden Caulfield."
    },
    {
        "id": 6,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "price": 15.99,
        "category": "Fantasy",
        "image": "https://upload.wikimedia.org/wikipedia/commons/3/3e/The_Hobbit_cover.jpg",
        "description": "Bilbo Baggins' unexpected journey to help a group of dwarves reclaim their mountain home."
    },
    {
        "id": 7,
        "title": "Fahrenheit 451",
        "author": "Ray Bradbury",
        "price": 11.99,
        "category": "Dystopian",
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Fahrenheit_451_cover.jpg",
        "description": "In a future where books are banned and burned, one fireman begins to question his role."
    },
    {
        "id": 8,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 12.99,
        "category": "Adventure",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/O_Alquimista.jpg",
        "description": "A shepherd boy named Santiago follows his dream of finding a treasure."
    },
    {
        "id": 9,
        "title": "The Da Vinci Code",
        "author": "Dan Brown",
        "price": 14.99,
        "category": "Thriller",
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/The_Da_Vinci_Code.jpg",
        "description": "A symbologist races to solve a murder and uncover a secret that could shake the foundations of Christianity."
    },
    {
        "id": 10,
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "price": 16.99,
        "category": "Fantasy",
        "image": "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        "description": "Harry Potter discovers he's a wizard on his eleventh birthday and begins his magical education."
    },
    {
        "id": 11,
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "price": 25.99,
        "category": "Fantasy",
        "image": "https://upload.wikimedia.org/wikipedia/en/e/e9/Lord_of_the_Rings_single_volume.jpg",
        "description": "An epic high-fantasy novel following the quest to destroy the One Ring."
    },
    {
        "id": 12,
        "title": "To Kill a Kingdom",
        "author": "Alexandra Christo",
        "price": 13.99,
        "category": "Fantasy",
        "image": "https://upload.wikimedia.org/wikipedia/en/4/4c/To_Kill_a_Kingdom.jpg",
        "description": "A dark retelling of The Little Mermaid with a siren princess and a prince who hunts her kind."
    },
    {
        "id": 13,
        "title": "The Girl with the Dragon Tattoo",
        "author": "Stieg Larsson",
        "price": 15.99,
        "category": "Thriller",
        "image": "https://upload.wikimedia.org/wikipedia/en/5/55/The_Girl_with_the_Dragon_Tattoo.jpg",
        "description": "A journalist and a hacker investigate a forty-year-old disappearance of a wealthy patriarch's niece."
    },
    {
        "id": 14,
        "title": "Gone Girl",
        "author": "Gillian Flynn",
        "price": 14.99,
        "category": "Thriller",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/10/Gone_Girl_2012_novel_cover.jpg",
        "description": "A marriage becomes a war as a wife disappears and her husband becomes the prime suspect."
    },
    {
        "id": 15,
        "title": "The Silent Patient",
        "author": "Alex Michaelides",
        "price": 16.99,
        "category": "Thriller",
        "image": "https://upload.wikimedia.org/wikipedia/en/6/6b/The_Silent_Patient.jpg",
        "description": "A woman shoots her husband five times and then never speaks another word."
    },
    {
        "id": 16,
        "title": "Educated",
        "author": "Tara Westover",
        "price": 17.99,
        "category": "Memoir",
        "image": "https://upload.wikimedia.org/wikipedia/en/a/a3/Educated_%28Westover%29.jpg",
        "description": "A memoir of a young girl who leaves her survivalist family and goes on to earn a PhD."
    },
    {
        "id": 17,
        "title": "Becoming",
        "author": "Michelle Obama",
        "price": 19.99,
        "category": "Memoir",
        "image": "https://upload.wikimedia.org/wikipedia/en/4/43/Becoming_%28Michelle_Obama_book%29_cover.jpg",
        "description": "The former First Lady chronicles her journey from Chicago's South Side to the White House."
    },
    {
        "id": 18,
        "title": "The Diary of a Young Girl",
        "author": "Anne Frank",
        "price": 9.99,
        "category": "Memoir",
        "image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Anne_Frank_Diary.jpg",
        "description": "A diary written by a Jewish girl hiding during the Nazi occupation of Amsterdam."
    },
    {
        "id": 19,
        "title": "Dune",
        "author": "Frank Herbert",
        "price": 16.99,
        "category": "Science Fiction",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/de/Dune_%281965%29_Edition_Cover.jpg",
        "description": "Set in the distant future amidst a feudal interstellar society, following Paul Atreides."
    },
    {
        "id": 20,
        "title": "Neuromancer",
        "author": "William Gibson",
        "price": 14.99,
        "category": "Science Fiction",
        "image": "https://upload.wikimedia.org/wikipedia/en/4/40/Neuromancer.jpg",
        "description": "A cyberspace cowboy is hired for one last hack in this pioneering cyberpunk novel."
    },
    {
        "id": 21,
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "price": 18.99,
        "category": "Science Fiction",
        "image": "https://upload.wikimedia.org/wikipedia/en/c/c3/Project_Hail_Mary_%28Weir%29.jpg",
        "description": "A lone astronaut must save Earth from disaster with the help of an alien friend."
    },
    {
        "id": 22,
        "title": "Atomic Habits",
        "author": "James Clear",
        "price": 16.99,
        "category": "Self-Help",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/11/Atomic_Habits.jpg",
        "description": "An easy and proven way to build good habits and break bad ones."
    },
    {
        "id": 23,
        "title": "The 7 Habits of Highly Effective People",
        "author": "Stephen R. Covey",
        "price": 15.99,
        "category": "Self-Help",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/7d/The_7_Habits_of_Highly_Effective_People.jpg",
        "description": "A self-improvement book that presents a principle-centered approach for solving personal problems."
    },
    {
        "id": 24,
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "price": 17.99,
        "category": "Psychology",
        "image": "https://upload.wikimedia.org/wikipedia/en/5/5e/Thinking%2C_Fast_and_Slow.jpg",
        "description": "A tour of the mind explaining the two systems that drive the way we think."
    },
    {
        "id": 25,
        "title": "The Power of Now",
        "author": "Eckhart Tolle",
        "price": 13.99,
        "category": "Self-Help",
        "image": "https://upload.wikimedia.org/wikipedia/en/2/26/The_Power_of_Now.jpg",
        "description": "A guide to spiritual enlightenment through living in the present moment."
    }
]

# Cart storage (in-memory)
cart = []

# Create templates folder and move HTML
templates_dir = os.path.join(os.path.dirname(__file__), 'templates')
os.makedirs(templates_dir, exist_ok=True)

# API Routes

@app.route('/api/books', methods=['GET'])
def get_all_books():
    """Get all books"""
    return jsonify({
        "success": True,
        "data": books,
        "count": len(books)
    })

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    """Get single book by ID"""
    book = next((b for b in books if b['id'] == book_id), None)
    if book:
        return jsonify({
            "success": True,
            "data": book
        })
    return jsonify({
        "success": False,
        "message": "Book not found"
    }), 404

@app.route('/api/books/category/<category>', methods=['GET'])
def get_books_by_category(category):
    """Get books by category"""
    filtered_books = [b for b in books if b['category'].lower() == category.lower()]
    return jsonify({
        "success": True,
        "data": filtered_books,
        "count": len(filtered_books)
    })

@app.route('/api/books/search/<query>', methods=['GET'])
def search_books(query):
    """Search books by title or author"""
    query = query.lower()
    search_results = [b for b in books if query in b['title'].lower() or query in b['author'].lower()]
    return jsonify({
        "success": True,
        "data": search_results,
        "count": len(search_results)
    })

# Cart Routes

@app.route('/api/cart', methods=['GET'])
def get_cart():
    """Get current cart"""
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({
        "success": True,
        "data": cart,
        "total": total
    })

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    """Add item to cart"""
    data = request.get_json()
    book_id = data.get('bookId')
    quantity = data.get('quantity', 1)
    
    book = next((b for b in books if b['id'] == book_id), None)
    if not book:
        return jsonify({
            "success": False,
            "message": "Book not found"
        }), 404
    
    existing_item = next((item for item in cart if item['id'] == book_id), None)
    if existing_item:
        existing_item['quantity'] += quantity
    else:
        cart.append({
            **book,
            'quantity': quantity
        })
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({
        "success": True,
        "message": "Book added to cart",
        "data": cart,
        "cartTotal": total
    })

@app.route('/api/cart/<int:book_id>', methods=['PUT'])
def update_cart_quantity(book_id):
    """Update cart item quantity"""
    data = request.get_json()
    quantity = data.get('quantity')
    
    cart_item = next((item for item in cart if item['id'] == book_id), None)
    if not cart_item:
        return jsonify({
            "success": False,
            "message": "Item not found in cart"
        }), 404
    
    if quantity <= 0:
        cart[:] = [item for item in cart if item['id'] != book_id]
    else:
        cart_item['quantity'] = quantity
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({
        "success": True,
        "data": cart,
        "total": total
    })

@app.route('/api/cart/<int:book_id>', methods=['DELETE'])
def remove_from_cart(book_id):
    """Remove item from cart"""
    cart[:] = [item for item in cart if item['id'] != book_id]
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({
        "success": True,
        "message": "Item removed from cart",
        "data": cart,
        "total": total
    })

@app.route('/api/cart', methods=['DELETE'])
def clear_cart():
    """Clear entire cart"""
    cart.clear()
    return jsonify({
        "success": True,
        "message": "Cart cleared",
        "data": cart,
        "total": 0
    })

# Serve the main page
@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('public', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('public', filename)

if __name__ == '__main__':
    print("=" * 60)
    print("📚 BookStore - Flask Server")
    print("=" * 60)
    print("Server running at: http://localhost:5000")
    print("API endpoints: http://localhost:5000/api")
    print("=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)

