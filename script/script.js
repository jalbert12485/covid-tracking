var cities=JSON.parse(localStorage.getItem("cities"));
if(cities===null){
    cities=[];
    saveToLocal();
}

var currentCity=cities[cities.length-1];
var currentDate=moment().format('L'); 


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

displayCities();

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

$("#city-submit").on("click",function(e){
    e.preventDefault;
    addCity();
    displayCities();
});

$("body").on("click",".close",function(){
    removeCity(this.dataset.city);
});
$("body").on("click",".city",function(e){
    e.preventDefault;
    currentCity=cities[this.dataset.city];
    getWeatherInfo();
});

function displayData(){
    for(let i=0; i< 10; i++){
        let newCol=$("<div>");
        newCol.addClass("col");
        let newBar="<img>";
        newBar.attr("style",`height=${100*i}px`)
    }
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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