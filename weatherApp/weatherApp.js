//Getting HTML elements
let locationInput = document.getElementById("location-id");
let locationName = document.getElementById("location-name");
let description = document.getElementById("description");
let degress = document.getElementById("temperature");
let btn = document.getElementById("getWeather");
let icon = document.getElementById("cloudImg");
let cardContainer = document.getElementById("weather-cards");

const apiKey = "RGLWMCQF2M8HJUNW5BWFHTQF5";

// Functionality of Get button
btn.onclick = function() {
    if( locationInput.value === "" ) {
        alert("Please enter some location...");
    }
    else {
      let str="";
      let city = locationInput.value;
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
        fetch(url, {
            "method": "GET"
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
           degress.innerHTML = data.days[0].temp+`<span class="id">&nbsp;&deg;</span><span>&nbsp;C</span>`;
           description.innerHTML = data.days[0].conditions;
           icon.innerHTML = getIcon(data.days[0].icon);
           locationName.innerHTML = data.address;
           weatherCards = data.days.slice(1,8);
           `<h3 class="heading">Forecasting the next week weather reports:</h3>`
           weatherCards.forEach((ele,index) => {
            str +=
            `<div class="container-block" key=${ele.datetime}>
            <div class="week-name">${getDayName(ele.datetime)}</div>
              <div class="weekly-cloud-img" id="cloudImg"> 
              ${getIcon(ele.icon)}
              </div>
                <span class="weekly-temp">${ele.temp}</span><span class="id"> &deg;</span><span> C</span>
                <div class="weekly-description">${ele.description}</div>
            </div>`
           })
           cardContainer.innerHTML = str;
        })
        .catch(err => {
          if(err) {
           alert("Invalid name entered");
          }
        });
  }  
}
//Getting the icon based on weather
function getIcon(condition) {
  // if else approach
  
    if (condition === "partly-cloudy-day") {
      return `<img src="https://i.ibb.co/PZQXH8V/27.png" width="40px" height="40px" />`;
    } else if (condition === "partly-cloudy-night" || condition === "cloudy") {
      return `<img src="https://i.ibb.co/Kzkk59k/15.png" width="40px" height="40px" />`;
    } else if (condition === "rain") {
      return `<img src="https://i.ibb.co/kBd2NTS/39.png" width="40px" height="40px" />`;
    } else if (condition === "clear-day") {
      return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" />`;
    } else if (condition === "clear-night") {
      return `<img src="https://i.ibb.co/1nxNGHL/10.png" width="40px" height="40px" />`;
    } else {
      return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" />`;
    }
  //  Switch case approach
    // switch(condition) {
    //   case(condition === "partly-cloudy-day"):
    //     return `<img src="https://i.ibb.co/PZQXH8V/27.png" width="40px" height="40px" />`;
    //   case (condition === "partly-cloudy-night"):
    //    return `<img src="https://i.ibb.co/Kzkk59k/15.png" width="40px" height="40px" />`;
    //   case(condition === "rain"):
    //      return `<img src="https://i.ibb.co/kBd2NTS/39.png" width="40px" height="40px" />`;
    //   case(condition === "clear-day"):
    //     return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" />`;
    //   case(condition === "clear-night"):
    //      return `<img src="https://i.ibb.co/1nxNGHL/10.png" width="40px" height="40px" />`;
    //   default:
    //      return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" />`;
    // }
}

// Getting Day name through date
function getDayName(date) {
    let day = new Date(date);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day.getDay()];
}

