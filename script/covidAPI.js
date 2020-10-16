function getData(event){
    // let zip="60626";
    // let daysInPast=6;
    // let url="	https://localcoviddata.com/covid19/v1/cases/newYorkTimes?daysInPast="+daysInPast+"&zipCode="+zip;
    let date="20201007";
    let state="IL";
    let url="https://api.covidtracking.com/v1/states/"+state+"/"+date+".json";
    let cors="https://cors-anywhere.herokuapp.com/";

    var settings = {
        "async": true,
        "crossDomain": true,
       // "url": "api.votesmart.org/Candidates.getByZip?o=JSON&zip5="+zip+"&key="+APIKey,
        "url":cors+url,
        "method": "GET",
        "headers": {
        }
    }    
    $.ajax(settings).done(response=>displayCovidData(response));
}

let _rep;
function displayCovidData(response){
    _rep=response;
    console.log(response);
    let {date, state, deathConfirmed:dead}=response;
    // fix up date format
    // put the year in the read (c.f. https://stackoverflow.com/questions/10841868/move-n-characters-from-front-of-string-to-the-end)
    // date=date.toString().substr(4)+date.toString().substr(0,4);
    date=date.toString();
    date=date.slice(4,6)+"-"+date.slice(6,8)+"-"+date.slice(0,4);
    console.log(date);
    date=moment(date).format("LL")
    var COVIDBox=$("<div>").addClass("COVID-box");
    var bodyText=`<p>On ${date},</p><p> ${dead} people were </p><p>confirmed to have died of COVID.</p>`;
    var modalHTML=`<div class="COVID-modal"><div class="COVID-modal-header"><span class="COVID-modal-exit">X</span><div class="COVID-modal-body">${bodyText}</div></div></div>`;
    COVIDBox.html(modalHTML);
    $("body").append(COVIDBox);
    $(".COVID-box").on("click",function(){$(".COVID-box").remove();})
}