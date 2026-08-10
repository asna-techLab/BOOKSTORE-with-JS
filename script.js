// ============================================
// 1. DEMO BOOK INVENTORY
// ============================================

// This is an array of book objects.
// Each object represents one book.

const demoBooks = [

    {
        id: 1,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 550,
        rating: 4.8,
        stock: 10,
        image: "images/hobbit.jfif"
    },

    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 600,
        rating: 4.6,
        stock: 15,
        image: "images/1984.jfif"
    },

    {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 840,
        rating: 4.9,
        stock: 8,
        image: "images/mockingbird.jfif"
    },

    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 450,
        rating: 4.5,
        stock: 20,
        image: "images/gatsby.jfif"
    },

    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 1020,
        rating: 4.7,
        stock: 12,
        image: "images/pride.jfif"
    }

];

// ============================================
// 2. BOOKSTORE CLASS
// ============================================

class BookStore {

    // ----------------------------------------
    // Constructor
    // ----------------------------------------

    constructor(books) {

        // Store all books inside this.books
        this.books = books;

        // Empty shopping cart
        this.cart = [];

    }


    // ----------------------------------------
    // Search books
    // ----------------------------------------

    searchBook(query) {

        // Convert search text to lowercase
        const searchText = query.toLowerCase().trim();

        // If search box is empty,
        // return all books
        if (searchText === "") {
            return this.books;
        }

        // filter() creates a new array
        // containing matching books

        return this.books.filter(book => {

            return (
                book.title.toLowerCase().includes(searchText) ||

                book.author.toLowerCase().includes(searchText)
            );

        });

    }


    // ----------------------------------------
    // Find a book by ID
    // ----------------------------------------

    getBook(bookId) {

        return this.books.find(book => {
            return book.id === bookId;
        });

    }


    // ----------------------------------------
    // Add book to cart
    // ----------------------------------------

    addToCart(bookId) {

        // Find the book
        const book = this.getBook(bookId);

        // If book doesn't exist
        if (!book) {
            return false;
        }

        // Check stock
        if (book.stock <= 0) {

            alert("Sorry, this book is out of stock.");

            return false;
        }


        // Check if book already exists in cart
        const existingItem = this.cart.find(item => {
            return item.id === bookId;
        });


        // If book already exists
        if (existingItem) {

            existingItem.quantity++;

        }

        // Otherwise add new item
        else {

            this.cart.push({
                ...book,
                quantity: 1
            });

        }


        // Reduce inventory
        book.stock--;

        return true;
    }


    // ----------------------------------------
    // Remove book completely from cart
    // ----------------------------------------

    removeFromCart(bookId) {

        // Find item in cart
        const item = this.cart.find(item => {
            return item.id === bookId;
        });

        // If item doesn't exist
        if (!item) {
            return;
        }


        // Return its quantity back to inventory
        const book = this.getBook(bookId);

        book.stock += item.quantity;


        // Remove from cart
        this.cart = this.cart.filter(item => {
            return item.id !== bookId;
        });

    }


    // ----------------------------------------
    // Increase quantity
    // ----------------------------------------

    increaseQuantity(bookId) {

        const book = this.getBook(bookId);

        const cartItem = this.cart.find(item => {
            return item.id === bookId;
        });


        // Check if book is available
        if (!book || !cartItem) {
            return;
        }


        // Check stock
        if (book.stock <= 0) {

            alert("No more copies available.");

            return;
        }


        // Increase quantity
        cartItem.quantity++;

        // Reduce stock
        book.stock--;

    }


    // ----------------------------------------
    // Decrease quantity
    // ----------------------------------------

    decreaseQuantity(bookId) {

        const cartItem = this.cart.find(item => {
            return item.id === bookId;
        });

        const book = this.getBook(bookId);


        if (!cartItem || !book) {
            return;
        }


        // Return one book to inventory
        book.stock++;


        // Decrease quantity
        cartItem.quantity--;


        // If quantity becomes zero
        // remove item from cart
        if (cartItem.quantity <= 0) {

            this.cart = this.cart.filter(item => {
                return item.id !== bookId;
            });

        }

    }


    // ----------------------------------------
    // Get total quantity in cart
    // ----------------------------------------

    getCartCount() {

        return this.cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    }


