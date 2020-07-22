console.log('dg')
const geocode = require('./utility/geocode.js')
const forecast = require('./utility/forecast.js')
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express()
// Define path for express config
const publicDirectoryPath = path.join('__dirname','../public')
const partialsPath = path.join('__dirname','../templates/partials')
const viewsPath = path.join('__dirname','../templates/views')
// Setup handlebar engine & views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('/',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Deepanshu'
  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    title: 'Help Page',
    name: 'mr. Deepanshu'
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About Page',
    name: 'Deepanshu'
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({error: 'Please Provide an address'})
  }
  geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
    if(error){
  return res.send({Error: error})
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error){
        return res.send({error})
      }
    res.send({
      address: req.query.address,
      location: location,
      forecast: forecastData
    })
  })
  })
})
app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({error:'Please provide search term'})
  }
  res.send({
    products:[]
  })
})
app.get('/help/*',(req,res)=>{
res.render('404-page',{
  message: 'Help article not found!',
  title: '404 Page',
  name: 'Deepanshu'
})
})
app.get('*',(req,res)=>{
  res.render('404-page',{
    title: '404 Page',
    message: 'Page Not Found!',
    name: 'Deepanshu'
  })
})
app.listen(3000,()=>{
  console.log('Server is running at port 3000')
})
