$(document).ready(function () {

    // Function for cuonting quantity (will be in use later)
    const quantityCalc = obj => Object.values(obj).reduce((a, b) => a + b, 0);

    // Our cart items
    var cartList = {};

    //////////////////////////////////////////
    // Receiving data from the JSON file and displaying it on the main page
    //////////////////////////////////////////

    // Here we are using the jQuery getJSON method to retrieve the data from the JSON file and display it on the page using function.
    $.getJSON("https://raw.githubusercontent.com/AndrewMois/MagicBookstore/main/source/products.json", function (data) {
        const products = data.products;
        
        for (book of products) {
            createBook(book.image, book.name, book.author, book.price);
        }
        // adding the event listener to each button
        // i'm taking only the name. All rest info i'm getting from the JSON file in another script file
        $(".btn").click(function (index) {
            let name = $(this).parent().find(".title").text();

            // if the item is already in the cart, we are increasing the quantity
            // if not, we are adding it to the cart
            if (!cartList[name]) {
            cartList[name] = 1;
            } else {
                cartList[name] += 1;
            }
            
            // saving the cartList array to the local storage
            let existingCart = JSON.parse(window.localStorage.getItem("cart"));

            if (JSON.parse(window.localStorage.getItem("cart")) == null) {
                window.localStorage.setItem("cart", JSON.stringify(cartList));
                // updating the cart value, because we added a new item
                existingCart = JSON.parse(window.localStorage.getItem("cart"));
                

            } else {
                if (!existingCart[name]) {
                    existingCart[name] = 1;
                    } else {
                        existingCart[name] += 1;
                    }
                    
                window.localStorage.setItem("cart", JSON.stringify(existingCart));
            }
            console.log(existingCart);
            // CART QUANTITY ON CLICK
            $("#cart-quantity").text(quantityCalc(existingCart));
        });
    });

    // CART QUANTITY ON LOAD
    if (window.localStorage.getItem("cart") != null) {
        // get the cart from the local storage
        existingCart = JSON.parse(window.localStorage.getItem("cart"));
        // calculate the quantity of the items in the cart using function
        $("#cart-quantity").text(quantityCalc(existingCart));
    }


    // This class creates a new book object and have a method to append it to the page.
    class Book {
        constructor(image, name, author, price) {
            this.image = image;
            this.name = name;
            this.author = author;
            this.price = price;
        }
        addHTML() {
            let bookHTML = `<div class="item-image">
        <img src="${this.image}" alt="Book picture">
    </div>
    <div class="shop-item">
        <h3 class="title">${this.name}</h3>
        <p class="author">${this.author}</p>
        <p class="price">Price: <span class="price-num">${this.price}</span>$</p>

        <button class="btn">Add to cart</button>
    </div>`
            $(".shop-container").append(bookHTML);



        }
    }

    // This function is needed to call a class method inside a JSON fetch loop 
    function createBook(image, name, author, price) {
        let book = new Book(image, name, author, price);
        book.addHTML();

    }


});

