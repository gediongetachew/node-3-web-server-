const request = require('request')


const forCast = ({latitude,longitude}, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=fb76207bc66dc911db354a438be5e689&query=' + latitude +','+ longitude
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to reach weather serice',undefined)
        }else if (body.error){
            callback('unable to read loaction. try another search',undefined)
        } else {
            callback(undefined,body.daily[0].summary + 'Its currentyl' + body.current.temperature + 'degresout. but it feels like' + body.current.feels_like + '.' + body.current.precipProbability + '% change of rain.' +)
        }
    })

}
module.exports = forCast