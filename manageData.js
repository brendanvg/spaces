var map = require('./createMap.js')
var mapDb1 = require('./map1.db')

module.exports= function () {

  function getAllMarkers () {
    mapDb1.createReadStream(){
      .on('data', function (data) {
        console.log(data.key,'=',data.value)
      }
    }
  }

}
