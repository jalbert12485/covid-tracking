// Make a new chart
function makeNewChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabel,
            datasets: [{
                label: '# of Cases',
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


// Displays the user's locally stored states for easy recall.
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