
      document.querySelector(".open").addEventListener("click", () => {
        document.querySelectorAll(".hide").forEach((element) => {
          element.style.display = "block";
        });
        document.querySelector(".open").style.display = "none";
      });
      document.querySelector(".x").addEventListener("click", () => {
        document.querySelectorAll(".hide").forEach((element) => {
          element.style.display = "none";
        });
        document.querySelector(".open").style.display = "block";
      });

      const dateForm = document.querySelector("#dateForm");
      let timerInterval;

      dateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let DOB = document.querySelector("#date").value;
        const dateOfBirth = new Date(DOB);
        const currentDate = new Date();

        function updateTimer() {
          const now = new Date();
          const ageInSeconds = Math.floor((now - dateOfBirth) / 1000);
          const years = Math.floor(ageInSeconds / (365.25 * 24 * 60 * 60));
          const months = Math.floor(
            (ageInSeconds % (365.25 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
          );
          const days = Math.floor(
            (ageInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
          );
          const hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
          const minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
          const seconds = ageInSeconds % 60;

          document.querySelector(".year").textContent = years;
          document.querySelector(".month").textContent = months;
          document.querySelector(".day").textContent = days;
          document.querySelector(".hour").textContent = hours;
          document.querySelector(".min").textContent = minutes;
          document.querySelector(".sec").textContent = seconds;
        }

        clearInterval(timerInterval); // Clear any existing timer
        timerInterval = setInterval(updateTimer, 1000); // Update every second

        document.querySelector(".container").style.display = "flex";
        document.querySelector(".box").style.display = "none";
        document.getElementsByTagName("body")[0].style.backgroundImage =
          "url('2.jpg')";
        updateTimer(); // Initial call to display immediately
      });
   
