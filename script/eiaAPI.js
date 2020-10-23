let APIKey="54eab4c8a1e21e13c9b71bd077147931";


// function testEAI();

// We get the current state from the screen, then get the data for that state on yesterday's date and the prior 7 months (8 points total).  This is then saved and displayed on the screen.
function getEIAData(event){
    let state=currentCity;
    let url=`http://api.eia.gov/series/?api_key=${APIKey}&${getRegionObj(state).nonfarmEmployment}&start=202003&end=202010`;
    let cors="https://cors-anywhere.herokuapp.com/";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url":"",
        "method": "GET",
        "headers": {
        }
    }    
    settings.url=url;
    $.ajax(settings).done(response=>collateEIAData(response));
}
// let _rep;
function collateEIAData(response){
    // Make sure our employment array is epty
    employment=[];
    console.log(response);
    monthlyNumbers=response.series[0].data;
    for(num of monthlyNumbers){
        // Emplyment numbers are returned most recent first, so we are using unshift()
        // to fill the array backwards, as it were.
        // Aslo, each num is an array for a date in the first element  and a number in the second
        // we're just ignoring the date, since it's specified in the API call
        // One final note: The numbers are given in millions, but 20 is too small for our chart
        // Let's multiply the numbers by 100, giving us 10,000 jobs for 1.
        employment.unshift(num[1]*100);
    }
    // Displays the chart.
    makeNewChart();    
}
function getRegionObj(state){
    let usa=[
        {
            name:"pacific",
            states:["WA", "OR", "CA", "AK", "HI"],
            nonfarmEmployment:"series_id=STEO.EE_PAC.M"
        },
        {
            name:"mountain",
            states:["MT", "ID", "WY", "NV", "UT", "AZ", "CO", "NM"],
            nonfarmEmployment:"series_id=STEO.EE_MTN.M"
        },
        {
            name:"west north central",
            states:["ND", "SD","NE", "KS", "MN", "IA", "MO"],
            nonfarmEmployment:"series_id=STEO.EE_WNC.M"
        },
        {
            name:"east north central",
            states:["IL", "WI", "MI", "IN", "OH"],
            nonfarmEmployment:"series_id=STEO.EE_ENC.M"
        },
        {
            name:"west south central",
            states:["TX", "OK", "AR", "LA"],
            nonfarmEmployment:"series_id=STEO.EE_WSC.M"
        },
        {
            name:"east south central",
            states:["MS", "TN", "KY", "AL"],
            nonfarmEmployment:"series_id=STEO.EE_ESC.M"
        },
        {
            name:"middle atlantic",
            states:["NY", "PA", "NJ"],
            nonfarmEmployment:"series_id=STEO.EE_MSC.M"
        },
        {
            name:"new england",
            states:["ME", "NH", "VT", "MA", "RI", "CT"],
            nonfarmEmployment:"series_id=STEO.EE_NEC.M"
        },
        {
            name:"south atlantic",
            states:["WV", "VA", "NC", "SC", "GA", "FL", "DE", "MD", "DC"],
            nonfarmEmployment:"series_id=STEO.EE_SAC.M"
        }
    ];
    let obj;
    usa.forEach(element => {
        if(element.states.indexOf(state)!=-1) obj=element;
    });
    return obj;
}
