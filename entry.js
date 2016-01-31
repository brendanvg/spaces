var gmf= require('./genericMapFunctions.js') 
var smf = require ('./spacesMapFunctions.js')
var hyperquest=require('hyperquest')
var collect = require('collect-stream')
var mapDivId = document.getElementById('map')
var catS = require('concat-stream')

//Philadelphia
// var lat = 39.96
// var lon = -75.16

//FLINT
var lat = 43.0125
var lon = -83.6875


smf(mapDivId, lat, lon)

var mapMe = document.getElementById('whereAmI')


