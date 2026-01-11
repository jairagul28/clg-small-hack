// BookStore Frontend JavaScript

// Global variables
let allBooks = [];
let currentBooks = [];
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    loadCart();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search input enter key
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    // Close modal when clicking outside
    document.getElementById('bookModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Cart overlay click to close cart
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-overlay')) {
            toggleCart();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Load all books from API
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const result = await response.json();
        
        if (result.success) {
            allBooks = result.data;
            currentBooks = [...allBooks];
            displayBooks(currentBooks);
        }
    } catch (error) {
        console.error('Error loading books:', error);
        showToast('Error loading books. Please try again.');
    }
}

// Display books in the grid
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    
    if (books.length === 0) {
        booksGrid.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">📚</div>
                <h3>No books found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    booksGrid.innerHTML = books.map(book => `
        <div class="book-card" onclick="showBookDetails(${book.id})">
           <img src="${book.image}" alt="${book.title}" class="book-image"
     onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${book.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Show book details in modal
async function showBookDetails(bookId) {
    try {
        const response = await fetch(`/api/books/${bookId}`);
        const result = await response.json();
        
        if (result.success) {
            const book = result.data;
            const modalBody = document.getElementById('modalBody');
            
            modalBody.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="modal-image"
     onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">
                <div class="modal-info">
                    <h2>${book.title}</h2>
                    <p class="author">by ${book.author}</p>
                    <span class="category">${book.category}</span>
                    <p class="description">${book.description}</p>
                    <p class="price">$${book.price.toFixed(2)}</p>
                    <button class="modal-add-btn" onclick="addToCart(${book.id}); closeModal();">
                        Add to Cart
                    </button>
                </div>
            `;
            
            document.getElementById('bookModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        showToast('Error loading book details.');
    }
}

// Close modal
function closeModal() {
    document.getElementById('bookModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add book to cart
async function addToCart(bookId, quantity = 1) {
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookId, quantity })
        });
        
        const result = await response.json();
        
        if (result.success) {
            cart = result.data;
            updateCartUI();
            showToast('Book added to cart!');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding book to cart.');
    }
}

// Load cart from API
async function loadCart() {
    try {
        const response = await fetch('/api/cart');
        const result = await response.json();
        
        if (result.success) {
            cart = result.data;
            updateCartUI();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some books to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
               <img src="${item.image}" alt="${item.title}" class="cart-item-image"
     onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        `).join('');
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update cart item quantity
async function updateQuantity(bookId, change) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        await removeFromCart(bookId);
        return;
    }
    
    try {
        const response = await fetch(`/api/cart/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });
        
        const result = await response.json();
        
        if (result.success) {
            cart = result.data;
            updateCartUI();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        showToast('Error updating quantity.');
    }
}

// Remove item from cart
async function removeFromCart(bookId) {
    try {
        const response = await fetch(`/api/cart/${bookId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            cart = result.data;
            updateCartUI();
            showToast('Item removed from cart');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        showToast('Error removing item from cart.');
    }
}

// Clear entire cart
async function clearCart() {
    try {
        const response = await fetch('/api/cart', {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            cart = [];
            updateCartUI();
            showToast('Cart cleared');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        showToast('Error clearing cart.');
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    
    // Create or remove overlay
    let overlay = document.querySelector('.cart-overlay');
    if (cartSidebar.classList.contains('active')) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'cart-overlay';
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
    } else {
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\n\nTotal: $${total.toFixed(2)}\n\nThis is a demo - no actual payment will be processed.`);
    
    // Clear cart after checkout
    clearCart();
    toggleCart();
}

// Filter books by category
async function filterByCategory(category) {
    try {
        const response = await fetch(`/api/books/category/${category}`);
        const result = await response.json();
        
        if (result.success) {
            currentBooks = result.data;
            displayBooks(currentBooks);
            
            // Update filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Scroll to books section
            document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error filtering by category:', error);
        showToast('Error filtering books.');
    }
}

// Show all books
function showAllBooks() {
    currentBooks = [...allBooks];
    displayBooks(currentBooks);
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn').classList.add('active');
    
    // Scroll to books section
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}

// Sort books
function sortBooks(sortType) {
    let sortedBooks = [...currentBooks];
    
    switch (sortType) {
        case 'price-low':
            sortedBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedBooks.sort((a, b) => b.price - a.price);
            break;
        case 'title':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    displayBooks(sortedBooks);
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Search books
async function searchBooks() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        showAllBooks();
        return;
    }
    
    try {
        const response = await fetch(`/api/books/search/${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (result.success) {
            currentBooks = result.data;
            displayBooks(currentBooks);
            
            // Scroll to books section
            document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error searching books:', error);
        showToast('Error searching books.');
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    showToast('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
});

