
function copyText(element) {
  // Get the identifier from the clicked element
  const identifier = element.getAttribute("data-value");
  const baseUrl = "www.";
  const usernames = {
    facebook: "facebook.com/sabirhusseinbalal",
    instagram: "instagram.com/sabirhussainbalal",
    upwork: "upwork.com/freelancers/~014d19ce109591c1de",
    steam: "steamcommunity.com/id/sabirhussainbalal/",
    discord: "#sabirhussainbalal",
    github: "github.com/Sabirhussainbalal",
  };

  // Get the full URL based on the identifier
  const copyValue = usernames[identifier];

  // Copy the URL to the clipboard
  if (copyValue) {
    navigator.clipboard.writeText(baseUrl + copyValue).catch((err) => {
      console.error("Error copying text: ", err);
    });
    document.querySelector(".copied_link").innerHTML =
      "Copied the text: " + (baseUrl + copyValue);
    document.querySelector(".copied_link").style.display = "block";
    setTimeout(() => {
      document.querySelector(".copied_link").style.display = "none";
    }, 2000);
  }
}

const elements = document.querySelectorAll(".card, .contact, img");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("card")) {
          entry.target.classList.add("active-card");
        } else if (entry.target.classList.contains("contact")) {
          entry.target.classList.add("active-contact");
        } else if (entry.target.tagName === "IMG") {
          entry.target.classList.add("active-img");
        }
      }
    });
  },
  { threshold: 0.5 }
);

elements.forEach((element) => observer.observe(element));


const contents = [
  "Programmer",
  "Developer",
  "Designer",
  "Full Stack Developer",
];
let index = 0;

function changeContent() {
  const div = document.getElementById("myDiv");
  div.innerHTML = contents[index];
  index = (index + 1) % contents.length;
}

setInterval(changeContent, 7000); // Change content every 7 seconds

const pcontents = [
  "Programmerr",
  "Developerr",
  "Designerr",
  "Full Stack Developerr",
];
let indexing = 0;

function changeContent() {
  const div = document.getElementById("ok");
  div.innerHTML = pcontents[indexing];
  indexing = (indexing + 1) % pcontents.length;
}

setInterval(changeContent, 7000); // Change content every 7 seconds
