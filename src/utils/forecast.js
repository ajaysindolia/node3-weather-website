const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=79356b388a26e6d9bd2e29adb3ea8bbd&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body})=>
    {
        if(error){
            callback('no internet connection',undefined)
        }else if(body.error){
            callback('please enter valid coordinates',undefined)
        
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". it is currently "+body.current.temperature+" degree out.it feels like "+body.current.feelslike+" degree out.Current Humidity is "+body.current.humidity)
            }
    })
}

module.exports=forecast