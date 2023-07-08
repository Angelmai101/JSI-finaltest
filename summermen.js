fetch("summer.json", {
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
      if (Data[i].category.indexOf("Men-Collection") != -1) {
        {
          let htmlSegment = `
  
          <div style="margin-top: 50px" class="card-container">
          <div class="imgBx">
            <img
              src="${Data[i].img}"
            />
          </div>
          <div class="details">
            <div class="content">
              <h2> ${Data[i].title}</h2>
              <p>
              ${Data[i].detail}
              </p>
              <button onclick="location.href = '${Data[i].link}';">Buy Now</button>
            </div>
          </div>
        </div>
                            `;

          html += htmlSegment;
        }
      }
    }

    let container = document.querySelector(".container-full"); //class
    container.innerHTML = html;
    console.log(html);
  });

fetch("summer.json", {
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
      if (Data[i].category.indexOf("Beach") != -1) {
        {
          let htmlSegment = `
    
            <div style="margin-top: 50px" class="card-container">
            <div class="imgBx">
              <img
                src="${Data[i].img}"
              />
            </div>
            <div class="details">
              <div class="content">
                <h2> ${Data[i].title}</h2>
                <p>
                ${Data[i].detail}
                </p>
                <button onclick="location.href = '${Data[i].link}';">Buy Now</button>
              </div>
            </div>
          </div>
                              `;

          html += htmlSegment;
        }
      }
    }

    let container = document.querySelector(".container-full1"); //class
    container.innerHTML = html;
    console.log(html);
  });