    // ----------------------------------------
    // Calculate total price
    // ----------------------------------------

    getTotal() {

        return this.cart.reduce(
            (total, item) => {

                return total +
                    item.price * item.quantity;

            },
            0
        );

    }


    // ----------------------------------------
    // Get best sellers
    // ----------------------------------------

    getBestSellers(limit = 5) {

        // [...this.books] creates a copy
        // so the original array isn't changed

        return [...this.books]

            // Sort highest rating first
            .sort((a, b) => {
                return b.rating - a.rating;
            })

            // Get first 5 books
            .slice(0, limit);

    }

}

// ============================================
// 3. CREATE BOOKSTORE OBJECT
// ============================================

const store = new BookStore(demoBooks);

console.log(store.books);

// ============================================
// 4. UI CLASS
// ============================================

class UI {

    constructor(store) {

        // Save BookStore object
        this.store = store;


        // ------------------------------------
        // Get HTML elements
        // ------------------------------------

        this.bookList =
            document.getElementById("bookList");

        this.searchInput =
            document.getElementById("searchInput");

        this.searchBtn =
            document.getElementById("searchBtn");

        this.cartBtn =
            document.getElementById("cartBtn");

        this.cartPanel =
            document.getElementById("cartPanel");

        this.closeCart =
            document.getElementById("closeCart");

        this.cartItems =
            document.getElementById("cartItems");

        this.cartCount =
            document.getElementById("cartCount");

        this.cartTotal =
            document.getElementById("cartTotal");


        // Best sellers section
        this.bestSellerList =
            document.querySelector(
                "#bestsellers .book-grid"
            );


        // Inventory count
        this.inventoryCount =
            document.querySelector(
                ".inventory-count"
            );


        // ------------------------------------
        // Bind methods
        // ------------------------------------

        this.handleSearch =
            this.handleSearch.bind(this);

        this.handleBookClick =
            this.handleBookClick.bind(this);

        this.handleCartClick =
            this.handleCartClick.bind(this);


        // ------------------------------------
        // Start application
        // ------------------------------------

        this.bindEvents();

        this.renderInventory();

        this.renderBestSellers();

        this.renderCart();

    }


    // ========================================
    // BIND EVENTS
    // ========================================

    bindEvents() {

        // Search while typing
        this.searchInput.addEventListener(
            "input",
            this.handleSearch
        );


        // Search button
        this.searchBtn.addEventListener(
            "click",
            this.handleSearch
        );


        // Open cart
        this.cartBtn.addEventListener(
            "click",
            () => {

                this.cartPanel.classList.add(
                    "active"
                );

            }
        );


        // Close cart
        this.closeCart.addEventListener(
            "click",
            () => {

                this.cartPanel.classList.remove(
                    "active"
                );

            }
        );


        // Book buttons
        this.bookList.addEventListener(
            "click",
            this.handleBookClick
        );


        // Cart buttons
        this.cartItems.addEventListener(
            "click",
            this.handleCartClick
        );

    }


    // ========================================
    // SEARCH
    // ========================================

    handleSearch(event) {

        // Prevent unwanted form behavior
        if (event) {
            event.preventDefault();
        }


        // Get search text
        const query =
            this.searchInput.value;


        // Search through bookstore
        const results =
            this.store.searchBook(query);


        // Display results
        this.renderInventory(results);

    }


    // ========================================
    // RENDER INVENTORY
    // ========================================

