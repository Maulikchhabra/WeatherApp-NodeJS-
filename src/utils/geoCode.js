const request = require('request')
/*
const geoCode =(address, callback)=>{
  const url2 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWF1bGlrY2hoYWJyYSIsImEiOiJjazZmOXJjbHYwMGU2M21wNGlleGVwYXpmIn0.l3bmoz0DolR_QDI-2yeB3g&limit=1'
  
  request({url:url2, json: true},(error, response)=>{
    if(error){
      callback('Unable to connect to location services',undefined)
    }
    else if(response.body.features.length ===0){
      callback('Unable to find location. Try another search',undefined)
    }
    else{
      callback(undefined, {
         long:response.body.features[0].center[0],
         lat:response.body.features[0].center[1],
         location:response.body.features[0].place_name
      })
    }
  })
}
*/

const geoCode =(address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWF1bGlrY2hoYWJyYSIsImEiOiJjazZmOXJjbHYwMGU2M21wNGlleGVwYXpmIn0.l3bmoz0DolR_QDI-2yeB3g&limit=1'
    
    request({url, json: true}, (error, { body })=>{
      if(error){
        callback('Unable to connect to location services', undefined)
      }
      else if(body.features.length ===0){
        callback('Unable to find location. Try another search', undefined)
      }
      else{
        callback(undefined, {
           long:body.features[0].center[0],
           lat:body.features[0].center[1],
           location:body.features[0].place_name
        })
      }
    })
  }
  
  
module.exports = geoCode  