const request = require('request');
const forecast = (address1,address2,callback)=>{
const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(address2)+'&lon='+encodeURIComponent(address1)+'&appid=1ffb642393d0de3bf7e56436cdc96477&units=metric'
request({url,json: true},(error,{body})=>{
if(error){
  callback('Unable to connect to weather service!',undefined)
}else if(body.cod === '400'){
  callback('Unable to find location!',undefined)
}else{
  callback(undefined,`${body.weather[0].main} throughout the day . It is currently ${body.main.temp} degrees out .`)
}
})
}
module.exports = forecast