let searchLocation = localStorage.getItem("enteredLocation");
let searchCheckIn = localStorage.getItem("checkIn");
let searchCheckOut = localStorage.getItem("checkOut");
let searchGuests = localStorage.getItem("guests");
let todayDate = localStorage.getItem("todayDate");

const numberPerPage = 10;
var pageNumber = 1;
var numberOfPages = 4;

const url =
  `https://airbnb13.p.rapidapi.com/search-location?page=${pageNumber}&limit=${numberPerPage}&location=${searchLocation}&checkin=${searchCheckIn}&checkout=${searchCheckOut}&adults=${searchGuests}&children=0&infants=0&pets=0&currency=USD`;
// const url =  `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&results=${numberPerPage}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c202adeb7dmshaff65564b4ff496p1470b6jsnc211fad2b159",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

const arrayOfHotels = [];
async function getData() {
    let gifLoader = document.getElementById("gifLoader");
    gifLoader.style.display="block";
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);
    console.log(result.results);
    renderData(result.results);
    likeHotel();
   // pagination();
  } catch (error) {
    console.error(error);
    let errorDiv = document.createElement("h1");
    errorDiv.id = "errorDiv";
    errorDiv.innerText = "No results found! Kindly verify the search queries";
    if(searchLocation=='' || searchCheckIn ==''  || searchCheckOut == ''  ||searchGuests=='' ){
        errorDiv.innerText = "Please fill all the fields!!";  
    }
    else if (searchCheckIn<todayDate || searchCheckOut<searchCheckIn){
        errorDiv.innerText = "Check-in or check-out dates cannot be in the past!!";
    }
    document.getElementById("hotelSection").append(errorDiv);
  }
  finally{
    gifLoader.style.display="none";
  }
}
 // render Data from the API and build the HTML structure
function renderData(arrayOfHotels) {
    document.getElementById("locationResults").innerText = arrayOfHotels.length + "+ stays in " + searchLocation;
  const searchResults = document.getElementById("searchResults");
  arrayOfHotels.forEach((hotel) => {
    const hotelDiv = document.createElement("li");
    hotelDiv.classList.add("hotelDiv");
    const imageDiv = document.createElement("article");
    imageDiv.classList.add("imageDiv");
    const detailsDiv = document.createElement("article");
    detailsDiv.classList.add("detailsDiv");

    const hotelImage = document.createElement("span");
    hotelImage.classList.add("hotelImage");

    const propertyDiv = document.createElement("article");
    propertyDiv.classList.add("propertyDiv");
    const propAndCity = document.createElement("div");
    propAndCity.classList.add("propAndCity");
    const title = document.createElement("h1");
    title.classList.add("title");
    const like = document.createElement("span");
    like.classList.add("like");

    const amenitiesDiv = document.createElement("article");
    amenitiesDiv.classList.add("amenitiesDiv");
    const noOfBeds = document.createElement("span");
    noOfBeds.classList.add("noOfBeds");
    const noOfBaths = document.createElement("span");
    noOfBaths.classList.add("noOfBaths");
    const noOfBedRooms = document.createElement("span");
    noOfBedRooms.classList.add("noOfBedRooms");
    const noOfGuests = document.createElement("span");
    noOfGuests.classList.add("noOfGuests");
    const amenities = document.createElement("span");
    amenities.classList.add("amenities");
    const propertyType = document.createElement("span");
    propertyType.classList.add("propertyType");

    const ratingsDiv = document.createElement("article");
    ratingsDiv.classList.add("ratingsDiv");
    const rating = document.createElement("span");
    rating.classList.add("rating");
    const reviewsCount = document.createElement("span");
    reviewsCount.classList.add("reviewsCount");

    const price = document.createElement("span");
    price.classList.add("price");
    const city = document.createElement("span");
    city.classList.add("city");
    const isSuperHost = document.createElement("span");

    title.innerText = hotel.name;
    hotelImage.style.background= `url(${hotel.images[0]}) no-repeat center / cover`;
    price.innerText = hotel.price.currency + hotel.price.rate ;
    propAndCity.innerText = hotel.type + " in " + hotel.city;
    like.innerText="♡";
    // like.style.background=`url("./images/heart.svg") no-repeat center / cover`; 

    propertyType.innerText = hotel.type;

    noOfBeds.innerText = hotel.beds + " beds";
    noOfBaths.innerText = hotel.bathrooms + " bath";
    noOfBedRooms.innerText = hotel.bedrooms + " bedrooms";
    noOfGuests.innerText = hotel.persons + " guests";
    amenities.innerText = hotel.previewAmenities.join(" . ");
    if(hotel.rating!=null){
        rating.innerText = hotel.rating;
    }else{
        rating.innerText = "no rating";
    }  
    reviewsCount.innerText = "(" + hotel.reviewsCount + " reviews)";
    city.innerText = hotel.city;
    isSuperHost.innerText = hotel.isSuperHost ? "yes" : "no";

    imageDiv.appendChild(hotelImage);

    propertyDiv.appendChild(propAndCity);
    propertyDiv.appendChild(title);
    propertyDiv.appendChild(like);
    detailsDiv.appendChild(propertyDiv);
    
    amenitiesDiv.appendChild(noOfGuests);
    amenitiesDiv.appendChild(propertyType);
    amenitiesDiv.appendChild(noOfBedRooms);
    amenitiesDiv.appendChild(noOfBeds);
    amenitiesDiv.appendChild(noOfBaths);
    amenitiesDiv.appendChild(amenities);
    detailsDiv.appendChild(amenitiesDiv);

    ratingsDiv.appendChild(rating);
    ratingsDiv.appendChild(reviewsCount);
    //ratingsDiv.appendChild(isSuperHost);
    ratingsDiv.appendChild(price);   
    detailsDiv.appendChild(ratingsDiv);

    hotelDiv.appendChild(imageDiv);
    hotelDiv.appendChild(detailsDiv);
    searchResults.appendChild(hotelDiv);
  });
}
getData();

// pagination
// Add event listeners to the prev button
const prev = document.querySelector('.prev');
prev.addEventListener('click', (e) => {
   e.preventDefault();
   if (pageNumber > 1) {
      pageNumber--;
      getData(pageNumber);
   }
});
// Add event listeners to the next button
const next = document.querySelector(".next");
next.addEventListener("click", (e) => {
    e.preventDefault();
    if (pageNumber < numberOfPages) {
        pageNumber++;
        getData(pageNumber);
    }
});

//like button functionality
function likeHotel(){
    let like = document.getElementsByClassName("like");
    for(let i=0;i<like.length;i++){
      like[i].addEventListener("click", function(){
          like[i].classList.toggle("liked");
          if(like[i].classList.contains("liked")){
              like[i].innerHTML="❤"; 
          }
          else{
              like[i].innerHTML="♡";
          }
        });  
    }
}
