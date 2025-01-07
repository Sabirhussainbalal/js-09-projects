  const thumb = document.getElementById("thumb");
      const line = document.getElementById("line");
      const lengthBar = document.querySelector(".length");
      const root = document.documentElement;

      let isDragging = false;
      let uppercase = false;
      let number = false;
      let symbol = false;

      thumb.addEventListener("mousedown", (e) => {
        isDragging = true; // Enable dragging
      });

      document.addEventListener("mouseup", () => {
        isDragging = false; // Disable dragging when mouse is released
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          // Get the bounding box of the length bar
          const rect = lengthBar.getBoundingClientRect();

          // Calculate the new percentage based on mouse position
          let percentage = ((e.clientX - rect.left) / rect.width) * 100;

          // Clamp the percentage between 0 and 100
          percentage = Math.max(0, Math.min(percentage, 100));

          // Update CSS variable and element styles
          root.style.setProperty("--current", `${percentage}%`);
          line.style.width = `${percentage}%`;
          thumb.style.left = `${percentage}%`;

          levelset(percentage);
        }
      });

      lengthBar.addEventListener("click", (e) => {
        const rect = lengthBar.getBoundingClientRect();

        // Calculate the percentage based on the mouse click position
        let percentage = ((e.clientX - rect.left) / rect.width) * 100;

        // Clamp the percentage between 0 and 100
        percentage = Math.max(0, Math.min(percentage, 100));

        // Update CSS variable and element styles
        root.style.setProperty("--current", `${percentage}%`);
        line.style.width = `${percentage}%`;
        thumb.style.left = `${percentage}%`;

        levelset(percentage);
      });

      const levelset = (percentage) => {
        const minLevel = 4; // Starting level
        const maxLevel = 27; // Maximum level
        const totalLevels = maxLevel - minLevel + 1; // Total levels
        const increment = 100 / totalLevels; // Percentage increment per level

        // Calculate the level dynamically
        const level = Math.min(
          maxLevel,
          Math.floor(percentage / increment) + minLevel
        );

        // Update the length element with the calculated level
        document.getElementById("len").textContent = level;
      };

      // Upper Case Random Alphabet Generator
      const upperCaseAlphabet = () => {
        const randomAlphabet = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        ); // Random letter A-Z
        return randomAlphabet;
      };

      // Random Number Generator
      const randomNum = () => {
        const randomNum = Math.floor(Math.random() * 10); // Random number 0-9
        return randomNum;
      };

      // Random Symbol Character Generator
      const randomSymbol = () => {
        const randomSymbol = "!@#$%&*".charAt(Math.floor(Math.random() * 6));
        return randomSymbol;
      };

      // Random Small Alphabet Generator
      const smallAlphabet = () => {
        const randomAlphabet = String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        ); // Random letter a-z
        return randomAlphabet;
      };

      // On/off
      document.addEventListener("click", (event) => {
        const target = event.target;

        // Check if the clicked element has the 'button' class
        if (target.classList.contains("button")) {
          // Find the child element with the 'btn' class
          const btn_switch = target.querySelector(".btn");
          if (btn_switch) {
            // Toggle the corresponding state based on the 'id' of the 'btn'
            let id = btn_switch.id;
            if (id === "upper") {
              uppercase = !uppercase;
            } else if (id === "number") {
              number = !number;
            } else if (id === "symbol") {
              symbol = !symbol;
            }

            btn_switch.classList.toggle("on");
          } else {
            console.log("No child element with class 'btn' found");
          }
        }
      });

      // Generate Password
      const generatePassword = () => {
        let password = "";
        let pas_lenth = document.getElementById("len").textContent;
        pas_lenth = parseInt(pas_lenth);

        for (let i = 0; i < pas_lenth; i++) {
          let ran = Math.floor(Math.random() * 4);
          if (ran === 0) {
            password += smallAlphabet();
          } else if (ran === 1) {
            if (uppercase) {
              password += upperCaseAlphabet();
            } else {
              password += smallAlphabet();
            }
          } else if (ran === 2) {
            if (number) {
              password += randomNum();
            } else {
              password += smallAlphabet();
            }
          } else if (ran === 3) {
            if (symbol) {
              password += randomSymbol();
            } else {
              password += smallAlphabet();
            }
          }
        }
        document.getElementById("password").textContent = password;
      };

      document.getElementById("generate_pass").addEventListener("click", () => {
        generatePassword();
      });

      function showNotification(msg) {
        const notification = document.getElementById("notification");
        notification.textContent = msg; // Set the message
        notification.classList.add("show"); // Show the notification

        // Hide after 3 seconds
        setTimeout(() => {
          notification.classList.remove("show");
        }, 3000);
      }

      function Copy() {
        // Get the text content of the element
        var copyText = document.getElementById("password").textContent;

        // Create a temporary textarea element
        var tempInput = document.createElement("textarea");
        tempInput.value = copyText;
        document.body.appendChild(tempInput);

        // Select and copy the text from the temporary textarea
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(tempInput.value);

        // Remove the temporary textarea
        document.body.removeChild(tempInput);

        // Alert the copied text
        showNotification(copyText);
      }

      document.getElementById("copy").addEventListener("click", () => {
        Copy();
      });
