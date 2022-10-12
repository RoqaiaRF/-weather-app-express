const express = require('express');
const path = require('path');
const axios = require('axios');
const { response } = require('express');
const { url } = require('inspector');

const api_key = `e6da55521c8991b8ad0639a3d8dc3aa0`

const url_location = `http://api.openweathermap.org/geo/1.0/direct?appid=${api_key}`;

console.log(url_location);

// Creates the express application
const app = express();

// port to listen to
const port = 3000;

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));

// tell express to serve dynamic files through ejs
app.set('view engine', 'ejs');

// tell ejs where to find the dynamic files
const viewsPath = path.join(__dirname, "../views");
app.set("views", viewsPath);

// Method middleware for homepage
// doesn't look at the request,
// sends response with welcome message
app.get('/', (req, res) => {
    // 
    res.render("index");
})

// localhost:3000/location/tiberias
app.get('/location/:location?', async (req, res) => {
    // The user has already entered location
    // need information
    if (req.params.location)
    {
        try {
            let full_url = `${url_location}&q=${req.params.location}`
            const api_res = await axios.get(full_url);
            console.log(api_res.data);
            if (api_res.data && api_res.data.length > 0)
            {  
                let res_body = `name: ${api_res.data[0].name} <br>
                                local name: ${api_res.data[0].local_names.he} <br>
                                state: ${api_res.data[0].state} <br>
                                country: ${api_res.data[0].country} <br>
                                lon: ${api_res.data[0].lon} <br>
                                lat: ${api_res.data[0].lat} <br>`
                              
                res.send(res_body);
            } else {
                res.status(404).send("No results found");
            }
        } catch (err)
        {
            console.log(err);
            res.status(500).send("Something went wrong. Input should be in English only")
        }
    } else {
        // the user accessed the page for the first time
        // need to render
        res.render("location");
    }
})

app.get('/weather/:lon?/:lat?', async (req, res) => {
    let res_body = '';
    let lon = req.params.lon;
    let lat = req.params.lat;
    if (lat && lon)
    {
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
        
        try {
            
            const api_res = await axios.get(url);

            console.log(api_res.data);

            if (api_res.data)
            {  
               res_body = `name: ${api_res.data.name} <br>
                            description: ${api_res.data.weather[0].description} <br>
                            temparature: ${api_res.data.main.temp} <br>
                            humidity: ${api_res.data.main.humidity} <br>
                            wind speed: ${api_res.data.wind.speed} <br>`
                              
                res.send(res_body);
            } else {
                res.status(404).send("No results found");
            }
        } catch (err)
        {
            console.log(err);
            
        }
    } else {  
        res.render("weather");
    }
})





app.get('*', (req, res) => {
    const errorFile = path.join(__dirname, "../public/error.html")
    res.status(404).sendFile(errorFile);
})


// this method will start the server on a specific port.
// The callback will be executed after the server is up and running  
app.listen(port, () => {
    console.log(`Server is running on 
    http://localhost:${port}`)
})

