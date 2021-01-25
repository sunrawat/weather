const http = require('postman-request');
const weatherURL = 'http://api.weatherstack.com/current?access_key=395cd1e8639cda38ec4f4ae0351b0f2d&query=';

const geoWeather = (address, callback) =>{
    http(weatherURL + address, { json: true },(error, {body}) => {
        if(error) {  
            callback('low level error', undefined)  } 
        else if(body.error) { 
            callback('wrong input', undefined) }
        else { 
            callback(error, body.current);
            }
        })
    }
module.exports = geoWeather;