function Data(dat){
    // this.city={ name: "City", data: dat.city};
    // this.county={ name: "County", data: dat.county};
    this.stateName={ name: "State", data: dat.stateName};
    this.stateAbbr={ name: "Abbreviation", data: dat.stateAbbr};
    this.humanDateFormat={ name: "Date", data: dat.humanDateFormat};
    this.date={name:"ISO Date",data: dat.date};
    this.pop={ name: "Population", data: Number(dat.statePop)};
    this.totalCount={ name: "Total Cases", data: Number(dat.totalCount)};
    this.countPerPop={ name: "Total Cases Per Capita", data: (this.totalCount.data/this.pop.data).toFixed(4)};
    this.death={ name: "Deaths", data: Number(dat.death)};
    this.deathPerPop={ name: "Deaths Per Capita", data: (this.death.data/this.pop.data).toFixed(4) };
    // this.currentCount={ name: "Current Cases", data: Number(dat.currentCount)};
    // this.curCountPerPop={ name: "Current Cases Per Capita", data: (this.currentCount.data/this.pop.data).toFixed(4)};
    // this.recovered={ name: "Recovered", data: this.totalCount.data-this.currentCount.data-this.death.data};
} 


// No need for this in the front end
// module.exports=Data;