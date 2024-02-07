
const axios = require('axios');
var sha256 = require("crypto-js/sha256");

let { params } = require("./cred");
const apiUrl = 'https://api.shoonya.com/NorenWClientTP';

var self = this;
self.token = "";

const ShoonyApi = require("./ShoonyApi");

let { authparams } = require("./cred");

this.shoonyApi = new ShoonyApi({});

this.executeRest=function(theToken) {
    this.shoonyApi.__susertoken=theToken;
    this.shoonyApi.searchScrip("NSE","JUNIORBEES","10939","1704079800","1706671800","240");
}


let tokenExists = true;
if (tokenExists) {
    this.executeRest("a6ed21bc3d81a997a42e47cbf41e450a70e7fbebd5f22d2d873c6bc1a709a39c");
} else {
    authToken =  this.shoonyApi.authenticate("FA37779","Duvu@21099","78151","FA37779_U","d625d2000490974d1e48ef25820d3735","abc1234").then((res) => {
        this.executeRest(res.data.susertoken);
        this.token=res.data.susertoken;
        tokenExists = true;
    })
}




async function authenticate() {
    try {
        let authparams = {
            "source": "API" , 
            "apkversion": "js:1.0.0",
            "uid": "FA37779",
            "pwd": sha256("Duvu@21099").toString(),
            "factor2": "36682",
            "vc": "FA37779_U",
            "appkey": sha256("FA37779|d625d2000490974d1e48ef25820d3735").toString(),
            "imei": "abc1234"            
        };

        let payload = 'jData=' + JSON.stringify(authparams);
        //if(usertoken.isEmpty == false)
        payload = payload + `&jKey=${self.__susertoken}`;

        const response = await axios.post('https://api.shoonya.com/NorenWClientTP/QuickAuth', payload);
        console.log(response);
        self.__susertoken=response.data.susertoken;
        return response.data.susertoken;
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

async function makeApiCall(params) {
    try {
        let payload = 'jData=' + JSON.stringify(params);
        //if(usertoken.isEmpty == false)
        payload = payload + `&jKey=${self.__susertoken}`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`API call failed: ${error.message}`);
    }
}



// Stateful Node.js application
(async () => {
    try {
        // Authenticate and obtain token
        //const token = await authenticate();
       // console.log(token);
        const params=createPayload("NSE","JUNIORBEES");

        let payload = 'jData=' + JSON.stringify(params);
        //if(usertoken.isEmpty == false)
        payload = payload + `&jKey=${self.__susertoken}`;


        // Make API call with token
        const response = await axios.post('https://api.shoonya.com/NorenWClientTP/SearchScrip', payload);
        console.log(response);
        // Process and manipulate data
       // console.log('API Data:', apiData);
        // Further data processing or manipulation can be done here

        payload=createTpPayload("NSE","10939","1704079800","1706671800","240");


        const response2 = await axios.post('https://api.shoonya.com/NorenWClientTP/TPSeries', payload);
        console.log(response2)


    } catch (error) {
        console.error('Error:', error);
    }
})();

function createPayload(Exchange, text){

    let values              = {};
            values["uid"]       = "FA37779";
            values["exch"]      = Exchange;
            values["stext"]     = text;  
            return values;   
}

function createTpPayload(Exchange, token, startTime, endTime, interval ){

    let values              = {};
            values["uid"]       = "FA37779";          
          values["exch"]      = Exchange;
          values["token"]     = token;          
          values["st"]        = startTime;
            values["et"]        = endTime;
            values["intrv"]     = interval;

            return populatePayload(values);   
}

function populatePayload(values){
    let payload = 'jData=' + JSON.stringify(values);
    //if(usertoken.isEmpty == false)
    payload = payload + `&jKey=${self.__susertoken}`;
    return payload;
}