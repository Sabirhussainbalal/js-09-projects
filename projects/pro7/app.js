  let qrcode_url;

      // Generate QR Code
      const generateQRCode = () => {
        const text = document.getElementById("input").value.trim(); // Trim spaces
        const qrCodeContainer = document.getElementById("qrcode");

        // Clear previous QR Code
        qrCodeContainer.innerHTML = "";

        // Validate input
        if (!text) {
          alert("Please enter valid text or a URL!");
          return;
        }

        // Create a canvas element
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%"; // Set canvas to fill the container
        canvas.style.height = "100%"; // Set canvas to fill the container

        document.getElementById("generate").innerHTML = "Generating...";
        document.getElementById("generate").classList.add("btn_ds");
        document.getElementById("generate").disabled = true;

        // Generate QR Code
        QRCode.toCanvas(canvas, text, function (error) {
          if (error) {
            console.error("Error generating QR Code:", error);
          } else {
            console.log("QR Code generated!");
            // Store the image data URL from the canvas
            qrcode_url = canvas.toDataURL("image/png");

            // Introduce a delay of 2 or 3 seconds before appending the QR code
            setTimeout(() => {
              qrCodeContainer.appendChild(canvas);
              document.getElementById("generate").innerHTML = "Generate";
              document.getElementById("generate").disabled = false;
              document.getElementById("generate").classList.remove("btn_ds");
            }, 3000); // 3000ms = 3 seconds delay
          }
        });
      };

      document
        .getElementById("generate")
        .addEventListener("click", function () {
          generateQRCode();
        });

      // Download the generated QR code as an image
      async function downloadFile(url, filename) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const blob = await response.blob();
          saveAs(blob, filename); // Using FileSaver.js to save the file
        } catch (error) {
          console.error("Error downloading the file:", error);
        }
      }

      document.getElementById("download").addEventListener("click", () => {
        if (!qrcode_url) {
          alert("Please generate a QR code first!");
          return;
        }
        downloadFile(qrcode_url, "downloaded-file.png");
      });
