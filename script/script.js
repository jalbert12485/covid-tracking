// Global variables

var cities=JSON.parse(localStorage.getItem("cities"));
if(cities===null){
    cities=[];
    saveToLocal();
}
var currentCity=cities[cities.length-1];
var currentDate=moment().format('L'); 

// Once the main html has loaded, we can run the rest of our scripts
$("document").ready(init);

// Make a new chart
function makeNewChart(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dateLabel,
        datasets: [{
            label: '# of Votes',
            data: population,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

// ||****++++----....____....----++++****||
// ||        init()                      ||
// ||****++++----....____....----++++****||
function init(){
    displayCities();

    $("#city-submit").on("click",function(e){
        e.preventDefault();
        addCity();
        displayCities();
        getData();
    });
    $("body").on("click",".close",function(){
        removeCity(this.dataset.city);
    });
    $("body").on("click",".city",function(e){
        e.preventDefault;
        currentCity=cities[this.dataset.city];
        getWeatherInfo();
    });

    $("#city-submit-form").on("submit",getData);

}

function displayCities(){
    $("#city-container").empty();

    for(var i=0; i<cities.length; i++){
        var newCity=$("<p>")
        newCity.text(cities[i]);
        newCity.addClass("border bg-white p-1 m-0 city");
        newCity.attr("data-city",i);
        var remove=$("<button>");
        remove.addClass("close");
        remove.attr("data-city",i);
        remove.html("<span aria-hidden='true'>&times;</span>");
        newCity.append(remove);
        $("#city-container").append(newCity);
    }

}


function saveToLocal(){
    localStorage.setItem("cities",JSON.stringify(cities));
}

function getLocal(){
    cities=JSON.parse(localStorage.getItem("cities"));
}


function addCity(){
    var cityInput=$("#city-input").val().trim();
    if((cityInput != null) && (cityInput != "")){
    cities.push(cityInput);
    currentCity=cityInput;
    saveToLocal();
    displayCities();}
}

function removeCity(cityNumber){
    cities.splice(cityNumber,1);
    saveToLocal();
    displayCities();
}


const exampleData={
 
    city: "Chicago",
    county:  "Cook",
    state: "Illinois",
    date: "December 16", 
    pop: 5150000,
    totalCount:  336000,
    countPerPop:  0,
    death: 9300,
    deathPerPop:  0,
    currentCount:  100000,
    curCountPerPop:  0

}

function Data(dat){

    this.city={ name: "City", data: dat.city};
    this.county={ name: "County", data: dat.county};
    this.state={ name: "State", data: dat.state};
    this.date={ name: "Date", data: dat.date};
    this.pop={ name: "Population", data: Number(dat.pop)};
    this.totalCount={ name: "Total Cases", data: Number(dat.totalCount)};
    this.countPerPop={ name: "Total Cases Per Capita", data: (this.totalCount.data/this.pop.data).toFixed(4)};
    this.death={ name: "Deaths", data: Number(dat.death)};
    this.deathPerPop={ name: "Deaths Per Capita", data: (this.death.data/this.pop.data).toFixed(4) };
    this.currentCount={ name: "Current Cases", data: Number(dat.currentCount)};
    this.curCountPerPop={ name: "Current Cases Per Capita", data: (this.currentCount.data/this.pop.data).toFixed(4)};
    this.recovered={ name: "Recovered", data: this.totalCount.data-this.currentCount.data-this.death.data};
} 

let allData=[];

for(let i=0; i < 8; i++){
    let stats=new Data(exampleData);
    allData.push(stats);
}

function displayData(){

    for(const value in allData[0]){
        const newPara=$("<p>");
        newPara.html(`<strong>${allData[0][value].name}:</strong> ${allData[0][value].data}`);
        $("#stats").append(newPara);
    }


}
 
displayData();

let population=[];

let dateLabel=[];

for(let i=0; i<8; i++){
    population.push(allData[i].pop.data);
    dateLabel.push(allData[i].date.data);
}

makeNewChart();