function displayCart() {
    console.log("Displaying cart items...");
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTableBody = document.getElementById("cart-table-body");
    if (!cartTableBody) return; 
    console.log(cartTableBody);
    cartTableBody.innerHTML = ""; 
    cart.forEach(item => {
        let cost = item.price * item.quantity
        let row = document.createElement("tr");
        console.log(cost)
        row.innerHTML = `
            <td><a href="#" onclick="removeItem('${item.id}')"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.img}1.jpg" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>Rs ${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)"></td>
            <td>Rs ${cost}</td>
        `;
        cartTableBody.appendChild(row);
    });
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


function updateQuantity(id, newQuantity) {
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity = parseInt(newQuantity, 10) || 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

document.addEventListener("DOMContentLoaded", function() {
    displayCart();
});

