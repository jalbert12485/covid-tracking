// Determines if the screen width is bigger or smaller than 500px.
    function displayLabels(){
        if(window.screen.width < 500){
            return false;
        }else{
            return true;
        }  
    }

    currentLabelDisplay=displayLabels();

    // When the window is resized, this checks if we've changed from small to large or vice-versa.  If we did, it renders the chart again.  In the chart, the labels are only rendered when the screen is large as according to the above function.

    $(window).resize(function(){
        
        if(displayLabels() != currentLabelDisplay){
            currentLabelDisplay=displayLabels();
            makeNewChart();
        }
    });


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
            },{
                label: 'Gas Prices',
                data: employment,
                backgroundColor: [
                    'rgba(75, 99, 255, 0.2)',
    
                ],
                borderColor: [
                    'rgba(75, 99, 255, 1)',
    
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: displayLabels()
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks:{
                        display: displayLabels()
                    }
    
                }]
            }
        }
    });
        $("#chartArea").append(newCanvas);
        // Creates a note after the chart to explain difference in y-scales.
        let newPara=$("<p>");
        newPara.html("<strong>Note:</strong> Chart graphs cases in hundreds so both deaths and cases are easily visible.  That is, a 1% death rate would show both datasets as equal.")
        $("#chartArea").append(newPara);    

    }



// Displays the user's locally stored states for easy recall.
    function displayCities(){
        $("#city-container").empty();
    
        for(var i=0; i<cities.length; i++){
            var newCity=$("<p>")
            newCity.text(cities[i]);
            newCity.addClass("border bg-white p-1 mr-0 ml-0 mb-2 city");
            newCity.attr("data-city",i);
            var remove=$("<button>");
            remove.addClass("close");
            remove.attr("data-city",i);
            remove.html("<span aria-hidden='true'>&times;</span>");
            newCity.append(remove);
            $("#city-container").append(newCity);
        }
    
    }