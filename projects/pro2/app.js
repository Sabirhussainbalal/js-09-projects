
  let blurElements = document.querySelectorAll(".blur");
      let AgainblurElements = document.querySelectorAll(".error");
      document
        .getElementById("fetchButton")
        .addEventListener("click", async () => {
          document.querySelector(".loader").style.display = "block";
          const username = document
            .getElementById("usernameInput")
            .value.trim();

          document.querySelector(".container").style.visibility = "visible";

          if (!username) {
            document.querySelector(".msg").style.visibility = "visible";
            document.querySelector(".container").style.visibility = "hidden";
            document.querySelector(".blur").classList.add("blur");
            error.message = "Invalid Username";
            document.querySelector(".loader").style.display = "none";
            return;
          }

          const apiUrl = `https://api.github.com/users/${username}`;

          try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
              throw new Error(`User not found: ${response.statusText}`);
            }

            const data = await response.json();

            // Display user data

            document.querySelector(".name").textContent = data.name || "N/A";
            document.querySelector(".username").textContent =
              "@" + data.login || "N/A";
            document.querySelector(".p").textContent = data.bio || "N/A";
            document.querySelector(".followers").textContent = data.followers;
            document.querySelector(".following").textContent = data.following;
            document.querySelector(".public").textContent = data.public_repos;
            document.querySelector(".go a").href = data.html_url;
            document.querySelector("img").src = data.avatar_url;
            document.querySelector(".msg").style.visibility = "hidden";
            document.querySelector(".container").style.visibility = "visible";
            for (let i = 0; i < blurElements.length; i++) {
              blurElements[i].classList.remove("blur");
            }
            document.querySelector(".loader").style.display = "none";
          } catch (error) {
            document.querySelector(".msg").style.visibility = "visible";
            document.querySelector(".container").style.visibility = "hidden";
            for (let i = 0; i < AgainblurElements; i++) {
              AgainblurElements[i].classList.add("blur");
            }
            error.message = "Invalid Username";
            document.querySelector(".loader").style.display = "none";
          }
        });
