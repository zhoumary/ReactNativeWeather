// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bold } from 'ansi-colors';
import Forecast from './coverage/forecasts';
import Overview from './coverage/overview';
import Raining from './coverage/weather-rain.png';
import Clouds from './coverage/weather-clouds.png';
import Thunderstorm from './coverage/weather_sunderain.png';
import Clear from './coverage/clear.png';
import Haze from './coverage/haze.png';
import defaultBack from './coverage/bkg11.jpg';
import SunderRainBack from './coverage/SunderRainBackground.gif';
import RainBack from './coverage/RainBackground.gif';
import React, { Component } from 'react'


const host = "https://api.openweathermap.org/data/2.5/";
const apiKey = "a81a067d035dd84954e1a0d2c907e813";
let columnCont = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: null,
      currentTemp: null,
      currentWeather: null,
      highestTemp: null,
      lowestTemp: null,
      timeWeather: null,
      forecasts: null
    };
  }

  componentDidMount() {    
    let cityID = "1815286";

    /*
        get current location's weather information  
    */
    let queryParam = "weather?id=" + cityID + "&APPID=" + apiKey;
    let url = host + queryParam;
    if (url) {
      fetch(url).then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        let div = [];

        // for getting location
        let location = jsonResponse.name;
        div.push(<View style={styles.overview} key='location'><Text style={styles.text}>{location}</Text></View>);

        // for getting overview weather desc
        let weather = jsonResponse.weather;
        let weatDesc;
        if (weather) {
          let current = weather[0];
          if (current) {
            weatDesc = current.main;
            div.push(<View style={styles.overview} key='overview'><Text style={styles.text}>{weatDesc}</Text></View>);
          }
        }

        // for geeting temperature
        let main = jsonResponse.main;
        let temp_min;
        let temp_max;
        let temperature;
        if (main) {
          if (main.temp) {
            temperature = tempConversion(main.temp);
            div.push(<View style={styles.overview} key='temperature'><Text style={styles.text}>{temperature}<Text style={styles.text}>&#8451;</Text></Text></View>);
          }
          if (main.temp_min) {
            temp_min = tempConversion(main.temp_min);
          }
          if (main.temp_max) {
            temp_max = tempConversion(main.temp_max);
          }
        }

        this.setState({
          weatherInfo: div,
          currentWeather: weatDesc,
          currentTemp: temperature,
          highestTemp: temp_max,
          lowestTemp: temp_min
        });
      });
    }

    /*
        get the current day's time weather within three hours 
    */

    queryParam = "forecast?id=" + cityID + "&APPID=" + apiKey;
    url = host + queryParam;
    if (url) {
      fetch(url).then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        let tableBody = [];
        let weatherImage;
        let weatDescrip;
        if (this.state.currentWeather) {
          weatDescrip = this.state.currentWeather;
          weatherImage = weatherConversion(weatDescrip);
        }
        tableBody.push(<th><tr><td class="timeStyle">Now</td></tr><tr><td class="timeStyle"><img class="weatherIcon" src={weatherImage} alt={weatDescrip} /></td></tr><tr><td class="timeStyle">{this.state.currentTemp}<span class="tempUnit">&#8451;</span></td></tr></th>);

        let forecasts = jsonResponse.list;
        let temperature;
        let isCrossDay = false;
        let currDate = new Date();
        let date = currDate.getDate();

        if (forecasts) {
          for (let index = 0; index < forecasts.length; index++) {
            let forecast = forecasts[index];
            // get hour
            let time = forecast.dt;
            let dateTime;
            let timeHour;
            let hour;
            let hourTime;
            const delta = 12;
            let tempDate;
            if (time) {
              dateTime = new Date(time * 1000);
              tempDate = dateTime.getDate();
              if (date !== tempDate) {
                break;
              }
              columnCont = columnCont + 1;
              timeHour = dateTime.getHours();

              if (timeHour > 12) {
                hour = (timeHour - delta).toFixed();
                if (hour === 12) {
                  hourTime = hour.toString() + "PM";
                }
                hourTime = hour.toString() + "PM";
              } else if (timeHour === 12) {
                hourTime = timeHour.toString() + "PM";
              } else {
                hourTime = timeHour.toString() + "AM";
              }

            }

            // get weather desc
            let weather = forecast.weather;
            let weatDesc;
            let weatImage;
            if (weather) {
              weatDesc = weather[0].main;
              if (weatDesc) {
                weatImage = weatherConversion(weatDesc);
              }
            }

            // get time temperature
            let main = forecast.main;
            let weatTemp;
            if (main) {
              weatTemp = tempConversion(main.temp);
            }

            tableBody.push(<th><tr><td class="timeStyle">{hourTime}</td></tr><tr><td class="timeStyle"><img class="weatherIcon" src={weatImage} alt={weatDesc} /></td></tr><tr><td class="timeStyle">{weatTemp}<span class="tempUnit">&#8451;</span></td></tr></th>);


          }

        }

        this.setState({
          timeWeather: tableBody
        });


      });
    }


      /*
          get next five days weather
      */
      let forecastParam = "forecast?id=" + cityID + "&APPID=" + apiKey;
      let forecastURL = host + forecastParam;
      if (forecastURL) {
        fetch(forecastURL).then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed');
          }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          /*
              get all forecast data, and filter weathdaer not today
          */
          // get today date
          let currDate = new Date();
          let currDay = currDate.getDate();
          let currMonth = currDate.getMonth() + 1;

          let forecastDays = jsonResponse.list;

          if (forecastDays) {
            /*get forecast days' weather */
            let forecasts = [];
            for (let index = 1; index < 6; index++) {
              let forecastData = [];
              let nextDayForecast = forecastDays.filter((forecastDay) => {
                let time = forecastDay.dt;
                let dateTime = new Date(time * 1000);
                let tempDate = dateTime.getDate();
                let tempMonth = dateTime.getMonth() + 1;

                if (currMonth === tempMonth && (currDay + index) === tempDate) {
                  return forecastDay;
                } else if (tempMonth > currMonth && currDay > tempDate) {
                  return forecastDay;
                }
              });

              if (nextDayForecast) {
                // get highest and lowest temperature
                let highestTemp = Math.max.apply(Math, nextDayForecast.map((next) => { return next.main.temp; }));
                if (highestTemp) {
                  highestTemp = tempConversion(highestTemp);
                }
                let lowestTemp = Math.min.apply(Math, nextDayForecast.map((next) => { return next.main.temp; }));
                if (lowestTemp) {
                  lowestTemp = tempConversion(lowestTemp);
                }


                // get weather description
                let nextWeather = nextDayForecast[0];
                if (nextWeather) {
                  let weather = nextWeather.weather[0];
                  if (weather) {
                    let weatDesc = weather.main;
                    let weatImage;
                    if (weatDesc) {
                      weatImage = weatherConversion(weatDesc);
                      forecastData.push(weatDesc);
                      forecastData.push(weatImage);
                      forecastData.push(highestTemp);
                      forecastData.push(lowestTemp);
                      forecasts.push(forecastData);
                    }
                  }
                }
              }
            }
            this.setState({
              forecasts: forecasts
            });
          }
        });
      }
    

    // get current location

  }  
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Overview weatherInfo={this.state.weatherInfo} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 16,
    fontWeight: 'bold'
  },
  overview: {
    height: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Cochin',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default App

function tempConversion(kTemp) {
  let cTemp
  if (kTemp) {
    cTemp = (kTemp - 273.15).toFixed(2);
  }

  return cTemp;
}

function weatherConversion(weatherDesc) {
  let srcImage;
  switch (weatherDesc) {
    case 'Clouds':
      srcImage = Clouds;
      return srcImage;
    case 'Rain':
      srcImage = Raining;
      return srcImage;
    case 'Thunderstorm':
      srcImage = Thunderstorm;
      return srcImage;
    case 'Clear':
      srcImage = Clear;
      return srcImage;
    case 'Haze':
      srcImage = Haze;
      return srcImage;

    default:
      return null;
  }
}

function currWeatConversion(currWeather) {
  let backImage;
  switch (currWeather) {
    case 'Clouds':
      backImage = defaultBack;
      return backImage;
    case 'Rain':
      backImage = RainBack;
      return backImage;
    case 'Thunderstorm':
      backImage = SunderRainBack;
      return backImage;

    default:
      backImage = defaultBack;
      return backImage;
  }
}


