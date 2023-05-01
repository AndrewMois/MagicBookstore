function displayTotal(total) {
    let taxPrice = Math.round(total * 0.13 * 100) / 100;
    let totalPrice = Math.round((total + taxPrice) * 100) / 100;
 let totalHTML = `<p class="sub-total">Sub-total: ${total}$</p>
 <p class="sub-total">Taxes: ${taxPrice}$</p>
 <p class="total-sum">Total: ${totalPrice}$</p>`
 $(".total").append(totalHTML);
//  saving total price in local storage
    localStorage.setItem("total", JSON.stringify(totalPrice));
}

$(document).ready(function () {

    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    var totalAmount = 0;
    console.log(cartItems);

    $.getJSON("https://raw.githubusercontent.com/AndrewMois/MagicBookstore/main/source/products.json", function (data) {
        const products = data.products;

        if (cartItems == null) {
            $(".cart-container").append("<p>🛒 Cart is empty</p>");
        } else {
            // In this double loop i'm getting the rest of data from the JSON 

            for (const bookName in cartItems) {
                let quantity = cartItems[bookName];
                for (let index in products) {
                    let curObj = products[index];
                    if (curObj['name'] == bookName) {
                        var price = curObj['price'];
                        var author = curObj['author'];
                        var image = curObj['image'];
                        console.log(bookName, price, author, image, quantity);
                        addCartItem(image, bookName, author, price, quantity);
                        totalAmount += price * quantity;
                        console.log(totalAmount);
                    }
                }
            }
        }
        displayTotal(totalAmount);
    });


    class CartItem {
        constructor(image, name, author, price, quantity) {
            this.image = image;
            this.name = name;
            this.author = author;
            this.price = price;
            this.quantity = quantity;

        }
        addHTML() {
            let bookHTML = `<div class="item-desc">
        <img src="${this.image}" alt="book cover">
        <h3>${this.name}</h3>
        <p class="author">${this.author}</p>
    </div>
    <div class="shop-item">
        <p class="quantity">Quantity: <span class="quantity-num">${this.quantity}</span></p>
        <p class="price">Price: <span class="price-num">${this.price}</span>$</p>
        <p class="price">Sub-total: <span class="price-num">${this.price * this.quantity}</span>$</p>
    </div>`
            $(".cart-container").append(bookHTML);



        }
    }
    function addCartItem(image, name, author, price, quantity, ) {
        let cartItem = new CartItem(image, name, author, price, quantity);
        cartItem.addHTML();
    }

  

});

