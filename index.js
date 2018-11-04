const yargs = require('yargs');
const geocode = require('./geocode.js');

const argv = yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address for fetch weather'
  }
}).help().argv;
const address = argv.address;
const encodedAddress = encodeURIComponent(address);

const geoValues = geocode.geoCodeGenerator(encodedAddress);

geoValues.
then((data)=>geocode.weatherInfo(data.lat,data.long),
(err)=>console.log(err));
