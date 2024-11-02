document.addEventListener("DOMContentLoaded", () => {
  fetch("/")
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Output: Hello from the server!
      document.getElementById("message").textContent = data;
    });
});
