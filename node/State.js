const { fstat } = require("fs");
const fs=require("fs");

// used to get info on the states with name, population and abbreviation, then writes this array to a file.

class State{
    constructor(state){
        let popInfo;
        let stateNames;
        let stateAbbr;
        // let stateInfo=[];
                
        fs.readFile("popInfo.txt","utf8",function(err,data){
            if(err){
               throw err;
                }else{
                    popInfo=JSON.parse(data);
                    fs.readFile("stateNames.txt","utf8", function(err,data){
                        if(err){
                            throw err;
                        }else{
                            stateNames=JSON.parse(data);
                            fs.readFile("stateAbbr.txt","utf8",function(err,data){
                                if(err){
                                    throw err;
                                }else{
                                    stateAbbr=JSON.parse(data);
                                        for(let i=0; i< stateNames.length; i++){
                                        stateInfo.push(new State(stateNames[i]));
                                        }
                                        fs.writeFile("stateInfo.txt",JSON.stringify(stateInfo),function(e){if(e) throw e;});
                
                                }
                            });
                            }
                        })
                    }});



                if(stateNames.indexOf(state) != -1){
                    this.stateName=state;
                    let index=stateNames.indexOf(state);
                    this.stateAbbr=stateAbbr[index];
                }else if(stateAbbr.indexOf(state) != -1){
                    this.stateAbbr=state;
                    let index=stateAbbr.indexOf(state);
                    this.stateNames=stateAbbr[index];
                }else{ return;}
                for(let i=0; i<popInfo[0].length; i++){
                    if(popInfo[i][0]==this.stateName){
                        this.statePop=popInfo[i][1];
        
                    }
                }
            }
        }

        module.exports=State;