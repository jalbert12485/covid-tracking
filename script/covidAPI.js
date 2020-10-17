let COVIDDataSet=[];
const datapoints=3;
let period="month"; // We could let the user set this if we wanted to

function getData(event){
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
        url="https://api.covidtracking.com/v1/states/"+"IL"+"/"+dates[i]+".json";
        settings.url=url;
        $.ajax(settings).done(response=>collateCovidData(response));
    }

}

let _rep;
function collateCovidData(response){
    _rep=response;
    date=response.date.toString();
    date=moment(date).format("LL");

    let newData={
 
        // city: "Chicago",
        // county:  "Cook",
        state: response.state,
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

}

function sortData(){
    COVIDDataSet=COVIDDataSet.sort(function(a,b){
        if(moment(a.date).format("X")>moment(b.date).format("X")) return 1;
        else return -1;
    });

}

function storeData(){
    allData=[];
    population=[];
    dateLabel=[];
    for(const value of COVIDDataSet)
    const newConstData=new Data(COVIDDataSet[value]);
    allData.push(newConstData);
    population.push(COVIDDataSet[value].totalCount);
    dateLabel.push(COVIDDataSet[value].date);
    displayData();
    makeNewChart();

}



// function displayCovidData(){
//     var COVIDBox=$("<div>").addClass("COVID-box");
//     var bodyText=`<p>On ${date},</p><p> ${dead} people were </p><p>confirmed to have died of COVID.</p>`;
//     var modalHTML=`<div class="COVID-modal"><div class="COVID-modal-header"><span class="COVID-modal-exit">X</span><div class="COVID-modal-body">${bodyText}</div></div></div>`;
//     COVIDBox.html(modalHTML);
//     $("body").append(COVIDBox);
//     $(".COVID-box").on("click",function(){$(".COVID-box").remove();})
// }

// const newConstData=new Data(newData);
// COVIDDataSet.push(newConstData);
// population.push(newData.death);
// dateLabel.push(newData.date);