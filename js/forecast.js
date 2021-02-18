const apiKey = "q2vzCpoCPaXcFoRj0Tr52uGr3IGiVL0C";

// get weather

const getWeather = async (id)=>{ // I can call it anything
    const base = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${apiKey}`;
    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];
}


// get city information
const getCity = async (city)=>{
    const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apiKey}&q=${city}`; // when we see ? after a link it means its a query
    const response = await fetch(base+query);
    const data = await response.json();
    
    return data[0]; // now in from the array set, we will take the closest match of our location which is [0]
    //so not console, we will return the value, so the function will return a promise
}

// getCity("dhaka")
//     .then(data => {
//         return getWeather(data.Key);
//     }).then(data =>{
//         console.log(data);
//     }).catch(err => console.log(err));

// these were for checking, but we need to hook it with the main html or DOM
