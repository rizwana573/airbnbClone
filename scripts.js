
//mobile menu functionality
function mobileMenu(){
    let ham = document.getElementById("hamburgerMenu");
    let slider = document.getElementById("slider");
    ham.addEventListener("click", function(){
        slider.style.display = slider.style.display == "block" ? "none" : "block";
    });
}
//show search bar
function showSearchBar(){
  let placesToStay = document.getElementById("placesToStay");
  let searchBar1 = document.getElementById("searchBar1");
  let experiences = document.getElementById("experiences");
  let searchBar2 = document.getElementById("searchBar2");
    
  placesToStay.addEventListener("click", function(){
    searchBar2.style.display ="none";
    searchBar1.style.display = "grid";
    experiences.classList.remove("active");
    this.classList.add("active");
});
    experiences.addEventListener("click", function(){
    searchBar1.style.display = "none";
      searchBar2.style.display = "grid";
      placesToStay.classList.remove("active");
      this.classList.add("active");
  });
  }
document.addEventListener("DOMContentLoaded", (event) => {
    mobileMenu();
    showSearchBar();
});