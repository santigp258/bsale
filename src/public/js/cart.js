window.onload = function () {
  // Variables
  const dataCart = JSON.parse(localStorage.getItem("product-value")) || [];

  const $items = document.querySelector("#items");
  let cart = [];
  let total = 0;
  const $cartElement = document.querySelector("#cart");
  const $total = document.querySelector("#total");
  const $emptyButton = document.querySelector("#boton-delete");
  const myLocalStorage = window.localStorage;

  // functions
  function renderItems() {
    for (let info of dataCart) {
      // structure
      let myNode = document.createElement("div");
      myNode.classList.add("card", "col-sm-4");
      // Body
      let myNodeCardBody = document.createElement("div");
      myNodeCardBody.classList.add("card-body");
      // title
      let myNodeTitle = document.createElement("h5");
      myNodeTitle.classList.add("card-title");
      myNodeTitle.textContent = info["name"];
      // Image
      let myNodeImage = document.createElement("img");
      myNodeImage.classList.add("img-fluid");
      myNodeImage.setAttribute("src", info["url_image"]);
      // Price
      let myNodePrice = document.createElement("p");
      myNodePrice.classList.add("card-text");
      myNodePrice.textContent = info["price"] + "€";
      // button
      let myNodeButton = document.createElement("button");
      myNodeButton.classList.add("btn", "btn-primary");
      myNodeButton.textContent = "+";
      myNodeButton.setAttribute("marker", info["id"]);
      myNodeButton.addEventListener("click", addCart);
      // insert
      myNodeCardBody.appendChild(myNodeImage);
      myNodeCardBody.appendChild(myNodeTitle);
      myNodeCardBody.appendChild(myNodePrice);
      myNodeCardBody.appendChild(myNodeButton);
      myNode.appendChild(myNodeCardBody);
      $items.appendChild(myNode);
    }
  }

  function addCart() {
    // add Nodo to own cart
    cart.push(this.getAttribute("marker"));
    // calc total
    calculateTotal();
    // render content cart
    renderCart();
    // Update LocalStorage
    saveCartInLocalStorage();
  }

  function renderCart() {
    // remove  html
    $cartElement.textContent = "";
    // remove duplicates
    let cartNoDuplicate = [...new Set(cart)];
    // generate Nodes from cart
    cartNoDuplicate.forEach(function (item, indice) {
      // Obtain the item we need from the database variable
      let myItem = dataCart.filter(function (itemBaseDatos) {
        return itemBaseDatos["id"] == item;
      });
      // Counts the number of times the product is repeated
      let numberOfItemUnits = cart.reduce(function (total, itemId) {
        return itemId === item ? (total += 1) : total;
      }, 0);
      // Create the node of the cart item
      let myNode = document.createElement("li");
      myNode.classList.add("list-group-item", "text-right", "mx-2");
      myNode.textContent = `${numberOfItemUnits} x ${myItem[0]["name"]} - ${myItem[0]["price"]}€`;
      // button for delete
      let myButton = document.createElement("button");
      myButton.classList.add("btn", "btn-danger", "mx-5");
      myButton.textContent = "X";
      myButton.style.marginLeft = "1rem";
      myButton.setAttribute("item", item);
      myButton.addEventListener("click", borrarItemCarrito);
      // Mezclamos nodos
      myNode.appendChild(myButton);
      $cartElement.appendChild(myNode);
    });
  }

  function borrarItemCarrito() {
    // Bbtain the product ID that is in the button pressed
    let id = this.getAttribute("item");
    // remove all products
    cart = cart.filter(function (cartId) {
      return cartId !== id;
    });
    // render cart again
    renderCart();
    // calculate new price
    calculateTotal();
    // Update LocalStorage
    saveCartInLocalStorage();
  }

  function calculateTotal() {
    // Clean previous price
    total = 0;
    // iterate cart array
    for (let item of cart) {
      // obtain every element price
      let myItem = dataCart.filter(function (itemDataCart) {
        return itemDataCart["id"] == item;
      });
      total = total + myItem[0]["price"] || 0;
    }
    // Format the total so that it only has two decimal places
    let twoDecimals = total.toFixed(2);
    // render price in html
    $total.textContent = twoDecimals;
  }

  function vaciarCarrito() {
    // clean save products
    cart = [];
    // render changes
    renderCart();
    calculateTotal();
    // delete localstorage
    localStorage.removeItem('cart');
  }

  function saveCartInLocalStorage() {
    myLocalStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadLocalStorageCart() {
    // exist cart?
    if (myLocalStorage.getItem("cart") !== null) {
      // load data
      cart = JSON.parse(myLocalStorage.getItem("cart"));
    }
  }

  // events
  $emptyButton.addEventListener("click", vaciarCarrito);

  // call functions
  loadLocalStorageCart();
  renderItems();
  calculateTotal();
  renderCart();
};
