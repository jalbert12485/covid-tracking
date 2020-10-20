// Make a new chart
function makeNewChart(){
    $("#chartArea").empty();
    let newCanvas=$("<canvas>");
    newCanvas.attr("id","myChart");
    newCanvas.attr("style","width: 400 height:200");    

    // let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(newCanvas, {
        type: 'line',
        data: {
            labels: dateLabel,
            datasets: [{
                label: '# of Cases (hundreds)',
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
    
                ],
                borderWidth: 1
            },{
                label: '# of Deaths',
                data: deathCount,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
    
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
    
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
        $("#chartArea").append(newCanvas);
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