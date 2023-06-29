const request = require('request')

const geoCode = (address,callback)=>{
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '?access_token=pk.eyJ1IjoiZ2VkaWlpaWlpaWlpaSIsImEiOiJjbGphYnlyZTAxbmUwM2Vxbng2d2Jta2c2In0.gf46KsiDwyhRTdXg8rAxYw&limit=1'
      request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to reach service.',undefined)
        } else if(body.error){
            callback('unable to get location',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            )
        }
      })
}

module.exports = geoCode