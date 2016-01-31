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
