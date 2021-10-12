const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWpheXNpbmRvbGlhIiwiYSI6ImNrdWNvM2JudzEyYnAybm12M2Z4ZWFxb3gifQ.9mu5lcv3wTXVWk0nIzT5cQ&limit=1'
    request({url,json:true},(error,{body})=>{
                 if(error){
                     callback('no internet connection',undefined)
                 }else if(body.features.length===0)
                 {
                     callback('please enter a valid location',undefined)
                 }
                 else
                 {
                     data={
                   latitude:body.features[0].center[1],
                   longitude:body.features[0].center[0],
                    location:body.features[0].place_name 
                     }
                     callback(undefined,data)
                 }

    })
}

module.exports=geocode