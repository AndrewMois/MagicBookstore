$(document).ready(function () {

    //function for personal info HTML creation & appending
    function insertInfo(name, address, phone, email, province, deliveryType) {
        let infoHTML = `
        <li>Name: ${name}</li>
        <li>Phone: ${phone}</li>
        <li>Email: ${email}</li>
        <li>Address: ${address}</li>
        <li>Province: ${province}</li>
        <li>Delivery type: ${deliveryType}</li>
        `;
        $(".orderInfo").append(infoHTML);
    }
    //function for order info HTML creation & appending
    function insertOrderInfo(cartItems) {
        for (const bookName in cartItems) {
            let quantity = cartItems[bookName];
            let orderHTML = `
            <li>${bookName} - ${quantity}</li>`;
            $(".order").append(orderHTML);
        }
    }

    // fething data from local storage
    let name = localStorage.getItem("Name");
    let address = localStorage.getItem("Address");
    let phone = localStorage.getItem("Phone");
    let email = localStorage.getItem("Email");
    let province = localStorage.getItem("Province");
    let deliveryType = localStorage.getItem("deliveryType");
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let total = JSON.parse(window.localStorage.getItem("total"));

    // inserting data from the local storage
    insertInfo(name, address, phone, email, province, deliveryType);
    insertOrderInfo(cartItems);
    $("#total-sum").text(total);

    // clearing local storage
    localStorage.clear();
});