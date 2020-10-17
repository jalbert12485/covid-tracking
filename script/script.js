// Global variables
let cities=[];
let allData=[];
let population=[];
let dateLabel=[];
let COVIDDataSet=[];
// How many dates for we want to check?
const datapoints=8;
// How frequently do we want to check? Could be "month", "week", or "day"
let period="month"; // We could let the user set this if we wanted to

// If the user has been here before, then we've saved their search in 
// their local storage as "cities"
cities=JSON.parse(localStorage.getItem("cities"));
if(cities) var currentCity=cities[cities.length-1];
let currentDate=moment().format('L'); 

// Once the main html has loaded, we can run the rest of our scripts
$("document").ready(init);



// ||****++++----....____....----++++****||
// ||        init()                      ||
// ||****++++----....____....----++++****||
function init(){
    // If we have any previously saved data, we should put it in the search history
    // below the submit button
    if(cities) displayCities();

    // When the user clicks in the #city-submit button or hits enter, or really
    // just submits the form data in any way, don't reload the page
    // but do add the city to our localStorage list, re-display our search
    // history, and then send our API request off via getData()
    $("#city-submit-form").on("submit",function(e){
        e.preventDefault();
        addCity();
        displayCities();
        getData();
    });
    // Clicking on any of the .close classes will remove a city from the search history
    $("body").on("click",".close",function(){
        removeCity(this.dataset.city);
    });
    // Clicking on a city in our search history will send an API call.
    $("body").on("click",".city",function(e){
        e.preventDefault;
        currentCity=cities[this.dataset.city];
        getData();
    });

    // Is this necessary? I don't understand what it does?
    for(let i=0; i < 8; i++){
        let stats=new Data(exampleData);
        allData.push(stats);
    } 
    getData();
}

function saveToLocal(){
    console.log("Save to local: "+cities);
    localStorage.setItem("cities",JSON.stringify(cities));
}

function getLocal(){
    cities=JSON.parse(localStorage.getItem("cities"));
}


function addCity(){
    var cityInput=$("#city-input").val().trim();
    if((cityInput != null) && (cityInput != "")){
        if(!cities) cities=[];
        cities.push(cityInput);
        currentCity=cityInput;
        saveToLocal();
        displayCities();
    }
}

function removeCity(cityNumber){
    cities.splice(cityNumber,1);
    saveToLocal();
    displayCities();
}
function displayData(){
    $("#stats").empty();
    for(const value in allData[allData.length-1]){
        const newPara=$("<p>");
        newPara.html(`<strong>${allData[allData.length-1][value].name}:</strong> ${allData[allData.length-1][value].data}`);
        $("#stats").append(newPara);
    }
}