const axios = require('axios');
var sha256 = require("crypto-js/sha256");


var ShoonyRestApi =function(params){

var self = this;
self.__susertoken = "";

var endpointUrl='https://api.shoonya.com/NorenWClientTP';

self.authenticate = function(userId, password, twoFA, vendor_code,app_key, imei) {
    try {
        let authparams = {
            "source": "API" , 
            "apkversion": "js:1.0.0",
            "uid": userId,
            "pwd": sha256(password).toString(),
            "factor2": twoFA,
            "vc": vendor_code,
            "appkey": sha256(userId+"|"+app_key).toString(),
            "imei": imei            
        };

        let payload = populatePayload(authparams);
        
       return  axios.post(endpointUrl+'/QuickAuth', payload);
        //console.log(response);
        //self.__susertoken=response.data.susertoken;
       // return self.__susertoken;
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

function populatePayload(values){
    let payload = 'jData=' + JSON.stringify(values);
    //if(usertoken.isEmpty == false)
    payload = payload + `&jKey=${self.__susertoken}`;
    return payload;
}


self.searchScrip=async function(exchange,text,token, startTime, endTime,interval){
    try {
        // Authenticate and obtain token
        //const token = await authenticate();
       // console.log(token);
        //const params=createPayload(exchange,text);

       


        // Make API call with token
        //const response = await axios.post('https://api.shoonya.com/NorenWClientTP/SearchScrip', payload);
        //console.log(response);
        // Process and manipulate data
       // console.log('API Data:', apiData);
        // Further data processing or manipulation can be done here

        payload=createTpPayload(exchange,token,startTime,endTime,interval);


        const response2 = await axios.post('https://api.shoonya.com/NorenWClientTP/TPSeries', payload);
        console.log(response2)


    } catch (error) {
        console.error('Error:', error);
    }
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

}

module.exports=ShoonyRestApi;