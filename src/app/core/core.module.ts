import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../../environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather/weather.service';
import {WeatherState} from './weather/weather.state';
import {ChartState} from './chart/chart.state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([WeatherState, ChartState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [WeatherService]
})
export class CoreModule {
}
