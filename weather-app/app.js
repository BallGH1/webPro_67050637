const errorMessage = document.getElementById("error-message");
function search() { 
    console.log("function process");
    const city = document.getElementById("city-input").value ; 
    if(city) { 
        fetchData(city) ; 
    }
}
async function fetchData(city) {
    const apiKey = "0f38d304094f41d4be735152261409";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {  
        const response = await fetch(url) ; 
        if(!response.ok) { 
            throw new Error ('ไม่สามารถเรียก API ได้');
        }
        const data = await response.json() ;
        displayWeather(data) ; 
        
    }catch(error) {  
        errorMessage.textContent = "เกิดข้อผิดพลาด กรุณาลองใหม่";
    }
}
function displayWeather(data) { 
    data.current.humidity ;
    console.log(data.current.temp_c);
    console.log(data.current.humidity);
    console.log(data.current.wind_kph);
    console.log(data.location.name);
    console.log(data.location.country);



}
    
