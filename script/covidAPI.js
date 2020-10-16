let COVIDDataSet=[];
const datapoints=3;
let period="month"; // We could let the user set this if we wanted to

function getData(event){
    let state=$("#city-input").val();
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
        "url":cors+url,
        "method": "GET",
        "headers": {
        }
    }    
    for(let i=0;i<datapoints;i++){
        url="https://api.covidtracking.com/v1/states/"+state+"/"+dates[i]+".json";
        settings.url=cors+url;
        $.ajax(settings).done(response=>collateCovidData(response));
    }

}

let _rep;
function collateCovidData(response){
    _rep=response;
    let {date, state, death:dead}=response;
    date=date.toString();
   // date=moment(date).format("LL");

    COVIDDataSet.push({"date":date, "dead":dead, "formattedDate":moment(date).format("LL")});
    if(COVIDDataSet.length===(datapoints)) shipCovidData();
}

function shipCovidData(){
    COVIDDataSet=COVIDDataSet.sort(function(a,b){
        console.log(a.date);
        if(moment(a.date).format("X")>moment(b.date).format("X")) return 1;
        else return -1;
    });
    console.log(COVIDDataSet);
}




function displayCovidData(){
    var COVIDBox=$("<div>").addClass("COVID-box");
    var bodyText=`<p>On ${date},</p><p> ${dead} people were </p><p>confirmed to have died of COVID.</p>`;
    var modalHTML=`<div class="COVID-modal"><div class="COVID-modal-header"><span class="COVID-modal-exit">X</span><div class="COVID-modal-body">${bodyText}</div></div></div>`;
    COVIDBox.html(modalHTML);
    $("body").append(COVIDBox);
    $(".COVID-box").on("click",function(){$(".COVID-box").remove();})
}