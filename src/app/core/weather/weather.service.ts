import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherResponseModel} from './weather-response.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private URL = 'http://api.weatherapi.com/v1/';
  constructor(private httpClient: HttpClient) { }

  getWeather(date: Date): Observable<WeatherResponseModel> {
    return this.httpClient.get<WeatherResponseModel>(this.URL + 'history.json', {
      params: {
        key: environment.WEATHER_API_KEY,
        q: 'London',
        dt: new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
          .toISOString()
          .split('T')[0]
      }
    });
  }
}
