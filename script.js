const themeBtn = document.querySelector(".icons-theme");

themeBtn.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark-theme");
});
