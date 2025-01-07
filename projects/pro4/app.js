
   let questionEl = document.querySelector(".question");
      let hintsEl = document.querySelectorAll(".hint");
      let heartsbreak = document.querySelectorAll(".bi");
      let resultEl = document.querySelector(".result");
      let timeEl = document.getElementById("time");
      let scoreEl = document.getElementById("score");
      let levelEl = document.getElementById("level");
      let highEl = document.getElementById("high");
      let startButton = document.getElementById("start");
      let resetButton = document.getElementById("reset");
      let heartsEl = document.getElementById("heartsrmg");
      let lastresult = 0;
      let score = 0;
      let level = 1;
      let highscore = 0;
      let life = 5;
      let show_high = true;
      let correct_ans = "";
      let tem_time = 0;
      let end = false;
      let uniqueCounter = 0;
      let high_brk = 0;
      let high_show = true;
      let death = 0;
      let total_score = 0;
      let startTime = 0;
      let endTime = 0;
      let totalTimeSeconds = 0;
      let totalTimeMinutes = 0;

      const showMessage = (selector) => {
        const message = document.querySelector(selector);
        if (message) {
          // Remove the animation class to reset
          message.classList.remove("animated");

          // Force reflow to restart the animation
          void message.offsetWidth;

          // Add the animation class to trigger it again
          message.classList.add("animated");
        }
      };

      const yes = () => {
        endTime = Date.now();
        totalTimeSeconds = (endTime - startTime) / 1000;

        // Convert to minutes
        totalTimeMinutes = (totalTimeSeconds / 60).toFixed(2);

        show_chart();

        document.querySelector(".confirm").style.display = "none";

        if (life === 0) {
          document.querySelector(".score_dec").textContent = "Game Over";
        } else {
          document.querySelector(".score_dec").textContent = "Game Reset";
        }
        showMessage(".score_dec");
        hintsEl.forEach((hint, index) => {
          hint.textContent = 0;
          hint.classList.remove("started");
          hint.classList.remove("red");
          hint.classList.remove("hint_started");
        });

        show_high = true;
        heartsbreak.forEach((heartsbreak, index) => {
          heartsbreak.classList.remove("broken");
        });

        end = false;
        document.removeEventListener("click", handleHintClick);
        setBeforeWidth(".break_level_line", "0", 2, "#ff8a00");
        setBeforeWidth(".break_high_score_line", "0", 2, "#ff8a00");
        document.querySelector(".profile").style.display = "block";
        clearInterval(timer);
        high_show = true;
        questionEl.textContent = "0";
        timeEl.textContent = 0;
        high_brk = 0;
      };

      const show_chart = () => {
        document.getElementById("level_is").textContent = level;
        document.getElementById("high_is").textContent = highscore;
        document.getElementById("time_is").textContent = `${totalTimeMinutes}m`;
        document.getElementById("total_is").textContent = total_score;
        document.getElementById("death_is").textContent = death;
      };

      const chart = () => {
        document.querySelector(".container").classList.remove("blur_con");
        document.querySelector(".bg").classList.remove("blur_bg");
        resetButton.disabled = false;
        startButton.innerText = "Start Game";
        startButton.disabled = false;
        resetButton.classList.remove("started");
        startButton.classList.remove("started");
        document.querySelector(".profile").style.display = "none";
        score = 0;
        level = 1;
        life = 5;
        death = 0;
        total_score = 0;
        highscore = highscore;
        scoreEl.textContent = score;
        levelEl.textContent = level;
        startTime = 0;
        endTime = 0;
        totalTimeSeconds = 0;
        totalTimeMinutes = 0;
      };

      document.querySelector(".cn_pr").addEventListener("click", chart);

      function setBeforeWidth(
        selector,
        width,
        time = 0,
        backgroundColor = null
      ) {
        const element = document.querySelector(selector);

        if (!element) {
          console.error(`Element with selector "${selector}" not found.`);
          return;
        }

        // Increment the counter for generating a unique class name
        const uniqueClass = `before-width-${uniqueCounter++}`;
        element.classList.add(uniqueClass);

        // Get or create a stylesheet
        let styleSheet = document.querySelector("#dynamic-styles");
        if (!styleSheet) {
          styleSheet = document.createElement("style");
          styleSheet.id = "dynamic-styles";
          document.head.appendChild(styleSheet);
        }

        // Generate rules for initial width, transition, and final width
        const initialRule = `
    .${uniqueClass}::before {
        width: 0;
        transition: width ${time}s ease-in-out, background-color ${time}s ease-in-out;
        ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
    }
  `;
        const finalRule = `
    .${uniqueClass}::before {
        width: ${width};
        ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
    }
  `;

        // Insert initial rule
        styleSheet.sheet.insertRule(
          initialRule,
          styleSheet.sheet.cssRules.length
        );

        // Set width (and optional background color) after a small delay to trigger animation
        setTimeout(() => {
          styleSheet.sheet.insertRule(
            finalRule,
            styleSheet.sheet.cssRules.length
          );
        }, 10);
      }

      const updateHearts = () => {
        // Get all heart elements
        const hearts = document.querySelectorAll(".life svg");

        // Loop through each heart
        hearts.forEach((heart, index) => {
          if (index >= life) {
            heart.classList.add("broken");
            heartsEl.textContent = "💔";
          } else {
            heart.classList.remove("broken");
            heartsEl.textContent = "❤";
          }
          if (life === 0) {
            heartsEl.textContent = "Game Over 💔";
            end = true;
          }
          if (life < 5) {
            showMessage(".score_dec");
          }
        });
      };

      const generateQuestion = () => {
        let num1 = Math.floor(Math.random() * 10) + 1; // Use let for reassigning later
        let num2 = Math.floor(Math.random() * 10) + 1; // Use let for reassigning later
        let operator = ""; // Change const to let

        if (operator === "/") {
          while (num1 % num2 !== 0) {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
          }
        }

        // Levels - , + , * , / Last Question
        if (level === 1) {
          operator = "-";
        } else if (level === 2) {
          operator = "+";
        } else if (level === 3) {
          operator = "*";
        } else if (level === 4) {
          operator = "/";
        } else if (level === 5) {
          operator = "/";
        } else if (level === 6) {
          yes();
          startButton.disabled = true;
          resetButton.disabled = true;
          resetButton.classList.add("started");
          startButton.classList.add("started");
          setTimeout(() => {}, 2000);
        }

        const levelPercentage = (level / 5) * 100;
        setBeforeWidth(".break_level_line", `${levelPercentage}%`, 2);

        const highPercentage = (score / highscore) * 100;

        if (high_show) {
          setBeforeWidth(".break_high_score_line", `${highPercentage}%`, 2);
        }

        // Handle background color when percentage is 100
        if (highPercentage === 100) {
          high_brk++;
          if (high_brk === 2) {
            setBeforeWidth(".break_high_score_line", "100%", 2, "green");
            high_show = false;
          }
        }

        if (levelPercentage === 100) {
          setBeforeWidth(".break_level_score_line", "100%", 2, "green");
        }

        const question = `${num1} ${operator} ${num2}`;
        const result = eval(`${num1} ${operator} ${num2}`);

        return [question, result]; // Return as an array
      };

      const showQuestion = () => {
        clearInterval(timer); // Ensure the timer is cleared
        const [question, result] = generateQuestion();
        questionEl.textContent = question;

        hintsEl.forEach((hint, index) => {
          hint.textContent = Math.floor(Math.random() * 10) + 1;
          if (hint.textContent === result) {
            hint.textContent = Math.floor(Math.random() * 10) + 1;
          }
        });

        const hintIndex = Math.floor(Math.random() * hintsEl.length);
        hintsEl[hintIndex].textContent = result;
        lastresult = result;
        correct_ans = hintsEl[hintIndex];
        updateTime(); // Start the timer for the new question
      };

      const checkAnswer = (answer) => {
        answer = parseFloat(answer);
        if (answer === lastresult) {
          resultEl.textContent = "Correct!";
          score++;
          total_score++;
          if (life < 5) {
            life++;
          }
          showMessage(".score_inc");

          scoreEl.textContent = score;
        } else {
          resultEl.textContent = "Wrong!";
          score--;
          life--;
          death++;

          scoreEl.textContent = score;
          correct_ans.classList.add("red");
          showMessage(".score_dec");
        }

        if (score > highscore) {
          highscore = score;
          highEl.textContent = highscore;
          if (show_high) {
            showMessage(".high_inc");
            show_high = false;
          }
        }

        if (score >= level * 5) {
          level++;
          levelEl.textContent = level;
          showMessage(".level_inc");
        }

        if (score < 0) {
          score = 0;
          scoreEl.textContent = score;
        }

        updateHearts();

        if (end) {
          yes();
          setTimeout(() => {}, 2000);
        } else {
          setTimeout(() => {
            showQuestion();
            updateTime();
            hintsEl.forEach((hint, index) => {
              hint.classList.remove("started");
              hint.classList.remove("red");
            });
            resultEl.textContent = "----";
          }, 2000);
        }
      };

      let timer; // Global timer variable

      const updateTime = () => {
        clearInterval(timer); // Clear any existing timer
        timeEl.textContent = 15;

        timer = setInterval(() => {
          timeEl.textContent--;
          if (timeEl.textContent === "0") {
            clearInterval(timer); // Stop the timer at 0
            checkAnswer(-1); // Consider calling a fail-safe for no selection
          }
        }, 1000);
      };

      let isClickFrozen = false; // Track if clicks are currently frozen
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const handleHintClick = async (event) => {
        if (isClickFrozen) return; // Prevent action if clicks are frozen

        // Check if the clicked element has the 'hint' class
        if (event.target.classList.contains("hint")) {
          isClickFrozen = true; // Freeze clicks

          hintsEl.forEach((hint) => {
            hint.classList.add("started");
          });
          event.target.classList.remove("started");
          clearInterval(timer);
          checkAnswer(event.target.textContent); // Your custom logic
          await delay(2000); // Wait for 2 seconds
          isClickFrozen = false;
        }
      };

      // Start with Start Button
      startButton.addEventListener("click", async function () {
        startTime = Date.now();
        this.disabled = true;
        startButton.innerText = "Game Started";
        startButton.classList.add("started");

        hintsEl.forEach((hint, index) => {
          hint.classList.add("hint_started");
        });

        showQuestion();
        updateTime();

        // Attach the event listener

        document.addEventListener("click", handleHintClick);

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      });

      resetButton.addEventListener("click", function () {
        this.disabled = true;
        startButton.disabled = true;
        resetButton.classList.add("started");
        startButton.classList.add("started");
        tem_time = timeEl.textContent;
        timeEl.textContent = 0;
        document.querySelector(".score_dec").textContent = "Are you sure?";
        showMessage(".score_dec");

        document.querySelector(".confirm").style.display = "block";
        document.querySelector(".container").classList.add("blur_con");
        document.querySelector(".bg").classList.add("blur_bg");

        const no = () => {
          document.querySelector(".confirm").style.display = "none";
          document.querySelector(".container").classList.remove("blur_con");
          document.querySelector(".bg").classList.remove("blur_bg");
          document.querySelector(".score_dec").textContent =
            "Request Cancelled";
          showMessage(".score_dec");
          timeEl.textContent = tem_time;
          resetButton.disabled = false;
          startButton.disabled = false;
          resetButton.classList.remove("started");
          startButton.classList.remove("started");
        };

        document.getElementById("yes").addEventListener("click", function () {
          yes();
        });

        document.getElementById("no").addEventListener("click", function () {
          no();
        });

        document
          .getElementById("cancel_dia")
          .addEventListener("click", function () {
            no();
          });
      });

      document
        .querySelector(".contact_button")
        .addEventListener("click", () => {
          document.querySelector(".contacts").style.display = "flex";
          setTimeout(() => {
            document.querySelectorAll(".contact").forEach((contact) => {
              contact.classList.add("zero");
            });
          }, 100);
        });
