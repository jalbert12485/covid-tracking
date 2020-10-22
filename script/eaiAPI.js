let APIKey="54eab4c8a1e21e13c9b71bd077147931";


// function testEAI();

// We get the current state from the screen, then get the data for that state on yesterday's date and the prior 7 months (8 points total).  This is then saved and displayed on the screen.
function testEAI(event){
    // COVIDDataSet=[];
    // let state=currentCity;
    // if(!state) throw "Error, user did not submit a state";

    // let dates=[];
    // let dateInSeries=moment().subtract(1,"day");
    // for(let i=0;i<datapoints;i++){
    //     dates.push(dateInSeries.format("YYYYMMDD"));
    //     dateInSeries=moment(dateInSeries).subtract(1,period);
    // }
    let url=`http://api.eia.gov/category/?api_key=${APIKey}&category_id=1040004&${getRegionObj("IL").nonfarmEmployment}`;
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
    $.ajax(settings).done(response=>collateEAIData(response));
}
function collateEAIData(response){
    console.log(response);
}
function getRegionObj(state){
    let usa=[
        {
            name:"pacific",
            states:["WA", "OR", "CA", "AK", "HI"],
            nonfarmEmployment:"sdid=STEO.EE_PAC.M"
        },
        {
            name:"mountain",
            states:["MT", "ID", "WY", "NV", "UT", "AZ", "CO", "NM"]
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"west north central",
            states:["ND", "SD","NE", "KS", "MN", "IA", "MO"]
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"east north central",
            states:["IL", "WI", "MI", "IN", "OH"],
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"west south central",
            states:["TX", "OK", "AR", "LA"],
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"east south central",
            states:["MS", "TN", "KY", "AL"],
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"middle atlantic",
            states:["NY", "PA", "NJ"],
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"new england",
            states:["ME", "NH", "VT", "MA", "RI", "CT"],
            nonfarmEmployment:"sdid=STEO.EE_ENC.M"
        },
        {
            name:"south atlantic",
            states:["WV", "VA", "NC", "SC", "GA", "FL", "DE", "MD", "DC"],
            nonfarmEmployment:"sdid=STEO.EE_SAC.M"
        }
    ];
    let obj;
    usa.forEach(element => {
        if(element.states.indexOf(state)!=-1) obj=element;
    });
    return obj;
}

console.log(getRegionObj("IL"));