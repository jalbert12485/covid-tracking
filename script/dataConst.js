function Data(dat){

    this.city={ name: "City", data: dat.city};
    this.county={ name: "County", data: dat.county};
    this.state={ name: "State", data: dat.state};
    this.date={ name: "Date", data: dat.date};
    this.pop={ name: "Population", data: Number(dat.pop)};
    this.totalCount={ name: "Total Cases", data: Number(dat.totalCount)};
    this.countPerPop={ name: "Total Cases Per Capita", data: (this.totalCount.data/this.pop.data)};
    this.death={ name: "Deaths", data: Number(dat.death)};
    this.deathPerPop={ name: "Deaths Per Capita", data: (this.death.data/this.pop.data) };
    this.currentCount={ name: "Current Cases", data: Number(dat.currentCount)};
    this.curCountPerPop={ name: "Current Cases Per Capita", data: (this.currentCount.data/this.pop.data)};
    this.recovered={ name: "Recovered", data: this.totalCount.data-this.currentCount.data-this.death.data};
} 




module.exports=Data;