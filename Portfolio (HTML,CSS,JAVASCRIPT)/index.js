// Containers for dynamic rendering
let featuredProductContainer = document.getElementById("featured-products");
let newArrivalsContainer = document.getElementById("new-arrivals");

// Data
let featuredProducts= [
    {   "img":"img/products/f",
         "id":"p1",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
    },
    
    {"img":"img/products/f",
     "id":"p2",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
   },
   
   {"img":"img/products/f",
     "id":"p3",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
   },
   
   {"img":"img/products/f",
     "id":"p4",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
   },
   {"img":"img/products/f",
     "id":"p5",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
  },
  
  {"img":"img/products/f",
     "id":"p6",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
  },
  {"img":"img/products/f",
     "id":"p7",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
  },
  
  {"img":"img/products/f",
     "id":"p8",
     "brand":"adidas",
     "name":"Cartoon Astrinaut T-Shirt",
     "rating" : 5,
     "price":"750"
  } 
 ]
let newArrivals = [
     {"img":"img/products/n",
         "id":"a1",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a2",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a3",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a4",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a5",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a6",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a7",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      },
 
      {"img":"img/products/n",
         "id":"a8",
         "brand":"adidas",
         "name":"Cartoon Astrinaut T-Shirt",
         "rating" : 5,
         "price":"750"
      }
 ]

 
let cart = [];

// Create and return a product card element. The cart icon link carries an onclick event.
function createProductCard(element, index) {
    let productCard = document.createElement("div");
    productCard.className = "pro";
    productCard.innerHTML = `
        <img src="${element.img+index}.jpg" alt="${element.id}">
        <div class="des">
            <span>${element.brand}</span>
            <h5>${element.name}</h5>
            <div class="star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div> 
            <h4>Rs. ${element.price}</h4>
        </div>
        <a href="#" onclick="addtoCart('${element.id}')"><i class="fal fa-shopping-cart cart"></i></a>
    `;
    return productCard;
}

let indexCounter = 1;
featuredProducts.forEach(element => {
    featuredProductContainer.appendChild(createProductCard(element, indexCounter));
    indexCounter++;
});

// Render new arrivals
indexCounter = 1;
newArrivals.forEach(element => {
    newArrivalsContainer.appendChild(createProductCard(element, indexCounter));
    indexCounter++;
});

function addtoCart(id) {
    let product = featuredProducts.find(p => p.id === id) || newArrivals.find(p => p.id === id);
    if (product) {
        let cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
        console.log(localStorage.getItem("cart"));
        displayCart();
        
    }
}

function displayCart() {
    console.log("Displaying cart items...");
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTableBody = document.getElementById("cart-table-body");
    if (!cartTableBody) return; // Exit if we are not on the cart page
    console.log(cartTableBody);
    cartTableBody.innerHTML = ""; // Clear previous rows
    
    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="removeItem('${item.id}')"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.img}1.jpg" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>Rs ${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)"></td>
            <td>Rs ${item.price * item.quantity}</td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Remove item from the cart and update the display.
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Update quantity of a specific cart item.
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
