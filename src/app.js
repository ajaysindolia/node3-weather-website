const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()

//define paths for express config
const directorypath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//setup handler engine and views location
app.use(express.static(directorypath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'weather',
        name:'ajay sindolia'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:"ajay sindolia"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       helptext:"this is the help section",
       title:"Help",
       name:"ajay sindolia"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error })
        }
          forecast(latitude,longitude,(error,forecastdata)=>{
                 if(error){
                return  res.send({error })
               }
               res.send({
                   location:location,
                   forecast:forecastdata
               })
              
          })
   })
  
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            erroe:"no search found"})
    }
   console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"ajay sindolia",
        errormessage:"help article not found"
    })
})

app.get('*',(req,res)=>{
   res.render('404',{
       title:"error 404",
       name:"ajay sindolia",
       errormessage:"page not found"
   })
})

app.listen(3000,()=>{
    console.log("server is started")
})