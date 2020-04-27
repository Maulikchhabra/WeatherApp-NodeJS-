const path =require('path')
const express =require('express')
const hbs = require('hbs')
const request =require('request')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

const app = express()
const port =process.env.PORT || 3000

//Define paths for Express config
const publiDirectory =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //get handlebars set up 
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publiDirectory))

//Route Handlers
app.get('', (req, res) =>{ //using index.hbs...res.render takes argument which are name of file and other a JSON or Object 
    res.render('index', {
        title: 'Weather',
        name: 'Maulik Chhabra'
    })
})

app.get('/about', (req, res)=>{
    res.render('about' ,{
        title: 'About Me',
        name:'Maulik Chhabra'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text ',
        title: 'Help',
        name : 'Maulik Chhabra'
    })
 })

/*
app.get('', (req, res)=>{
   res.send('Hello Express!!')
})


app.get('/help', (req, res)=>{
   res.send('Help page here!!')
})

//Challenge start

app.get('/about', (req, res)=>{
    res.send('About page here!!')
})

app.get('/weather', (req, res)=>{
    res.send('Weather page here!! View weather...')
})

//Challenge completed


Sending back HTML as a response

app.get('', (req, res)=>{
    res.send('<h1>Weather</h1>')
 })


Sending back JSON as a response 
 app.get('', (req, res)=>{
    res.send({
        name:"Maulik",
        age:19
    })
 })



//Challenge start

app.get('/about', (req, res)=>{
    res.send('<h1>About</h1>')
})
*/

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address" 
        })
    }
    
     geoCode(req.query.address, (error, { lat, long, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData)=>{
             if(error){
                 return res.send( {error} )
             }


             res.send({
                location,
                forecast:forecastData,
                address: req.query.address 
            })
        })
     })  
    
     
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term."
        })
    } //this if statement will check if a search query is given by user and if not it will return the error JSON message
    
    //console.log(req.query) req.query gives us the object from parsed JSON that for what query user wants output (for example we are searching new delhi for weather app)
    res.send({ //this res.send the JSON if the search query is given by the user and return the success result
        products: []
    })
})

//Challenge completed


// app.com
// app.com/about
// app.com/help

app.get('/help/*', (req, res)=>{
     res.render('404',{
         title: '404',
         name: 'Maulik Chhabra',
         errorMessage: 'Help article not found'
     })
})

app.get('*', (req, res)=>{ //route handler for anything beside all app.get route handlers above.
     res.render('404',{
         title : '404',
         name : 'Maulik Chhabra',
         errorMessage : 'Page not found'
     })
})


app.listen(port, ()=>{
    console.log("Server is up on port"+ port);
})