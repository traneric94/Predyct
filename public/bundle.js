/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
  let currentLat = -122.392054;
  let currentLon = 37.782062;
  let points;

    // document.getElementById('getLocation').addEventListener('click', function(e) {
    //   getCurrentLocation();
    // })

    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coords)
      }
    };

    function coords(location) {
      currentLat = location.coords.latitude;
      currentLon = location.coords.longitude;
    }

  mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmVyaWM5NCIsImEiOiJjamwzdXZmZ2oyNTdsM3Bxa2puNHd6bndmIn0.WHqQdH1pCITDfoOot3AB-Q';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/traneric94/cjl4g37s2an382rmrxko7kl33',
    center: [currentLat, currentLon],
    zoom: 14
  })

  map.addControl(new mapboxgl.NavigationControl());

  let container = map.getCanvasContainer()
  let svg = d3.select(container).append('svg').attr('class', 'svgclass')

  function project(p) {
    return map.project(splitCoordinates(p));
  }

  function splitCoordinates(coordinates) {
    return new mapboxgl.LngLat(+coordinates.longitude, +coordinates.latitude)
  }

  function subtractMinutes(date, minutes) {
    return new Date(date.getTime() - minutes*60000);
  }

  function getTime() {
    let data = new Date();
    let adjustedTime = subtractMinutes(data, 5)
    let time = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
  }

  $.ajax({
    method: 'GET',
    url: '/query'
  }).then((data) => {
    points = svg.selectAll('circle.dot').data(data)

    points.enter().append('circle').classed('dot', true)
    .style({
      fill: '#4286f4',
      'fill-opacity': 0.6,
      stroke: '#004d60',
      'stroke-width': 1
    }).on('mouseover', function(d){

    d3.select('.svgclass').data([d])
      .append('text')
      .style('font-family', 'sans-serif')
      .style('-webkit-text-fill-color', 'white')
      .style('-webkit-text-stroke-width', '1px')
      .style('-webkit-text-stroke-color', 'red')
      .attr('font-size', '18px')
      .attr('position', 'absolute')
      .text(function (d) {return 'Available bikes: ' + d.available})
      .attr('x', function(d) {return project(d).x;})
      .attr('y', function(d) {return project(d).y;})
      .attr('text-anchor', 'middle')
      .attr('fill', '')

      d3.select(this)
      .attr('r', function(d) {return 77})

    }).on('mouseout', function(d) {

      svg.selectAll('text').remove()

      d3.select(this)
      .attr('r', function(d) {return d.available*1.5 + 10})
    })

    function render() {

      points.attr({
        cx: function(p) {return project(p).x},
        cy: function(p) {return project(p).y},
        r: function(p) {return p.available*1.5 + 10}
      })
    }

    map.on('viewreset', function() {
      render()
    })
    map.on('move', function() {
      render()
    })

    render()
  }).catch(err => console.log(err))

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map