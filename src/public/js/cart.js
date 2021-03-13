window.onload = function () {
  // Variables
  let dataCart = JSON.parse(localStorage.getItem("product-value")) || [];

  //obtain data contentcar
  let contentCartSelected = JSON.parse(localStorage.getItem("cart")) || [];


  dataCart.map((element) => {
    // type of string element.id require for match with the other data
    contentCartSelected.unshift(String(element.id));
  });

  localStorage.setItem("cart", JSON.stringify(contentCartSelected));
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
      myNode.classList.add("curso", "animate__animated", "animate__fadeIn");
      // Image
      let myNodeImage = document.createElement("img");
      myNodeImage.classList.add("imagen-curso");
      myNodeImage.setAttribute("src", info["url_image"]);
      // info-curso
      let myNodeInfoCurso = document.createElement("div");
      myNodeInfoCurso.classList.add("info-curso");
      // title
      let myNodeTitle = document.createElement("h4");
      myNodeTitle.textContent = info["name"];

      // Price
      let myNodePrice = document.createElement("div");
      myNodePrice.classList.add("precio");
      //paragraph regular
      let myNodeParagraphRegular = document.createElement("p");
      myNodeParagraphRegular.classList.add("regular");
      myNodeParagraphRegular.textContent = "$" + info["price"];

      //paragraph offert
      let myNodeParagraphOffert = document.createElement("p");
      myNodeParagraphOffert.classList.add("oferta");
      myNodeParagraphOffert.textContent = `$${
        info["price"] - (info["discount"] * info["price"]) / 100
      }`;

      // button plus (+)
      let myNodeButton = document.createElement("button");
      myNodeButton.classList.add("button-cart", "plus-button");
      myNodeButton.textContent = "+";
      myNodeButton.setAttribute("marker", info["id"]);
      myNodeButton.addEventListener("click", addCart);

      // insert
      myNodePrice.appendChild(myNodeParagraphRegular);
      myNodePrice.appendChild(myNodeParagraphOffert);

      myNode.appendChild(myNodeImage);
      myNodeInfoCurso.appendChild(myNodeTitle);
      myNodeInfoCurso.appendChild(myNodePrice);
      myNodeInfoCurso.appendChild(myNodeButton);
      myNode.appendChild(myNodeInfoCurso);
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
    if (dataCart.length === 0) {
      const elementCourses = document.querySelector(".cursos");
      elementCourses.innerHTML = "";
      let paragraph = document.createElement("p");
      paragraph.classList.add("text-center");
      paragraph.textContent = "No hay elementos en el carrito";
      elementCourses.appendChild(paragraph);
      return;
    }
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
      myNode.classList.add("list-group-item");

      //paragraph child node
      let paragraphInfoContentItem = document.createElement("p");
      paragraphInfoContentItem.textContent = `${numberOfItemUnits} x ${myItem[0]["name"]} - $${myItem[0]["price"]}`;
      // button for delete
      let myButton = document.createElement("button");
      myButton.classList.add("button-cart", "deleteItem");
      myButton.textContent = "X";
      myButton.style.marginLeft = "1rem";
      myButton.setAttribute("item", item);
      myButton.addEventListener("click", deleteItemCart);
      // mix nodos
      myNode.appendChild(paragraphInfoContentItem);
      myNode.appendChild(myButton);
      $cartElement.appendChild(myNode);
    });
  }

  function deleteItemCart() {
    // Obtain the product ID that is in the button pressed
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

    //renderItemsByid
    renderIntemsWhenDeleteItemCart(id);
  }
  function renderIntemsWhenDeleteItemCart(id) {
    //filter datCart Values
    renderCartContentFilter = dataCart.filter(
      (dataElement) => dataElement.id != id
    );

    //save new array filter
    localStorage.setItem(
      "product-value",
      JSON.stringify(renderCartContentFilter)
    );

    //declare new dataCart Value
    dataCart = JSON.parse(localStorage.getItem("product-value"));

    //remove html content in #items
    document.querySelector("#items").innerHTML = "";
    renderItems();
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
      let discount =
        myItem[0]["price"] - (myItem[0]["price"] * myItem[0]["discount"]) / 100;
      total = total + discount || 0;
    }
    // Format the total so that it only has two decimal places
    let twoDecimals = total.toFixed(0);
    // render price in html
    $total.textContent = twoDecimals;
  }

  function removeCart() {
    // clean save products
    dataCart = [];
    cart = [];
    document.querySelector("#items").innerHTML = "";
    // render changes
    renderCart();
    renderItems();
    calculateTotal();
    // delete localstorage
    localStorage.clear();
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
  $emptyButton.addEventListener("click", removeCart);

  // call functions
  loadLocalStorageCart();
  renderItems();
  calculateTotal();
  renderCart();
};
