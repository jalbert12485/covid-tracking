
class State{
    constructor(state){
 
        let stateNames=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
        let stateAbbr=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
        let popInfo=[["STNAME","POP","DATE_","state"],["Alabama","4849377","7","01"],["Alaska","736732","7","02"],["Arizona","6731484","7","04"],["Arkansas","2966369","7","05"],["California","38802500","7","06"],["Colorado","5355866","7","08"],["Connecticut","3596677","7","09"],["Delaware","935614","7","10"],["District of Columbia","658893","7","11"],["Florida","19893297","7","12"],["Georgia","10097343","7","13"],["Hawaii","1419561","7","15"],["Idaho","1634464","7","16"],["Illinois","12880580","7","17"],["Indiana","6596855","7","18"],["Iowa","3107126","7","19"],["Kansas","2904021","7","20"],["Kentucky","4413457","7","21"],["Louisiana","4649676","7","22"],["Maine","1330089","7","23"],["Maryland","5976407","7","24"],["Massachusetts","6745408","7","25"],["Michigan","9909877","7","26"],["Minnesota","5457173","7","27"],["Mississippi","2994079","7","28"],["Missouri","6063589","7","29"],["Montana","1023579","7","30"],["Nebraska","1881503","7","31"],["Nevada","2839099","7","32"],["New Hampshire","1326813","7","33"],["New Jersey","8938175","7","34"],["New Mexico","2085572","7","35"],["New York","19746227","7","36"],["North Carolina","9943964","7","37"],["North Dakota","739482","7","38"],["Ohio","11594163","7","39"],["Oklahoma","3878051","7","40"],["Oregon","3970239","7","41"],["Pennsylvania","12787209","7","42"],["Rhode Island","1055173","7","44"],["South Carolina","4832482","7","45"],["South Dakota","853175","7","46"],["Tennessee","6549352","7","47"],["Texas","26956958","7","48"],["Utah","2942902","7","49"],["Vermont","626562","7","50"],["Virginia","8326289","7","51"],["Washington","7061530","7","53"],["West Virginia","1850326","7","54"],["Wisconsin","5757564","7","55"],["Wyoming","584153","7","56"],["Puerto Rico Commonwealth","3548397","7","72"]];

                    this.stateAbbr=state;
                    let index=stateAbbr.indexOf(state);
                    this.stateName=stateNames[index];
                
                for(let i=0; i<popInfo.length; i++){
                    if(popInfo[i][0]==this.stateName){
                        this.statePop=popInfo[i][1];
        
                    }
                }
            }
        }

     