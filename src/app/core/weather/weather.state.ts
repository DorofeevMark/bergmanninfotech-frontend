import {Action, Selector, State, StateContext} from '@ngxs/store';
import {of} from 'rxjs';
import {LoadWeather, WeatherStateModel} from './weather.actions';
import {WeatherService} from './weather.service';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

const initialState = {
  weather: []
};

@State<WeatherStateModel>({
  name: 'Weather',
  defaults: initialState
})
@Injectable()
export class WeatherState {
  @Selector()
  static weather(state: WeatherStateModel) {
    return state.weather;
  }

  constructor(private weatherService: WeatherService) {
  }

  @Action(LoadWeather)
  loadWeather({patchState}: StateContext<WeatherStateModel>, {date}: LoadWeather) {
    return this.weatherService
      .getWeather(date)
      .pipe(
        tap((response: any) => {
          patchState({
            weather: response.forecast.forecastday[0].hour
          });
        }),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }
}
