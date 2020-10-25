let APIKey="54eab4c8a1e21e13c9b71bd077147931";

// We get the current state from the screen, then get the data for that state on yesterday's date and the 
// prior 7 months (8 points total).  This is then saved and displayed on the screen.
// This function is called at the end of getCovidData(), in covid.js
function getEIAData(highestNumber, type="fuel"){
    let state=currentCity;
    let url=`https://api.eia.gov/series/?api_key=${APIKey}&${getRegionObj(state).seriesID}&start=202003&end=202010`; 
    if(type==="fuel")
        url=`https://api.eia.gov/series/?api_key=${APIKey}&${getPaddMap(state).seriesID}&start=202003&end=202010`;
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
    $.ajax(settings).done(response=>collateEIAData(response, highestNumber, type));
}
// let _rep;
function collateEIAData(response, highestNumber, type){
    let numbers=[];
    monthlyNumbers=response.series[0].data;
    let thisHighNumber=0;
    for(num of monthlyNumbers){
        // Emplyment numbers are returned most recent first, so we are using unshift()
        // to fill the array backwards, as it were.
        // Aslo, each num is an array for a date in the first element  and a number in the second
        // we're just ignoring the date, since it's specified in the API call
        // One final note: The numbers are given in millions, but 20 is too small for our chart
        // Let's multiply the numbers by some factor to make sure they are at the same scale
        if(num[1]>thisHighNumber) thisHighNumber=num[1];
        numbers.unshift(num[1]);
    }
    // Some of these data sets (fueld costs, for example) do not have data for the current month
    // So we will project data based on the previous months (teachnially we'll just copy the last
    // month's numbers, which is obviously not the right way to do it. But I'm no data scientist!)
    if(numbers.length<8) numbers.unshift(numbers[0]);
    // So the highest fuel or employment number death number will be the same as the highest death number
    // We multiply them by factor.
    let factor=highestNumber/thisHighNumber;       
    numbers=numbers.map(element=>element*=factor);

    if(type==="employment") employment=numbers;
    else if(type==="fuel") fuel=numbers;
    
    // If we just got the fuel data, we need to get the employment data next
    if(type==="fuel") getEIAData(highestNumber, "employment");
    else makeNewChart();    
}
function getRegionObj(state){
    // The EIA collates non-farm employment data by region, so every state in is one of eight regions
    let usa=[
        {
            name:"pacific",
            states:["WA", "OR", "CA", "AK", "HI"],
            seriesID:"series_id=STEO.EE_PAC.M"
        },
        {
            name:"mountain",
            states:["MT", "ID", "WY", "NV", "UT", "AZ", "CO", "NM"],
            seriesID:"series_id=STEO.EE_MTN.M"
        },
        {
            name:"west north central",
            states:["ND", "SD","NE", "KS", "MN", "IA", "MO"],
            seriesID:"series_id=STEO.EE_WNC.M"
        },
        {
            name:"east north central",
            states:["IL", "WI", "MI", "IN", "OH"],
            seriesID:"series_id=STEO.EE_ENC.M"
        },
        {
            name:"west south central",
            states:["TX", "OK", "AR", "LA"],
            seriesID:"series_id=STEO.EE_WSC.M"
        },
        {
            name:"east south central",
            states:["MS", "TN", "KY", "AL"],
            seriesID:"series_id=STEO.EE_ESC.M"
        },
        {
            name:"middle atlantic",
            states:["NY", "PA", "NJ"],
            seriesID:"series_id=STEO.EE_MSC.M"
        },
        {
            name:"new england",
            states:["ME", "NH", "VT", "MA", "RI", "CT"],
            seriesID:"series_id=STEO.EE_NEC.M"
        },
        {
            name:"south atlantic",
            states:["WV", "VA", "NC", "SC", "GA", "FL", "DE", "MD", "DC"],
            seriesID:"series_id=STEO.EE_SAC.M"
        }
    ];
    let obj;
    usa.forEach(element => {
        if(element.states.indexOf(state)!=-1) obj=element;
    });
    return obj;
}
function getPaddMap(state){
    // The EIA collates fuel data by PADD region (Petroleum Administration for Defense Distracts), 
    // so every state in is one of five PADDs (or seven, if you split up the east coast)
    let usa=[
        {
            name:"west coast",
            states:["WA", "OR", "CA", "AK", "HI", "NV", "AZ"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R50_DPG.M"
        },
        {
            name:"rocky mountain",
            states:["MT", "ID", "WY", "UT", "CO"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R40_DPG.M"
        },
        {
            name:"midwest",
            states:["ND", "SD","NE", "KS", "OK", "MN", "IA", "MO", "IL", "WI", "MI", "IN", "OH", "KY", "TN"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R20_DPG.M"
        },
        {
            name:"gulf coast",
            states:["NM", "TX", "MS", "AR", "LA", "AL"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R30_DPG.M"
        },
        {
            name:"east coast 1A",
            states:["ME", "NH", "VT", "MA", "RI", "CT"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R1X_DPG.M"
        },
        {
            name:"east coast 1B",
            states:["NY", "PA", "DE", "NJ","MD", "DC"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R1Y_DPG.M"
        },
        {
            name:"east coast 1C",
            states:["WV", "VA", "NC", "SC", "GA", "FL"],
            seriesID:"series_id=PET.EMM_EPM0_PTE_R1Z_DPG.M"
        }
    ];
    let obj;
    usa.forEach(element => {
        if(element.states.indexOf(state)!=-1) obj=element;
    });
    return obj;
}