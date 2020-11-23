const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".myDetails");
const time = document.querySelector("img.time");
const icon = document.querySelector(".myIcon img");
// update card UI
const updateUi = (data)=>{
    const cityDetail = data.cityDetail;
    const cityWeather = data.cityWeather;
    // we can make this also shorthand notation
    //const {cityDetail,cityWeather} = data;
    
    //updating the template
    details.innerHTML = `
        <h5 class="my-3">${cityDetail.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    
    // time source updating
    
    let timeSrc = null;
    if(cityWeather.IsDayTime){
        timeSrc = "img/day.svg";
    }else{
        timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);
    
    // the ternary operator 
    //it is most likely php, and it creates same condition in one line
    // let timeSrc = cityWeather.IsDayTime ? "img/day.svg" : "img/night.svg";
    // time.setAttribute("src", timeSrc);
    
    // updating the icons
    const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    // if else checking for d-none, display
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
}

// update city data
const updateCity = async (city)=>{
    const cityDetail = await getCity(city);
    const cityWeather = await getWeather(cityDetail.Key);
    return {
        cityDetail: cityDetail,
        cityWeather: cityWeather
    };
    //return{cityDetail,cityWeather}; this is shorthand notation
    // we can use it when both name and element are same in an object
}

// controlling the input
cityForm.addEventListener("submit", e =>{
    e.preventDefault();
    const cityUser = cityForm.city.value.trim();
    cityForm.reset(); 

    // updating the city data
    updateCity(cityUser)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});