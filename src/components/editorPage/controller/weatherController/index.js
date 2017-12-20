import React from 'react';
import axios from 'axios';
import styles from './WeatherController.css';

const propTypes = {
  onWeatherSelected: React.PropTypes.func.isRequired
}

const kindOfWeather = [
  {src: '/resources/weather/weather_cloud.svg'},
  {src: '/resources/weather/weather_rain.svg'},
  {src: '/resources/weather/weather_snow.svg'},
  {src: '/resources/weather/weather_sun.svg'},
  {src: '/resources/weather/weather_suncloud.svg'},
  {src: '/resources/weather/weather_thunder.svg'},
  {src: '/resources/weather/weather_wind.svg'}
]

class LineController extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    let renderWeathers = (weathers) =>{
      let _self = this;
      return weathers.map(function(weather, idx) {
        return (<img key={idx} src={weather.src} onClick={()=>_self.props.onWeatherSelected(idx + 1)} />)
      });
    };
    return (
      <div className={styles.weatherController}>
        {renderWeathers(kindOfWeather)}
      </div>
    )
  }

}

LineController.propTypes = propTypes;
export default LineController;
