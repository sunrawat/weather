const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const weather = require('./utils/weather');

const publicPath = path.join(__dirname, '../public'); 
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialPath);
const app = express();
app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.get('/', (request, response)=>{
    response.render('index', {
        title: 'Weather',
        footer: '@Home Page'
    })
});

app.get('/about', (request, response)=>{
    response.render('about', {
        title: 'About Page',
        footer: '@About Page'
    });
});

app.get('/weather', (request, response)=>{
    const buildResponse = {};
    if(!request.query.address) {
        return response.send('Please provide valid address');
    }

    geoCode(request.query.address, (err, {latitude, longitude, label} = {})=>{ 
        if(err)  {
            response.send({err});
        } else{ 
            weather(latitude + ',' +longitude, (err, weatherData)=>{ 
                if(err)  {
                    response.send({ err });
                } else{ 
                    return response.send({
                        forecast: weatherData.weather_descriptions[0],
                        location: request.query.address,
                        temprature: weatherData.temperature,
                        title:'Weather Page'
                    });
                }
            });
        }
    });
    


});

app.get('/about/*', (request, response)=>{
    response.render('404', {
        helpTitle: 'About'
    });
});


app.get('/product', (request, response)=>{
    if(!request.query.name) {
        return response.send("Error! Please provide name");
    }
    response.send( [{ name: 'product1' }]);
});
app.get('*', (request, response)=>{
    response.render('404', {
        helpTitle: 'No Page Available'
    });
});




app.listen(3000, (data)=> {
    console.log('running server on....');
});