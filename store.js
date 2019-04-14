if (document.readyState == 'loading') {
    document.addEventListener('DomContentLoaded', ready)
} else {
    ready();
}

function ready() {

    /*
    ***********Removing Items From Cart************
    */

    // Reference all REMOVE buttons in cart
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");

    // For the cart items in the cart, delete the cart item after clicking REMOVE
    for (let i = 0; i < removeCartItemButtons.length; i++) {

        removeCartItemButtons[i].addEventListener('click', removeCartItem)
    }

    function removeCartItem(event) {
        // Get the button element that triggered the event
        var buttonClicked = event.target
        // Remove the whole cart-row which is 2 levels above the button
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }



    /*
    ***********Add Items To Cart From Shop************
    */

    // Reference all ADD TO CART buttons, call addToCartClicked() upon clicking
    let addToCartButtons = document.getElementsByClassName("shop-item-btn");
    for (let i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    function addToCartClicked(event) {
        // Get the button element that triggered the event
        let button = event.target;
        // Reference the shop-item container the button belongs to and its title, image, and price
        let shopItem = button.parentElement.parentElement;
        let title = shopItem.getElementsByClassName("shop-item-title")[0].textContent;
        let image = shopItem.getElementsByClassName("shop-item-img")[0].src;
        let price = shopItem.getElementsByClassName("shop-item-price")[0].textContent;
        // Pass title, image, and price in shop-item to addItemToCart
        addItemToCart(title, image, price);
        // Update the cart with the new item added
        updateCartTotal();
    }

    function addItemToCart(title, image, price) {

        // If the title added is already in cart, terminate the function
        let titles = document.getElementsByClassName("cart-item-title");
        for (i = 0; i < titles.length; i++) {
            if (titles[i].textContent === title) {
                alert(`${titles[i].textContent} already in Cart`);
                return
            }
        }

        // Dynamically insert arguments into the HTML of cart row
        let cartRowContents = `
            <div class="cart-item cart-column">
                <img src="${image}" alt="Songs Album Cover" class="cart-item-img">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" role="button">REMOVE</button>
            </div>
            `
        // Create a div, give it the class cart-row, and the HTML of cart-row
        let newCartRow = document.createElement('div');
        newCartRow.classList.add('cart-row');
        newCartRow.innerHTML = cartRowContents;
        // Append newCartRow to cartItems
        var cartItems = document.getElementsByClassName("cart-items")[0];
        cartItems.append(newCartRow);

        // Enable row deletion for newCartRow
        newCartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', removeCartItem)

        // Enable input quantity update for newCartRow
        newCartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);

    }


    /*
    ***********Updating Cart After Adding/Removing Items************
    */

    // Update the cart total when a cart row is removed or added
    function updateCartTotal() {
        let cartItems = document.getElementsByClassName("cart-items")[0];
        let cartRows = cartItems.getElementsByClassName("cart-row");
        let total = 0;

        // For each row in the cart, multipy the price by the quantity to get the total
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let itemPrice = cartRow.getElementsByClassName("cart-price")[0];
            let itemQuantity = cartRow.querySelector(".cart-quantity .cart-quantity-input");
            // Remove the currency symbol from price and convert to number
            let price = parseFloat(itemPrice.textContent.replace('$', ''));
            let quantity = itemQuantity.value;
            let rowTotal = (price * quantity);
            total += rowTotal;
        }
        // Display the total as the sum total of all the rows, truncating after hundreths place
        document.querySelector(".cart-checkout-price").textContent = '$' + total.toFixed(2).toString();
    }

    // Reference all the input boxes in the cart, calling quantityChanged if the input is changed
    let cartInputs = document.querySelectorAll(".cart-quantity-input");
    for (let i = 0; i < cartInputs.length; i++) {
        let input = cartInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    function quantityChanged(event) {
        // Get the input element that triggered the event
        let input = event.target;
        // Only update the cart if a positive number is input
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }


    /*
    **********Clearing The Cart**********
    */

    // If the purchase button is clicked, fire purchaseClicked()
    document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseClicked)

    function purchaseClicked() {
        // Select all cart-row that are children of cart-items
        let purchasedItems = document.querySelectorAll(".cart-items .cart-row");
        // Alert an appropriate message depending if there are any items in the cart
        if (purchasedItems.length > 0) {
            alert("Thank You For Your Purchase");
        } else alert("Please Add Items To Cart")
        // remove each cart-row
        for (let i = 0; i < purchasedItems.length; i++) {
            purchasedItems[i].remove();
        }
        // Update the total
        updateCartTotal();
    }





}



