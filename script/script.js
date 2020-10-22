// Global variables-Some of these can be changed to better names.
// Note that by cities, we are actually saying state.  It was originally meant to be able to search by city, but the api did not take the cities for search purposes.
let cities=[];
let allData=[];
// By population, we mean the set of data which should be displayed as the dependent variable in the chart.
let cases=[];
let deathCount=[];
// This is the information that will be displayed as the independent variable of the chart.
let dateLabel=[];
// Data collected from API, will be converted before being displayed.
let COVIDDataSet=[];
let currentCity;
// How many dates for we want to check?
const datapoints=8;
// How frequently do we want to check? Could be "month", "week", or "day"
let period="month"; // We could let the user set this if we wanted to

// If the user has been here before, then we've saved their search in their local storage as "cities".  If not, we create an empty array to initialize their local storage.
cities=JSON.parse(localStorage.getItem("cities"));
if(!(cities == null || cities==[])  ){
    currentCity=cities[cities.length-1];
}else{
    cities=[];
    saveToLocal();
}
let currentDate=moment().format('L'); 

// Once the main html has loaded, we can run the rest of our scripts
$("document").ready(init);



// ||****++++----....____....----++++****||
// ||        init()                      ||
// ||****++++----....____....----++++****||
function init(){
    // If we have any previously saved data, we should search the last saved state and display the information.
    if(currentCity){
        displayCities();
        getData();
        // testEAI();
    }
}



// When input form submitted (including pressing enter on input line), refresh page is prevented and the city is added to the local storage.  Then, then searched for city is displayed.
$("#city-submit").on("click",function(e){
    e.preventDefault();
    addCity();
});
// When the x is pressed on the displayed save data, this state will be removed from local storage.
$("body").on("click",".close",function(){
    removeCity(this.dataset.city);
});
// When a saved state is clicked, this will display the information for that state.
$("body").on("click",".city",function(e){
    e.preventDefault();
    currentCity=cities[this.dataset.city];
    getData();
});    

// Updates the local storage to be the current states.
function saveToLocal(){
    localStorage.setItem("cities",JSON.stringify(cities));
}

// Retrieves the local storage and puts into the current storage.
function getLocal(){
    cities=JSON.parse(localStorage.getItem("cities"));
}

// First check to make sure the input is non-empty and not a repeat.  If this is the case, will create a new local storage point.
function addCity(){
    let cityInput=$("#city-input").val().trim();
    let shouldSave=true;
    // Checks if the user already saved the data.
    for(let i=0; i<cities.length; i++){
        if(cityInput==cities[i]){
            shouldSave=false;
        }
    }
    // List of all state abbreviations.
    let stateAbbr=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];    
    // Checks user input to make sure it is in the above list.
    if(stateAbbr.indexOf(cityInput) == -1){
        shouldSave=false;
    }
    // Saves the data if a valid input is given.
    if(shouldSave){
        $("#input-error").attr("style","display: none");
        cities.push(cityInput);
        currentCity=cityInput;
        saveToLocal();
        displayCities();
        getData();
    }else{
        // If the input was not valid, let's the user know.
        $("#input-error").attr("style","display: block");
    }
}

// Removes a state from the local storage.
function removeCity(cityNumber){
    cities.splice(cityNumber,1);
    saveToLocal();
    displayCities();
}

//Creates the display for the current date and state's data. (Does not include computer coded date).
function displayData(displayDate=0){
    let displayIndex=allData.length-1-displayDate;
    $("#stats").empty();
    for(const value in allData[displayIndex]){
        if(value != "date"){
        const newPara=$("<p>");
        newPara.html(`<strong>${allData[displayIndex][value].name}:</strong> ${allData[displayIndex][value].data.toLocaleString()}`);
        $("#stats").append(newPara);}
    }
    // Creates a form that the user can use to change the date for the displayed data.
    let newForm=$("<form>");
    let newDiv=$("<div>");
    let newLabel=$("<label>");
    newLabel.attr("for","change-date-form");
    newLabel.text("Select date");
    let newSelect=$("<select>");
    newSelect.addClass("form-control");
    newSelect.attr("id","change-date-form");
    let newOption=$("<option>");
    newOption.text("Choose a date");
    newOption.attr("value",0);    
    newSelect.append(newOption);
    newOption=$("<option>");
    newOption.text("Current Date");
    newOption.attr("value",0);
    newSelect.append(newOption);
    for(let i=1; i<8; i++){
        newOption=$("<option>");
        newOption.text(`${i} months ago.`);
        newOption.attr("value",i);
        newSelect.append(newOption);
    }
    newSelect.on("change",function(e){
        e.preventDefault();
        displayData(this.value);
     })
    newLabel.append(newSelect);
    newDiv.append(newLabel);
    newForm.append(newDiv);
    $("#stats").append(newForm);
}