    renderInventory(books = this.store.books) {

        // Update inventory count
        this.inventoryCount.textContent =
            `${books.length} Books Available`;


        // If no books found
        if (books.length === 0) {

            this.bookList.innerHTML = `
                <div class="no-results">
                    <h3>No books found</h3>
                    <p>Try another search.</p>
                </div>
            `;

            return;
        }


        // Create HTML for every book

        this.bookList.innerHTML = books.map(book => {

            return `

                <article class="book-card">

                    <div class="book-image">

                    <img
        src="${book.image}"
        alt="${book.title}"
                    >
</div>

                    <div class="book-info">

                        <h3>
                            ${book.title}
                        </h3>

                        <p class="author">
                            ${book.author}
                        </p>

                        <div class="rating">
                            ★★★★★
                            <span>
                                ${book.rating}
                            </span>
                        </div>


                        <p>
                            Stock:
                            <strong>
                                ${book.stock}
                            </strong>
                        </p>


                        <div class="book-bottom">

                            <strong>
                                Rs.${book.price.toFixed(2)}
                            </strong>

                            <button
                                class="add-cart"
                                data-id="${book.id}"
                                ${book.stock === 0 ? "disabled" : ""}
                            >

                                ${
                                    book.stock === 0
                                    ? "Out of Stock"
                                    : "Add to Cart"
                                }

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

    }


    // ========================================
    // HANDLE BOOK BUTTON
    // ========================================

    handleBookClick(event) {

        // Check whether clicked element
        // is an Add to Cart button

        if (
            !event.target.classList.contains(
                "add-cart"
            )
        ) {
            return;
        }


        // Get book ID from data-id

        const bookId =
            Number(event.target.dataset.id);


        // Add book to cart

        const added =
            this.store.addToCart(bookId);


        // If successfully added
        if (added) {

            // Refresh inventory
            this.renderInventory(
                this.searchInput.value
                    ? this.store.searchBook(
                        this.searchInput.value
                    )
                    : this.store.books
            );


            // Refresh cart
            this.renderCart();

            // Refresh best sellers
            this.renderBestSellers();

        }

    }


    // ========================================
    // RENDER BEST SELLERS
    // ========================================

    renderBestSellers() {

        const bestSellers =
            this.store.getBestSellers();


        this.bestSellerList.innerHTML =
            bestSellers.map(book => {

                return `

                    <article class="book-card">

                        <div class="book-image">

    <img
        src="${book.image}"
        alt="${book.title}"
    >

</div>


                        <div class="book-info">

                            <h3>
                                ${book.title}
                            </h3>

                            <p class="author">
                                ${book.author}
                            </p>

                            <div class="rating">

                                ★★★★★

                                <span>
                                    ${book.rating}
                                </span>

                            </div>


                            <div class="book-bottom">

                                <strong>
                                    Rs.${book.price.toFixed(2)}
                                </strong>

                                <button
                                    class="add-cart"
                                    data-id="${book.id}"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            }).join("");

    }


    // ========================================
    // HANDLE CART BUTTONS
    // ========================================

    handleCartClick(event) {

        // Get clicked element
        const button = event.target;


        // Get book ID
        const bookId =
            Number(button.dataset.id);


        // Increase quantity
        if (
            button.classList.contains(
                "increase-cart"
            )
        ) {

            this.store.increaseQuantity(bookId);

        }


        // Decrease quantity
        else if (
            button.classList.contains(
                "decrease-cart"
            )
        ) {

            this.store.decreaseQuantity(bookId);

        }


        // Remove item
        else if (
            button.classList.contains(
                "remove-from-cart"
            )
        ) {

            this.store.removeFromCart(bookId);

        }


        // Update UI
        this.renderCart();

        this.renderInventory(
            this.searchInput.value
                ? this.store.searchBook(
                    this.searchInput.value
                )
                : this.store.books
        );

    }


    // ========================================
    // RENDER CART
    // ========================================

    renderCart() {

        // Update cart count
        this.cartCount.textContent =
            this.store.getCartCount();


        // If cart empty
        if (this.store.cart.length === 0) {

            this.cartItems.innerHTML = `

                <p class="empty-cart">
                    Your cart is empty.
                </p>

            `;

            this.cartTotal.textContent =
                "Rs.0.00";

            return;
        }


        // Display cart items

        this.cartItems.innerHTML =
            this.store.cart.map(item => {

                return `

                    <div class="cart-item">

                        <div>

                            <h4>
                                ${item.title}
                            </h4>

                            <p>
                                $${item.price.toFixed(2)}
                            </p>

                        </div>


                        <div class="cart-controls">

                            <button
                                class="decrease-cart"
                                data-id="${item.id}"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                class="increase-cart"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-from-cart"
                            data-id="${item.id}"
                        >
                            Remove
                        </button>

                    </div>

                `;

            }).join("");


        // Update total
        this.cartTotal.textContent =
            `Rs.${this.store.getTotal().toFixed(2)}`;

    }

}

// ============================================
// 5. START APPLICATION
// ============================================

// Create UI object
const ui = new UI(store);