  const generateButton = document.getElementById("generate");
      const resetButton = document.getElementById("reset");
      let bg;
      let isClickable = false;
      let toggleButtonValue = false;

      function copyMessageAndNotify(message) {
        // Copy the message to the clipboard
        navigator.clipboard
          .writeText(message)
          .then(() => {
            // Call showNotification to display the message
            showNotification(`Copied: ${message}`);
          })
          .catch(() => {
            showNotification("Failed to copy. Please try again!");
          });
      }

      function showNotification(message) {
        const notification = document.getElementById("notification");

        // Set the notification message dynamically
        notification.textContent = message;

        // Show the notification
        notification.classList.remove("hidden");
        notification.classList.add("show");

        // Hide the notification after 3 seconds
        setTimeout(() => {
          notification.classList.remove("show");
          notification.classList.add("hidden");
        }, 3000);
      }

      const toggleButton = document.getElementById("toggleButton");

      toggleButton.addEventListener("click", () => {
        // Toggle button value between true and false
        toggleButtonValue = !toggleButtonValue;
        toggleButton.textContent = toggleButtonValue ? "true" : "false";
      });

      // Normal Color
      const colorNames = [
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen",
      ];

      // Function to generate a random color name based on an alphabet
      function generateRandomNormal() {
        const randomAlphabet = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        ); // Random letter A-Z

        // Filter color names starting with the random alphabet
        const filteredColors = colorNames.filter(
          (color) =>
            color.charAt(0).toLowerCase() === randomAlphabet.toLowerCase()
        );

        if (filteredColors.length > 0) {
          // If matching colors are found, return one of them
          const randomColor =
            filteredColors[Math.floor(Math.random() * filteredColors.length)];
          return randomColor;
        } else {
          // If no color names match, generate a new random color name
          return generateRandomNormal();
        }
      }

      // Hex
      function generateRandomHex() {
        // Generate a random number between 0 and 16777215 (0xFFFFFF in hex)
        const randomNum = Math.floor(Math.random() * 16777216);
        // Convert the number to a hexadecimal string and pad with zeros if needed
        const hexColor = `#${randomNum.toString(16).padStart(6, "0")}`;
        return hexColor;
      }

      // RGBA
      function generateRandomRGBA() {
        const r = Math.floor(Math.random() * 256); // Random value for Red (0-255)
        const g = Math.floor(Math.random() * 256); // Random value for Green (0-255)
        const b = Math.floor(Math.random() * 256); // Random value for Blue (0-255)
        const a = Math.random().toFixed(2); // Random value for Alpha (0-1, two decimal places)

        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      // HSL
      function generateRandomHSL() {
        const h = Math.floor(Math.random() * 361); // Random hue value (0-360)
        const s = Math.floor(Math.random() * 101); // Random saturation value (0-100)
        const l = Math.floor(Math.random() * 101); // Random lightness value (0-100)

        return `hsl(${h}, ${s}%, ${l}%)`;
      }

      // HSLA
      function generateRandomHSLA() {
        const h = Math.floor(Math.random() * 361); // Random hue value (0-360)
        const s = Math.floor(Math.random() * 101); // Random saturation value (0-100)
        const l = Math.floor(Math.random() * 101); // Random lightness value (0-100)
        const a = Math.random().toFixed(2); // Random alpha value (0-1), two decimal places

        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
      }

      // Gradient
      function generateRandomGradient() {
        const color1 = generateRandomColor();
        const color2 = generateRandomColor();

        return `linear-gradient(${Math.floor(
          Math.random() * 361
        )}deg, ${color1}, ${color2})`;
      }

      /*************  ✨ Codeium Command ⭐  *************/
      /**
       * Generates a random color value in RGB format
       * @return {string} a random color value in RGB format
       */
      /******  a82dc658-344c-472d-9a79-cb2eb3cc9d4f  *******/
      function generateRandomColor() {
        const r = Math.floor(Math.random() * 256); // Random value for Red (0-255)
        const g = Math.floor(Math.random() * 256); // Random value for Green (0-255)
        const b = Math.floor(Math.random() * 256); // Random value for Blue (0-255)
        return `rgb(${r}, ${g}, ${b})`;
      }

      // Example usage

      // Listen for change events on the select element
      generateButton.addEventListener("click", function () {
        isClickable = true; // Enable clicks
        let boxs = document.querySelectorAll(".box");
        let current_value = document.getElementById("select").value;
        boxs.forEach((box) => {
          let randomColor;
          if (current_value == "normal") {
            randomColor = generateRandomNormal();
          } else if (current_value == "hex") {
            randomColor = generateRandomHex();
          } else if (current_value == "rgba") {
            randomColor = generateRandomRGBA();
          } else if (current_value == "hsl") {
            randomColor = generateRandomHSL();
          } else if (current_value == "hsla") {
            randomColor = generateRandomHSLA();
          } else if (current_value == "gradient") {
            randomColor = generateRandomGradient();
          } else if (current_value == "random") {
            let ran_num = Math.floor(Math.random() * 6) + 1;
            if (ran_num == 1) {
              randomColor = generateRandomNormal();
            } else if (ran_num == 2) {
              randomColor = generateRandomHex();
            } else if (ran_num == 3) {
              randomColor = generateRandomRGBA();
            } else if (ran_num == 4) {
              randomColor = generateRandomHSL();
            } else if (ran_num == 5) {
              randomColor = generateRandomHSLA();
            } else if (ran_num == 6) {
              randomColor = generateRandomGradient();
            } else {
              randomColor = "405";
            }
          } else {
            randomColor = "404";
            box.style.background = "white";
          }
          // Use `background` instead of `background-color` for gradients
          if (
            current_value === "gradient" ||
            randomColor.startsWith("linear-gradient")
          ) {
            box.style.background = randomColor;
          } else {
            box.style.backgroundColor = randomColor;
          }

          box.style.setProperty("--content", `"${randomColor}"`);
        });

        // Attach click events only when generate is triggered
        boxs.forEach((box) => {
          box.addEventListener("click", handleBoxClick);
        });
      });

      resetButton.addEventListener("click", function () {
        isClickable = false; // Disable clicks
        toggleButtonValue = false;
        toggleButton.textContent = "false";
        let boxs = document.querySelectorAll(".box");
        document.querySelector(".applied").style.display = "none";
        document.getElementById("open").style.display = "block";
        document.body.style.background =
          "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)";
        boxs.forEach((box) => {
          box.style.background = ""; // Reset the background completely, including gradients
          box.style.setProperty("--content", ``); // Remove the content property
          box.removeEventListener("click", handleBoxClick); // Remove click events
        });
        showNotification("Reset successful!");
      });

      // Box click handler
      function handleBoxClick() {
        if (isClickable) {
          let msg = this.style.getPropertyValue("--content");
          bg = msg;
          let color = bg;
          color = color.replace(/^"|"$/g, "");
          msg = msg.replace(/^"|"$/g, "");

          if (toggleButtonValue) {
            document.body.style.background = color;
            console.log(
              `Bg applied to body...${color} bcz of toggleButtonValue = ${toggleButtonValue}`
            );
          } else {
            document.body.style.background =
              "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)";
            console.log(
              `Bg doesn'tapplied to body...${color} bcz of toggleButtonValue = ${toggleButtonValue}`
            );
          }

          if (msg === "404") {
            msg = "Please - Select a color type";
            document.body.style.background = "#A9A9A9";
            showNotification(msg);
          } else {
            showNotification(msg);
            copyMessageAndNotify(msg);
          }
        }
      }

      //
      document.getElementById("open").addEventListener("click", () => {
        document.querySelector(".applied").style.display = "block";
        document.getElementById("open").style.display = "none";
      });
      document.getElementById("cancel").addEventListener("click", () => {
        document.querySelector(".applied").style.display = "none";
        document.getElementById("open").style.display = "block";
      });
