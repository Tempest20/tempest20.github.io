const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const button = document.getElementById("button");
const KELVIN_TO_CELSIUS = 273.15;

// button 
button.addEventListener("click", () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput.value+'&APPID=3be5bb848a98ee3ef61a7da298e6cff6')
    .then(response => response.json())
    .then(data => {
        
        let dataName = data['name'];
        let dataTemp = data['main']['temp'];
        let dataDesc = data['weather'][0]['description'];
        
        dataTemp = parseFloat(dataTemp);
        // conversion from Kelvin to Celsius
        dataTemp = Math.round(dataTemp - KELVIN_TO_CELSIUS);
        

        weatherBalloon(dataName, dataTemp, dataDesc);
    })
    // error handler
    .catch( () => {
        desc.innerHTML = "Unavailable";
        temp.innerHTML = "Unavailable";
        cityName.innerHTML = "Please enter a valid city";
    })
})

// using a seperate function to set the innerHTML
const weatherBalloon = (n, t, d) => {

    $(document).ready(function() {
        $("#cityName").hide();
        $("#temp").hide();
        $("#desc").hide();

        cityName.innerHTML = n;
        temp.innerHTML = t + "° C";
        desc.innerHTML = d; 

        $("#cityName").fadeIn("1000", function() {
            $("#temp").fadeIn("1000", function() {
                $("#desc").fadeIn("1000");
            });
        });
    });
}
