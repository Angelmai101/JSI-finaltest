let products = [];
const searchInput = document.querySelector("#search"); // search
const productCardTemplate = document.querySelector("[product-template]"); //template for every card
const productCardcontainer = document.querySelector("[product-card-container]"); //the container-full class, every card
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  products.forEach((users) => {
    if (users) {
      const isVisible = users.name.toLowerCase().includes(value); //when search, name will be in lowercase (value in the search box)
      users.element.classList.toggle("hide", !isVisible); //if value != name, element will be add in a class hide and the card will be hidden
    }
  });
});
console.log(searchInput); //console search
fetch("summer.json", {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((response) => response.json())
  .then((Data) => {
    products.push(
      ...Data.map((product) => {
        if (product.category.indexOf("Women") != -1) {
          const card = productCardTemplate.content.cloneNode(true).children[0];
          const title = card.querySelector("[product-title]"); //call the title of the card out to change it later
          const image = card.querySelector("[image-main]"); //call the image of the card out to change it later
          const detail = card.querySelector("[product-detail]"); //call the detail of the card out to change it later
          const link = card.querySelector("[link-more]"); //call the link of the card out to change it later
          link.addEventListener("click", function () {
            location.href = product.link;
          });
          detail.textContent = product.detail; //JSON put into the text content
          image.src = product.img; //JSON put into the src
          title.textContent = product.title; //JSOn put into the text content
          productCardcontainer.append(card);
          return { name: product.title, element: card }; //name = title   element = the whole card
        }
      })
    );
  });
