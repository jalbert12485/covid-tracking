// We get the current state from the screen, then get the data for that state on yesterday's date and the prior 7 months (8 points total).  This is then saved and displayed on the screen.
function getData(event){
    COVIDDataSet=[];
    // Takes user input in order to search for the input state.
    let state=currentCity;
    if(!state) throw "Error, user did not submit a state";
    // Gets the dates for when we should get COVID data on.
    let dates=[];
    let dateInSeries=moment().subtract(1,"day");
    for(let i=0;i<datapoints;i++){
        dates.push(dateInSeries.format("YYYYMMDD"));
        dateInSeries=moment(dateInSeries).subtract(1,period);
    }
    let url="https://api.covidtracking.com/v1/states/";
    let cors="https://cors-anywhere.herokuapp.com/";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url":"",
        "method": "GET",
        "headers": {
        }
    }    
    for(let i=0;i<datapoints;i++){
        url="https://api.covidtracking.com/v1/states/"+state+"/"+dates[i]+".json";
        settings.url=url;
        $.ajax(settings).done(response=>collateCovidData(response));
    }

}

// Formats the data into a form which can be accepted into the data constructor.
function collateCovidData(response){
    _rep=response;
    date=response.date.toString();
    humanDateFormat=moment(date).format("LL");
    // Note that the commented portions are left in for future use if we can get the information.  If not we can delete these
    let newData= new FormatData(currentCity,humanDateFormat,response.date,response.positive,response.death);
    // Pushes data to COVIDData array.
    COVIDDataSet.push(newData);
    
    // When the loop is finished, will sort, store and display data.
    if(COVIDDataSet.length==datapoints){
    sortData();
    storeData();
    }
}

// Puts the response data in chronological order.
function sortData(){
    COVIDDataSet=COVIDDataSet.sort(function(a,b){
        // Ideally this date info should be stored in ISO format
        if(a.date>b.date) return 1;
        else return -1;
    });
}

// Takes the reponse data and formats in such a way that it can be displayed on the screen and read by the user.  Added a case where the api returns null to give a result of 0 instead.
function storeData(){
    // All Data is the amalgamation of all collected data on the chosen state saved in such a way that it makes it easy to display. (see data constructor).
    allData=[];
    // Cases, deathcount and dateLabel will be used as datasets for the chart we make.
    cases=[];
    deathCount=[];
    dateLabel=[];
    for(let i=0; i< COVIDDataSet.length; i++){
        // For all entries in COVID Data, we format it with the Data constructor.
    const newConstData=new Data(COVIDDataSet[i]);
    allData.push(newConstData);
    // If there is no data from API (or it is null), stores the value 0 instead (since these are cases and deaths a null return means there were no cases).
    if(!COVIDDataSet[i].totalCount){
        cases.push(0);
    }else{
        // If there is a value, we send the value of counts (divided by 100) to be displayed.
    cases.push(Number(COVIDDataSet[i].totalCount)/100);
    }
    // Deaths follows same pattern as cases, except we don't divide by 100.  This is meant to make both graphs visible.
    if(!COVIDDataSet[i].death){
        deathCount.push(0); 
    }else{
    deathCount.push(COVIDDataSet[i].death);
    }
    dateLabel.push(COVIDDataSet[i].humanDateFormat);}
    // Displayed the typed data.
    displayData();
    // Displays the chart.
    makeNewChart();
}