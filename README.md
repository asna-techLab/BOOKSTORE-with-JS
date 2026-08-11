# 📚 BookStore Website

A simple and interactive **BookStore web application** built using **HTML, CSS, and JavaScript**. The project demonstrates JavaScript DOM manipulation, Object-Oriented Programming (OOP), event handling, dynamic HTML generation, and shopping cart functionality.

## 🚀 Features

* 📖 Display books dynamically
* 🔍 Search books by title or author
* 🛒 Add books to cart
* ➕ Increase book quantity
* ➖ Decrease book quantity
* ❌ Remove books from cart
* 💰 Automatically calculate cart total
* ⭐ Display book ratings
* 📦 Display available stock
* 🚫 Disable "Add to Cart" when a book is out of stock
* 🏆 Display best-selling books
* ➕ Add new books through a form
* 🔄 Automatically update inventory after adding a new book
* 📱 Responsive layout for different screen sizes

## 🛠️ Technologies Used

* **HTML5** – Structure of the website
* **CSS3** – Styling and responsive design
* **JavaScript (ES6+)** – Functionality and interactivity
* **Font Awesome** – Icons

## 📂 Project Structure

```text
BookStore/
│
├── index.html
├── style.css
├── script.js
└── images/
    └── book images
```

## 🧠 JavaScript Concepts Used

This project uses several important JavaScript concepts:

### Object-Oriented Programming

The project contains two main classes:

* **BookStore** – Manages book data, stock, cart, and business logic.
* **UI** – Manages the webpage, DOM elements, user interactions, and display.

### Constructor

The `constructor()` initializes the objects and their properties when a class object is created.

### DOM Manipulation

JavaScript uses DOM methods such as:

```javascript
document.getElementById()
```

and:

```javascript
innerHTML
```

to interact with and update the webpage.

### Array Methods

The project uses methods such as:

```javascript
map()
find()
filter()
reduce()
push()
splice()
```

### Event Handling

User actions are handled using:

```javascript
addEventListener()
```

For example:

* Button clicks
* Search input
* Cart actions
* Adding a new book

### Template Literals

Template literals are used to generate HTML dynamically:

```javascript
`${book.title}`
```

### Ternary Operator

The project uses the ternary operator for conditions such as checking whether a book is out of stock:

```javascript
book.stock === 0 ? "Out of Stock" : "Add to Cart"
```

## ➕ Add New Book Feature

The website includes an **Add New Book** button in the navigation bar.

When the user clicks the button:

1. The Add Book form appears.
2. The page smoothly scrolls to the form.
3. The user enters the book information.
4. JavaScript creates a new book object.
5. The book is added to the bookstore inventory.
6. The inventory is re-rendered.
7. The new book appears on the webpage.

The form accepts:

* Book title
* Author
* Price
* Rating
* Stock quantity
* Image path

## 🛒 Shopping Cart

The shopping cart allows users to:

* Add books
* Increase quantity
* Decrease quantity
* Remove books
* View the total price

The cart automatically updates when changes are made.

## 🔎 Search

Users can search for books by:

* Book title
* Author name

The inventory updates according to the search results.

## 📦 Stock Management

Each book has a stock value.

If:

```javascript
stock === 0
```

the **Add to Cart** button becomes disabled and displays:

```text
Out of Stock
```

## ▶️ How to Run the Project

1. Download or clone the project.
2. Open the project folder in **VS Code**.
3. Make sure `index.html`, `style.css`, and `script.js` are in the correct locations.
4. Open `index.html` in a browser.

You can also use the **Live Server** extension in VS Code for easier development.

## 🎯 Learning Objectives

This project was created to practice:

* HTML structure
* CSS styling
* JavaScript fundamentals
* DOM manipulation
* JavaScript events
* Object-Oriented Programming
* Classes and constructors
* Array methods
* Dynamic HTML
* Form handling
* Shopping cart logic
* Separation of data logic and UI logic

## 👩‍💻 Project Summary

The BookStore project demonstrates how **HTML, CSS, and JavaScript work together** to create an interactive website. JavaScript manages the bookstore data and business logic through the `BookStore` class, while the `UI` class manages the webpage and user interactions.

The project is designed as a learning project to understand practical JavaScript and OOP concepts through a real-world bookstore example.

