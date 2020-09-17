export interface HourlyWeatherInterface {
  time_epoch: number;
  time: string;
  temp_c: number;
  humidity: number;
  wind_kph: number;
}

export interface DailyWeatherInterface {
  date: string;
  hour: HourlyWeatherInterface[];
}

export interface WeatherResponseModel {
  forecast: {
    forecastday: DailyWeatherInterface[]
  };
  location: any;
}
