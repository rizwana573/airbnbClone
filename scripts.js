//mobile menu functionality
function mobileMenu() {
  let ham = document.getElementById("hamburgerMenu");
  let slider = document.getElementById("slider");
  ham.addEventListener("click", function () {
    slider.style.display = slider.style.display == "block" ? "none" : "block";
  });
}
//show search bar
function showSearchBar() {
  let placesToStay = document.getElementById("placesToStay");
  let searchBar1 = document.getElementById("searchBar1");
  let experiences = document.getElementById("experiences");
  let searchBar2 = document.getElementById("searchBar2");

  placesToStay.addEventListener("click", function () {
    searchBar2.style.display = "none";
    searchBar1.style.display = "grid";
    experiences.classList.remove("active");
    this.classList.add("active");
  });
  experiences.addEventListener("click", function () {
    searchBar1.style.display = "none";
    searchBar2.style.display = "grid";
    placesToStay.classList.remove("active");
    this.classList.add("active");
  });
}
//formSubmit
function formSubmit(){
    let submit1 = document.getElementById("submit1");
    submit1.addEventListener("click", function () {
        let enteredLocation = document.getElementById("location").value;
        let checkIn = document.getElementById("checkIn").value;
        let checkOut = document.getElementById("checkOut").value;
        let guests = document.getElementById("guests").value;
        let todayDate = new Date().toISOString().slice(0, 10);

        //console.log(enteredLocation, checkIn, checkOut, guests);
        localStorage.setItem("enteredLocation", enteredLocation);
        localStorage.setItem("checkIn", checkIn);
        localStorage.setItem("checkOut", checkOut); 
        localStorage.setItem("guests", guests); 
        localStorage.setItem("todayDate", todayDate); 
        window.location.pathname = "/airbnbClone/searchLanding.html"; 
        if(window.location.pathname == "/airbnbClone/searchLanding.html"){
            window.location.reload();
        }     
    });    
}
window.addEventListener("load", (event) => {
    formSubmit();
  });
document.addEventListener("DOMContentLoaded", (event) => {
  mobileMenu();
  showSearchBar();
  const d = new Date();
  let year = d.getFullYear();
  document.getElementById("year").innerHTML = year;
  //formSubmit();
});
