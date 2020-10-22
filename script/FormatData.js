// We used the state constructor to enter state name, abbreviation and population.  We now add the data we got from the api to create a larger object with the relevant information. This will be sent to data constructor.

class FormatData extends State{ 
    constructor(state, humanDateFormat, date, totalCount, death){
    super(state);
    this.humanDateFormat= humanDateFormat; 
    this.date= date;
    this.totalCount=totalCount;
    this.death= death;
}}

