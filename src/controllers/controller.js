const axios = require('axios');
const API_KEY = 'b103457414c40ba30734e8b8f590d6c4';

const Weather = require('../models/Weather');

exports.renderHomePage = (req, res) => {
  res.render('index');
};

exports.getWeather = (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  const weather = new Weather(city);
  weather.validateUserInput();
  if (weather.errors.length) {
    res.render('index', {
      error: weather.errors.toString()
    });
  } else {
    axios
      .get(url)
      .then((response) => {
        const { temp: temperature } = response.data.main;
        const { name: location } = response.data;
        res.render('index', {
          weather: `It is currently ${temperature} degrees in ${location}.`
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.renderAboutPage = (req, res) => {
  res.render('about');
};
