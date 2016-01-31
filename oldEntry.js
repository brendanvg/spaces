//var ms = require ('mapspaces')
var leaf = L 

var server = require ('./server.js')

var map = L.map('map').setView
var mapTP = document.getElementById('mapTensionPoint')
var mapTA = document.getElementById('mapTensionArea')

var resolveTP = document.getElementById('resolveTensionPoint')


mapTP.on ( 'click',
  function(){
//  ms.addMarker(ms.geoFindMe())
  
//  ms.geoFindMe().pipe(ms.addMarker())


  var input = document.getElementById('mapTensionId') 
  var x = ms.geoFindMe()
  var markerId= JSON.stringify(x)
  console.log(markerId)

  ms.addMarker(x, markerId, '<p>'+input+'</p>' 

//  server.db.put(){
//  }
 
  })

resolveTP.on ( 'click',   
  function() {

  }


 

var map = document.getElementById('map')

function addTensionMarker 

var map1 = ms(map,37.8044,-122.2708,)

