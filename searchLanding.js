// AIzaSyAeFljFOIE6mudnCS-5Hy1SU2xyXlg7NH4
//AIzaSyDAGTC3AS-_Imk7o6S1s__F3l515y4oFFI

let newObj = JSON.parse(localStorage.getItem("userInputs"));

let searchLocation = newObj.enteredLocation;
let searchCheckIn = newObj.checkIn;
let searchCheckOut = newObj.checkOut;
let searchGuests = newObj.guests;
let todayDate = newObj.todayDate;

const numberPerPage = 10;
var pageNumber = 1;
var numberOfPages = 4;

// Initialize and add the map
let map;
let position = [];

async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  //const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Delhi
  map = new Map(document.getElementById("mapFrame"), {
    zoom: 12,
    center: position[0],
    mapId: "DEMO_MAP_ID",
  });

  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  position.forEach((hotelPosition) => {
    const marker = new google.maps.Marker({
      position: hotelPosition,
      map: map,
      title:hotelPosition.title,
      optimized: false,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(map, marker);
    });
  });

}

const url = `https://airbnb13.p.rapidapi.com/search-location?page=${pageNumber}&limit=${numberPerPage}&location=${searchLocation}&checkin=${searchCheckIn}&checkout=${searchCheckOut}&adults=${searchGuests}&children=0&infants=0&pets=0&currency=USD`;
// const url =  `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&results=${numberPerPage}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4c8d38ced0mshc58d6e33f48d990p1b23fcjsn67daf9e1d428",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

const arrayOfHotels = [];
async function getData() {
  let gifLoader = document.getElementById("gifLoader");
  gifLoader.style.display = "block";
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);
    console.log(result.results);
    renderData(result.results);
    likeHotel();
  } catch (error) {
    console.error(error);
    let errorDiv = document.createElement("h1");
    errorDiv.id = "errorDiv";
    errorDiv.innerText = "No results found! Kindly verify the search queries";
    if (
      searchLocation == "" ||
      searchCheckIn == "" ||
      searchCheckOut == "" ||
      searchGuests == ""
    ) {
      errorDiv.innerText = "Please fill all the fields!!";
    } else if (searchCheckIn < todayDate || searchCheckOut < searchCheckIn) {
      errorDiv.innerText =
        "Check-in or check-out dates cannot be in the past!!";
    }
    document.getElementById("hotelSection").append(errorDiv);
  } finally {
    gifLoader.style.display = "none";
  }
}
// render Data from the API and build the HTML structure
function renderData(arrayOfHotels) {
  document.getElementById("locationResults").innerText =
    arrayOfHotels.length + "+ stays in " + searchLocation;
  const searchResults = document.getElementById("searchResults");

  // Clear the existing positions
  position = [];

  arrayOfHotels.forEach((hotel) => {
    position.push({
      lat: hotel.lat,
      lng: hotel.lng,
      title: hotel.name,
    });

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
    hotelImage.style.background = `url(${hotel.images[0]}) no-repeat center / cover`;
    price.innerText = hotel.price.currency + hotel.price.rate;
    propAndCity.innerText = hotel.type + " in " + hotel.city;
    like.innerText = "♡";
    // like.style.background=`url("./images/heart.svg") no-repeat center / cover`;

    propertyType.innerText = hotel.type;

    noOfBeds.innerText = hotel.beds + " beds";
    noOfBaths.innerText = hotel.bathrooms + " bath";
    noOfBedRooms.innerText = hotel.bedrooms + " bedrooms";
    noOfGuests.innerText = hotel.persons + " guests";
    amenities.innerText = hotel.previewAmenities.join(" . ");
    if (hotel.rating != null) {
      rating.innerText = hotel.rating;
    } else {
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
    // Add a button for booking cost breakdown
    const costButton = document.createElement("button");
    costButton.innerText = "Cost Breakdown";
    costButton.addEventListener("click", () => showBookingCostBreakdown(hotel));
    //searchResults.appendChild(costButton);
    ratingsDiv.appendChild(costButton);
    detailsDiv.appendChild(ratingsDiv);

    hotelDiv.appendChild(imageDiv);
    hotelDiv.appendChild(detailsDiv);
    


    // Add a directions button
    const directionsButton = document.createElement("button");
    directionsButton.id="directionsBtn";
    directionsButton.innerText = "Get Directions";
    directionsButton.addEventListener("click", function() {
        openDirections(hotel);
    });
    hotelDiv.appendChild(directionsButton);
    searchResults.appendChild(hotelDiv);

  });
  console.log(position, position);
  initMap();
}
getData();

//get directions
function openDirections(location) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // Open Google Maps directions from the user's current location to the hotel's location
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, "_blank");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showBookingCostBreakdown(hotel) {
  // Calculate additional fees and total cost
  const additionalFees = hotel.price.rate * 0.10; // Assuming additional fees are 10% of base price
  const totalCost = hotel.price.rate + additionalFees;

  // Create a modal dialog box
  const modal = document.createElement("div");
  modal.style.display = "block";
  modal.style.width = "300px";
  modal.style.height = "200px";
  modal.style.backgroundColor = "#fff";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

  // Add booking cost breakdown to the modal
  modal.innerHTML = `
      <h2>Booking Cost Breakdown</h2>
      <p>Base Rate: $${hotel.price.rate.toFixed(2)}</p>
      <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
      <p>Total Cost: $${totalCost.toFixed(2)}</p>
  `;

  // Add a close button to the modal
  const closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.id = "closeModal";
  closeButton.addEventListener("click", () => modal.style.display = "none");
  modal.appendChild(closeButton);

  // Add the modal to the body
  document.body.appendChild(modal);
}


//like button functionality
function likeHotel() {
  let like = document.getElementsByClassName("like");
  for (let i = 0; i < like.length; i++) {
    like[i].addEventListener("click", function () {
      like[i].classList.toggle("liked");
      if (like[i].classList.contains("liked")) {
        like[i].innerHTML = "❤";
      } else {
        like[i].innerHTML = "♡";
      }
    });
  }
}
