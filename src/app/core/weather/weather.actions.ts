import {HourlyWeatherInterface} from './weather-response.model';

export class WeatherStateModel {
  weather: HourlyWeatherInterface[];
}

export class LoadWeather {
  static readonly type = '[Weather] Load weather';
  constructor(public date: Date) {}
}
