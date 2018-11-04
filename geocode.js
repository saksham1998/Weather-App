const request = require('request');

const geoCodeGenerator = (address) =>{
  return new Promise((resolve,reject)=>{
    request({
      url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoic2Frc2hhbTE0IiwiYSI6ImNqbzJpMWl5aTBtbTEzcHF5Zm5zMGVlYmMifQ.RdCECSyypfcCIKonuqemJQ`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject(`Unable to fetch the location`);
         obj = {};
      }
      else if(body.features.length===0){
        reject(`Unable to find the location`);
         obj = {};
      }
      else{
      console.log(`Address : ${body.features[0].place_name}`);
        resolve(obj = {
        lat:body.features[0].geometry.coordinates[1],
        long:body.features[0].geometry.coordinates[0]
      })
      }
    })
  })
}

const weatherInfo = (lat,long)=>{
  request({
    url:`https://api.darksky.net/forecast/d62aa50b260a92398af29808a6f5e88a/${lat},${long}`,
    json:true
  },(error,response,body)=>{
      if(error){
        console.log(`Unable to fetch weather for the given Location....`);
      }
      else {
        var temp = body.currently.temperature;
        var celsius = ((temp-32)*5/9).toFixed(2);
        console.log();
        console.log(`Current Temperature: ${temp} F / ${celsius} C`);
        console.log('-----');
        console.log(`Humidity : ${body.currently.humidity}`);
        console.log('-----');
        console.log(`Wind-Speed : ${body.currently.windSpeed}`);
        console.log('-----');
        console.log(`UV-Index : ${body.currently.uvIndex}`);
        console.log('-----');
        console.log(`Summary : ${body.currently.summary}`);
      }
  })
}

module.exports = {
  geoCodeGenerator,
  weatherInfo
}
