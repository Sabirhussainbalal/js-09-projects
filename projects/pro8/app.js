     let balance = 0;
      let text;
      let amount;
      let total_earn_is = 0
      let total_exp_is = 0
      const buttons = document.querySelectorAll(".btn");

      // Fix Amount inpt
      const amountInput = document.getElementById("amount");

      amountInput.addEventListener("input", () => {
        // Remove non-digit characters from the input
        amountInput.value = amountInput.value.replace(/\D/g, "");

        // Provide feedback if invalid input was entered (optional)
        if (amountInput.value.trim() === "") {
          console.log("Invalid input: non-digit characters removed.");
        }
      });

      function generateId() {
        return Date.now() + "-" + Math.floor(Math.random() * 1000);
      }

      const append = (id) => {
        let amountis;
        let status;
        if (id == "earn") {
          total_earn_is = total_earn_is + parseInt(amount);
          document.querySelector(".total_earn").textContent = `$${total_earn_is}`;
          balance = balance + parseInt(amount);
          document.querySelector(".amount").textContent = `$${balance}`;
          amountis = `+ $${amount}`;
          status = "green";
        } else if (id == "exp") {
          total_exp_is = total_exp_is + parseInt(amount);
          document.querySelector(".total_exp").textContent = `$${total_exp_is}`;
          balance = balance - parseInt(amount);
          document.querySelector(".amount").textContent = `$${balance}`;
          amountis = `- $${amount}`;
          status = "red";
        }

        let box = `
               <div class="box">
          <!-- up -->
          <div class="up">
            <div class="first">${text}</div>
            <div class="last">
              <div class="amount">${amountis}</div>
              <div  class="status ${status}" id="${generateId()}">
                <!-- SVGs are included, but they are part of the clickable .status div -->
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" class="open">
                  <path d="M480-360 280-560h400L480-360Z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" class="close hide">
                  <path d="m280-400 200-200 200 200H280Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- Down -->
          <div class="down">
            <!-- <lord-icon> tag should be properly closed -->
            <div class="edit">
              <lord-icon src="https://cdn.lordicon.com/wkvacbiw.json" trigger="hover" style="width: 25px; height: 25px">
              </lord-icon> 
            </div>
            <div class="delete">
              <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style="width: 25px; height: 25px">
              </lord-icon> 
            </div>
          </div>
        </div>`;

        document.querySelector(".boxes").innerHTML += box;
      };

      // Append Child

      // Add Transaction
      const add = (id) => {
        text = document.getElementById("text").value;
        amount = document.getElementById("amount").value;
        amount.trim();

        if (!text) {
          document.getElementById("text").classList.add("red_error");
        } else {
          document.getElementById("text").classList.remove("red_error");
        }

        if (!amount) {
          document.getElementById("amount").classList.add("red_error");
        } else {
          document.getElementById("amount").classList.remove("red_error");
        }

        if (text && amount) {
          document.getElementById("text").value = "";
          document.getElementById("amount").value = "";
          append(id);
        }
      };

      for (let button of buttons) {
        button.addEventListener("click", () => {
          add(button.id);
          addClickListenerToStatuses();
        });
      }

      document.addEventListener("click", (event) => {
        const target = event.target;

        function updateBalance(amountStr) {
          let amount = amountStr.trim();
          if (amount[0] === "-") {
            amount = parseInt(amount.replace(/\D/g, ""), 10);
            balance += amount;
            total_exp_is = total_exp_is - amount
          } else {
            amount = parseInt(amount.replace(/\D/g, ""), 10);
            balance -= amount;
            total_earn_is = total_earn_is - amount
      
          }
          document.querySelector(".amount").textContent = `$${balance}`;
          document.querySelector(".total_earn").textContent = `$${total_earn_is}`;
          document.querySelector(".total_exp").textContent = `$${total_exp_is}`;
        }

        if (target.classList.contains("delete")) {
          const parentBox = target.closest(".box");
          const amount = parentBox.querySelector(".amount").innerHTML;
          updateBalance(amount);
          parentBox.remove();
        } else if (target.classList.contains("edit")) {
          const parentBox = target.closest(".box");
          const amount = parentBox.querySelector(".amount").innerHTML;
          updateBalance(amount);
          const first = parentBox.querySelector(".first").innerHTML;
          document.getElementById("text").value = first;
          document.getElementById("amount").value = amount.replace(/\D/g, "");
          parentBox.remove();
        }
      });

      function addClickListenerToStatuses() {
        // Select all elements with the class "status"
        const statuses = document.querySelectorAll(".status");

        // Add a click event listener to each 'status' element
        statuses.forEach((status) => {
          status.addEventListener("click", (event) => {
            // Prevent event from bubbling up if it's clicked on a nested element like SVG
            event.stopPropagation();

            // Get the id of the clicked element
            const clickedId = event.currentTarget.id;

            const parentBox = status.closest(".box");

            // Find the `status` container
            const statusContainer = status.closest(".status");

            if (parentBox && statusContainer) {
              const opensvg = statusContainer.querySelector(".open");
              const closesvg = statusContainer.querySelector(".close");

              if (opensvg && closesvg) {
                // Check if the "expanded" class is present
                if (parentBox.classList.contains("expanded")) {
                  // Remove the "expanded" class
                  parentBox.classList.remove("expanded");
                  opensvg.classList.remove("hide");
                  closesvg.classList.add("hide");
                } else {
                  // Add the "expanded" class
                  parentBox.classList.add("expanded");
                  opensvg.classList.add("hide");
                  closesvg.classList.remove("hide");
                }
              } else {
                console.log(
                  "Open or close SVG not found in the current context."
                );
              }
            } else {
              console.log(
                "No parent with the class 'box' found or invalid status container."
              );
            }
          });
        });
      }
