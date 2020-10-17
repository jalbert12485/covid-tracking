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

function getData(event){
    COVIDDataSet=[];
    let state=currentCity;
    if(!state) throw "Error, user did not submit a state";

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
function collateCovidData(response){
    _rep=response;
    date=response.date.toString();
    humanDateFormat=moment(date).format("LL");

    let newData={ 
        // city: "Chicago",
        // county:  "Cook",
        state: response.state,
        humanDateFormat: humanDateFormat, 
        date: date,
        // pop: 5150000,
        totalCount:  response.positive,
//         countPerPop:  0,
        death: response.death,
        // deathPerPop:  0,
        // currentCount:  0,
        // curCountPerPop:  0    
    }
    COVIDDataSet.push(newData);
    sortData();
    storeData();
}

function sortData(){
    COVIDDataSet=COVIDDataSet.sort(function(a,b){
        // Ideally this date info should be stored in ISO format
        if(moment(a.date).format("X")>moment(b.date).format("X")) return 1;
        else return -1;
    });
}

function storeData(){
    console.log(COVIDDataSet);
    allData=[];
    population=[];
    dateLabel=[];
    for(let i=0; i< COVIDDataSet.length; i++){
    const newConstData=new Data(COVIDDataSet[i]);
    allData.push(newConstData);
    population.push(COVIDDataSet[i].totalCount);
    dateLabel.push(COVIDDataSet[i].humanDateFormat);}
    displayData();
    makeNewChart();
}