  // Parallax Effect
      window.addEventListener("scroll", () => {
        const parallax = document.querySelector(".parallax");
        let scrollPosition = window.pageYOffset;
        parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      });

      let data = [];

      // Fetch and Render Products
      async function fetchProducts() {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          data = await response.json();

          data.forEach((product) => {
            document.querySelector(
              ".container"
            ).innerHTML += `<div class="card">
              <img src="${product.image}" alt="${product.title}" />
              <div class="card-content">
                <h2 class="card-title">${product.title}</h2>
                <p class="card-id">ID: <span id="current_id">${product.id}</span></p>
                <p class="card-desc" id="desc">${product.description}</p>
                <p class="category">Category: <span id="current_category">${product.category}</span></p>
                <div class="card-footer">
                  <p class="price">Price: <span id="current_price">$${product.price}</span></p>
                  <div class="rating">Rating: <span id="current_rate">${product.rating.rate}</span> (${product.rating.count})</div>
                </div>
              </div>
            `;
          });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }

      fetchProducts();

      document.getElementById("searchIcon").addEventListener("click", () => {
        const searchInput = document.getElementById("search");
        const searchX = document.getElementById("searchX");
        const searchIcon = document.getElementById("searchIcon");

        searchInput.classList.add("show");
        searchX.classList.add("show");
        searchIcon.classList.add("hide");
      });

      document.getElementById("searchX").addEventListener("click", () => {
        const searchInput = document.getElementById("search");
        const searchX = document.getElementById("searchX");
        const searchIcon = document.getElementById("searchIcon");

        searchInput.classList.remove("show");
        searchX.classList.remove("show");
        searchIcon.classList.remove("hide");
      });
      const searchInput = document.getElementById("search");

      searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(function (card) {
          const cardText = card.textContent.toLowerCase();
          const match = cardText.includes(searchText);
          card.style.display = match ? "block" : "none";
        });
      });
