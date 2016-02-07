require('leaflet')
var leaf = L

module.exports =
  
function initializeMap (mapDivId,lat,lon) {
  
  var icon= leaf.divIcon()
  var plotLayers = []

  var map = window.map = new leaf.Map(mapDivId)
  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © OpenStreetMap contributors';

  var osm = new L.TileLayer(osmUrl, {attribution:osmAttrib, maxZoom:18})
  map.setView (new leaf.LatLng(lat,lon), 14)
  map.addLayer(osm)
  
  var markers = {}

  return {
    addMarker: addMarker,
    getAllMarkers : getAllMarkers,
    geoFindMe : geoFindMe,
    map : map,
//  plotPolygon : plotPolygon
    mapResource : mapResource,
    onLocationFound: onLocationFound,
    onLocationError: onLocationError,
  }

  function mapResource () {
    map.locate({watch:true,setView:true, maxZoom:16});
    console.log('hey')
  }

  function onLocationFound(e) {
    var radius= e.accuracy /2;

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
      addMarker(e.latlng.lat, e.latlng.lng, markerHtml) 
    })

  //Creates the popup (which is a form described above) 
  //through leaflet's popup method
    popup
      .setLatLng(e.latlng)
      .setContent(form)
      .openOn(map) 


 

  


    // L.marker(e.latlng).addTo(map)
    //   .bindPopup('You are within'+radius+'meters from this point').openPopup()

    //   L.circle(e.latlng, radius).addTo(map)
  }


  function onLocationError(e){
    console.log(e)
    console.log('nope')
  }

  function addMarker (lat, lng, html) {
    var marker = L.marker([lat,lng]).addTo(map)
    if (html) {
      marker.bindPopup(html).openPopup()
    }
    else {
    } 
  }


 function getAllMarkers () {
  return markers
 }
 

function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    addMarker(latitude,longitude,'<h1>You are Here</h1>')
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        output.appendChild(img);
    return [longitude, latitude]
  };

  function error() {
        output.innerHTML = "Unable to retrieve your location";
          };

        output.innerHTML = "<p>Locating…</p>";

        navigator.geolocation.getCurrentPosition(success, error);
  }
}
