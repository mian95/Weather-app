const apiKey = "beedfb7d75cd6a432d21a5f08dcccaa0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
// q={city name}&appid={API key}

let search = document.querySelector("input");
let btn = document.querySelector("#search-btn");
let pic = document.querySelector("#pic");
let cityName = document.querySelector("#city");
let temprature = document.querySelector("#tem");
let wind = document.querySelector("#wind");
let feel = document.querySelector("#feel");
let humidity = document.querySelector("#humidity");

btn.addEventListener("click", () => {
  Go();
});
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    Go();
  }
});
async function Go() {
  try {
    let res = await fetch(
      apiUrl + `&q=${search.value}&appid=${apiKey}&units=metric`
    );
    let data = await res.json();
    if (res.ok) {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".details").style.display = "block";

      temprature.innerHTML = Math.round(data.main.temp) + `°<sub>C</sub>`;
      cityName.innerText = data.name;
      wind.innerText = data.wind.speed + `m/s`;
      humidity.innerText = data.main.humidity + `%`;
      feel.innerHTML = Math.round(data.main.feels_like) + `°<sub>C</sub>`;

      changeIcon(data);
      //   document.querySelector(".details").style.display = "block";
    } else {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".details").style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
}

function changeIcon(data) {
  try {
    if (data.weather[0].description === "scattered clouds") {
      pic.innerText = "cloud";
    } else if (data.weather[0].description === "broken clouds") {
      pic.innerText = "partly_cloudy_day";
    } else if (data.weather[0].description === "clear sky") {
      pic.innerText = "clear_day";
    } else if (data.weather[0].description === "overcast clouds") {
      pic.innerText = "reset_white_balance";
    } else if (data.weather[0].description === "sunny") {
      pic.innerText = "sunny";
    }
  } catch (err) {
    console.log(err);
  }
}
