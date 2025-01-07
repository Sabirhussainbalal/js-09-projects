   let button = document.querySelector("button");

      // Reusable validation function
      function validateMarks(subject, obtainedId, totalId) {
        const obtained = parseInt(
          document.getElementById(obtainedId).value,
          10
        );
        const total = parseInt(document.getElementById(totalId).value, 10);

        if (isNaN(obtained) || isNaN(total)) {
          displayError(
            `Please enter valid numbers for ${subject}.`,
            obtainedId,
            totalId
          );
          return null;
        } else if (obtained > total) {
          displayError(
            `Obtained marks cannot be greater than total marks for ${subject}.`,
            obtainedId,
            totalId
          );
          return null;
        } else {
          clearError(obtainedId, totalId);
          return { obtained, total };
        }
      }

      // Display error messages
      function displayError(message, obtainedId, totalId) {
        if (document.querySelector(".container").style.display === "none") {
          //
          console.log("Container None");
          document.getElementById("cus_result").textContent = message;
          console.log(document.getElementById("cus_result"));
          con;
          document.getElementById("cus_result").style.color = "red";
        } else {
          //
          console.log("Container Block");
          document.getElementById("result").textContent = message;
          document.getElementById("result").style.color = "red";
        }
        document.getElementById(obtainedId).classList.add("error");
        document.getElementById(totalId).classList.add("error");
      }

      // Clear error highlighting
      function clearError(obtainedId, totalId) {
        if (document.querySelector(".container").style.display === "none") {
          //
          console.log("Container None");
          document.getElementById("cus_result").textContent = "";
        } else {
          //
          console.log("Container Block");
          document.getElementById("result").textContent = "";
        }
        document.getElementById(obtainedId).classList.remove("error");
        document.getElementById(totalId).classList.remove("error");
      }

      // Button click event
      button.addEventListener("click", function () {
        const subjects = [
          {
            name: "Physics",
            obtainedId: "physicsObtained",
            totalId: "physicsTotal",
          },
          { name: "Math", obtainedId: "mathObtained", totalId: "mathTotal" },
          {
            name: "Chemistry",
            obtainedId: "chemistryObtained",
            totalId: "chemistryTotal",
          },
          {
            name: "Biology",
            obtainedId: "biologyObtained",
            totalId: "biologyTotal",
          },
          {
            name: "Computer",
            obtainedId: "computerObtained",
            totalId: "computerTotal",
          },
          {
            name: "English",
            obtainedId: "englishObtained",
            totalId: "englishTotal",
          },
        ];

        let totalObtained = 0;
        let totalMarks = 0;

        for (const subject of subjects) {
          const result = validateMarks(
            subject.name,
            subject.obtainedId,
            subject.totalId
          );
          if (result === null) return; // Stop calculation if any validation fails
          totalObtained += result.obtained;
          totalMarks += result.total;
        }

        const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);
        document.getElementById(
          "result"
        ).textContent = `You scored ${totalObtained}/${totalMarks} (${percentage}%).`;
        document.getElementById("result").style.color = "white";
      });

      // Custom button click event
      document.getElementById("custom").addEventListener("click", function () {
        document.getElementById("number").value = "";
        document.querySelector(".container").classList.add("blur");
        document.querySelector(".box").style.display = "flex";
        document.querySelector(".dots").style.display = "inline-block";
        document.querySelector("#custom").classList.add("customize");
      });

      document.getElementById("close").addEventListener("click", function () {
        document.querySelector(".container").classList.remove("blur");
        document.querySelector(".dots").style.display = "none";
        document.querySelector(".box").style.display = "none";
        document.querySelector("#custom").classList.remove("customize");
      });

      document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("number").style.display = "block";
        document.getElementById("next_one").style.display = "block";
        document.getElementById("next_two").style.display = "none";
        document.getElementById("number").value = "";
        document.querySelector(".subjects").innerHTML = "";
        document.getElementById("number").readOnly = false;
        document.getElementById("number").style.backgroundColor = "#f0f0f0";
        document.getElementById("cus_result").textContent = "";
      });

      document
        .getElementById("next_one")
        .addEventListener("click", function () {
          var subs = document.getElementById("number").value;
          let numbs = [
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
          ];

          if (subs === "") {
            document.getElementById("cus_result").textContent =
              "Please Enter a valid Number";
            document.getElementById("cus_result").style.color = "red";
          } else if (subs < 1 || subs > 9) {
            document.getElementById("cus_result").textContent =
              "Subjects Number 1 to 9";
            document.getElementById("cus_result").style.color = "red";
          } else {
            document.getElementById("cus_result").textContent = "";

            for (let i = 1; i <= subs; i++) {
              document.querySelector(".subjects").innerHTML += `<!-- ${
                numbs[i - 1]
              } Subject -->
        <div class="custom_one">
          <span> <input type="text" class="${
            numbs[i - 1]
          }"  placeholder="Enter ${numbs[i - 1]} Subject Name"/></span>
          <div class="input" id="${numbs[i - 1]}">
            <input type="number" placeholder="Obtained" id="${
              numbs[i - 1]
            }Obtained" />
            <input type="number" id="${
              numbs[i - 1]
            }Total" placeholder="Total" />
          </div>
        </div>
       `;
            }
            document.getElementById("number").readOnly = true;
            document.getElementById("number").style.backgroundColor = "gray";
            document.getElementById("next_one").style.display = "none";
            document.getElementById("next_two").style.display = "block";
          }
        });

      document
        .getElementById("next_two")
        .addEventListener("click", function () {
          let numbs = [
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
          ];
          var subs = document.getElementById("number").value;

          // Initialize an array to store subjects
          let subjects = [];

          for (let i = 1; i <= subs; i++) {
            subjects.push({
              name: document.querySelector(`.${numbs[i - 1]}`).value, // Assuming the element has an ID matching `numbs[i - 1]`
              obtainedId: `${numbs[i - 1]}Obtained`,
              totalId: `${numbs[i - 1]}Total`,
            });
          }

          let totalObtained = 0;
          let totalMarks = 0;

          for (const subject of subjects) {
            const result = validateMarks(
              subject.name,
              subject.obtainedId,
              subject.totalId
            );
            if (result === null) return; // Stop calculation if any validation fails
            totalObtained += result.obtained;
            totalMarks += result.total;
          }

          const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);
          document.getElementById(
            "cus_result"
          ).textContent = `You scored ${totalObtained}/${totalMarks} (${percentage}%).`;
          document.getElementById("cus_result").style.color = "white";
        });
