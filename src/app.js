const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forecast.js')

const paritalPath = path.join(__dirname,'../templates/partials')
const viewPath = path.join(__dirname,'../templates/views')


const app = express()

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(paritalPath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Gedion'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about Me',
        name: 'gedi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message: 'help message',
        name: 'Gedion'
    })
})

app.get('/weather', (req,res)=>{
   
    if(!req.query.address){
        return res.send({
            error:'You must provide and address'
        }) 
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          if(error){
            return res.send({ error}) 
          }
          forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
    

          })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{ 
        title: '404',
        message: 'help article not found',
        name: 'Gedion'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'page not found',
        name: 'Gedion'
    })
})
app.listen(8080,()=>{
    console.log('server is up on port 3000.')
})
