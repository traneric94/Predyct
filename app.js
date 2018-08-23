const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const axios = require('axios');
const mysql = require('mysql');

// App settings
app.use(express.static('public'))

//mysql://bd2dea88683170:25adc518@us-cdbr-iron-east-01.cleardb.net/heroku_a658bec0c880ba1?reconnect=true

//Configuration
const connection = mysql.createConnection({
  host    : 'us-cdbr-iron-east-01.cleardb.net',
  user    : 'bd2dea88683170',
  password: '25adc518',
  database: 'heroku_a658bec0c880ba1'
});

app.use(express.static('public'))

app.get('/', (request, res) => {

  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})

// app.get('/query', (req, res) => {
//
//     let data = req.query
//
//     connection.connect();
//
//     let stations;
//
//     console.log("Requesting data");
//     connection.query(`SELECT * FROM bikes.bike_station_locations;`,
//     function(err, rows, fields) {
//       if (err) console.log(err);
//       stations = rows.sort(compare);
//     });
//
//     connection.query(`SELECT station_id, num_bikes_available FROM bikes.bike_station_information ORDER BY date DESC LIMIT 310`, function(err, current_capacities, fields) {
//       if (err) console.log(err)
//       current_capacities = current_capacities.sort(compare)
//
//       for (var i = 0; i < stations.length; i++) {
//         stations[i].available = current_capacities[i].num_bikes_available
//       }
//       res.send(stations)
//     });
//
//     connection.end();
})


function compare(a,b) {
  if (a.station_id < b.station_id)
    return -1;
  if (a.station_id > b.station_id)
    return 1;
  return 0;
}

// getLocation = () => {
//   axios.get("https://gbfs.fordgobike.com/gbfs/es/station_information.json")
//   .then( response => {
//     // const responseArray = response.data.data.stations;
//     // for (var i = 0; i < responseArray.length; i++) {
//     //   responseArray[i]
//       // console.log(responseArray[i].station_id+',', responseArray[i].lat+',', responseArray[i].lon)
// // fdjasfdsajk
//     }
//     // console.log(responseArray[0])
//     let sql = "INSERT INTO bike_station_locations (station_id, station_name, longitude, latitude, capacity) VALUES ?";
//     let values = responseArray.map((location) => {
//       console.log(location.station_id)
//       return [location.station_id, location.name, location.lon, location.lat, location.capacity]
//     });
//
//     con.query(sql, [values], function(err) {
//       if (err) throw err;
//
//     });
//   }).catch( error => {
//     console.log(error);
//   });
// }
// getLocation();
//
// (function getBikeInfo() {
//   console.log('starting')
//   axios.get("https://gbfs.fordgobike.com/gbfs/en/station_status.json")
//   .then ( response => {
//     // console.log(response.data.data.stations)
//     const responseArray = response.data.data.stations;
//     let sql = "INSERT INTO bike_station_information (station_id, num_bikes_available, num_docks_available) VALUES ?";
//     const test = Object.values(responseArray)
//     // console.log(Object.values(test)[0].num_bikes_available)
//     // console.log(Object.values(test)[0].num_docks_available)
//     // console.log(Object.values(test)[0].station_id)
//
//     let values = Object.values(test).map((location) => {
//       // console.log(location.num_bikes_available)
//       // console.log(location);
//       // console.log([location.station_id, location.num_bikes_available, location.num_docks_available])
//       return [location.station_id, location.num_bikes_available, location.num_docks_available]
//     });
//     con.query(sql, [values], function(err) {
//       if (err) throw err;
//
//     });
//   }).catch( error => {
//     console.log(error);
//   });
//   setTimeout(arguments.callee, 300000)
// })();
