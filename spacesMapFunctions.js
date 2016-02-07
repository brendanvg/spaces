require ('leaflet')
var gmf = require ('./genericMapFunctions.js')
var leaf = L
var hyperquest = require('hyperquest')
var listen = require('listenify')
var collect = require('collect-stream')
var catS = require('concat-stream')

module.exports = 
  
function (mapDivId, lat, lon) {
  
  var gmfReturn = gmf(mapDivId, lat, lon)


  // var geojsonLayer = new L.geoJson.ajax("Census2010.geojson")
  // geojsonLayer.addTo(map)


  function onMapClick(e) {
    var popup = L.popup()
    var latlng = e.latlng

    //dynamically creates the form once clicked
    var form = document.createElement('form')
    form.method = 'POST'
    form.action='/submitMarker'

    var inputCoords = document.createElement('input')
    inputCoords.type = 'hidden'
    inputCoords.name='coords'
    inputCoords.value= [e.latlng.lat, e.latlng.lng]

    var input = document.createElement('input')
    input.name='markerLabel'

    var button = document.createElement('button')
    var t = document.createTextNode("submit")
    button.appendChild(t)

    form.appendChild(input)
    form.appendChild(inputCoords)
    form.appendChild(button)
   

   

//Dynamically creates Label with delete option 
// once form is submitted
    button.addEventListener('click', function(evt){

      var markerHtml = document.createElement("div")
      
      var h1 = document.createElement("h1")
      var t2 = document.createTextNode(input.value)
      h1.appendChild(t2)
      markerHtml.appendChild(h1)

      var a = document.createElement("a")
      a.href='/delete/'+inputCoords.value
      var delButton = document.createElement("button")
      var t3 = document.createTextNode("delete")
      delButton.appendChild(t3)
      a.appendChild(delButton)
      markerHtml.appendChild(a)


    //Actually adds the marker to the map
      gmfReturn.addMarker(e.latlng.lat, e.latlng.lng, markerHtml) 
    })

  //Creates the popup (which is a form described above) 
  //through leaflet's popup method
    popup
      .setLatLng(e.latlng)
      .setContent(form)
      .openOn(map) 

  }


//-------EVENT LISTENERS-----------

//Event Listener which triggers all the above when 
//there is a click on the map
  gmfReturn.map.on('click', onMapClick)
 
//Event Listener for geolocation "Find Me"
  var mapMe=document.getElementById("mapMe")
  mapMe.addEventListener("click", gmfReturn.geoFindMe)

  var mapResource= document.getElementById('mapResource')
  var mapResource = addEventListener('click', gmfReturn.mapResource)

  map.on('locationfound', gmfReturn.onLocationFound)
  map.on('locationerror', gmfReturn.onLocationError)

//--------INITIAL RENDERING OF MARKERS-------------
//Everytime the page loads hyperquest streams in 
//the data about location and labels of all the markers
// stored to leveldb database 
  hyperquest('http://localhost:5001/loadMarkers')
  .pipe(
    catS(function(data){
      var x= data.toString()
      var y= JSON.parse(x)
      
      for (i = 0; i < y.length; i++){
        console.log('key is'+y[i].key+typeof y[i].key)
        console.log('value is'+y[i].value)
        var key = y[i].key
        var value = y[i].value
        var coords= key.split(",")
        var lat = coords[0]
        var lon = coords[1]    

        //for each (key,value) pair a label marker 
        //is dynamically made 
        var markerHtml = document.createElement("div")
        var h1 = document.createElement("h1")
        var t2 = document.createTextNode(value)
        h1.appendChild(t2)
        markerHtml.appendChild(h1)
        var a = document.createElement("a")
        a.href='/delete/'+coords
        var delButton = document.createElement("button")
        var t3 = document.createTextNode("delete")
        delButton.appendChild(t3)
        a.appendChild(delButton)
        markerHtml.appendChild(a)
        
        //eventListener for delete button 
        delButton.addEventListener('click', function (evt){
          var formDelete = document.createElement("form")
          var input2 = document.createElement("input")
          input2.type = "hidden"
          input2.value = coords
          input2.name = coords
          formDelete.appendChild(input2)
        })

        //actually adds each (key,value) data marker
        //to the map
        gmfReturn.addMarker(lat, lon, markerHtml) 
      }
    })
  )
}


