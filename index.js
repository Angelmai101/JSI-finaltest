const currentUser = JSON.parse(localStorage.getItem("currentusers"));

if (currentUser) {
  const logincontainer = document.getElementById("login-container");
  logincontainer.innerHTML = `<h4 style="font-family: 'Marcellus', serif;">Welcome ${currentUser.displayName}</h4>`;
}

fetch("product.json", {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((response) => response.json())
  .then((Data) => {
    console.log(Data);
    let html = "";
    for (i = 0; i < Data.length; i++) {
      if (Data[i].category.indexOf("Feature") != -1) {
        let htmlSegment = `
            
            <div class="feature-container">
        <img
          src="${Data[i].img}"
          onmouseover="this.src='${Data[i].imghover}'"
    onmouseout="this.src='${Data[i].img}'"
          alt=""
        />

        <div class="feature-caption">
          <h5>
          ${Data[i].title}
          </h5>
          <p>${Data[i].detail1}</p>
          <p>${Data[i].detail2}</p>
        </div>
      </div>
                        `;

        html += htmlSegment;
      }
    }

    let container = document.querySelector(".feature-full"); //class
    container.innerHTML = html;
    console.log(html);
  });
