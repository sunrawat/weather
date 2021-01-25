const http = require('postman-request');
const geoLocationURL = 'http://api.positionstack.com/v1/forward?access_key=4ffc6abcbe7aeace8aa49502625b3902&query=';

const geoCode = (address, callback) =>{
    http(geoLocationURL  + address, { json: true },(error, { body }) => {
        if(error) {  
            callback('low level error', undefined)  } 
        else if(body.error) { 
            callback('wrong input', undefined) }
        else { 
            callback(error, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                label: body.data[0].label,
            });
            }
        })
    }
module.exports = geoCode;