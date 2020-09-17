import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../core/weather/weather.service';
import {MatDialog} from '@angular/material/dialog';
import {ChardAddDialogComponent} from '../chard-add-dialog/chard-add-dialog.component';
import {Actions, Select, Store} from '@ngxs/store';
import {LoadWeather} from '../core/weather/weather.actions';
import {WeatherState} from '../core/weather/weather.state';
import {combineLatest, Observable, Subject} from 'rxjs';
import {HourlyWeatherInterface} from '../core/weather/weather-response.model';
import {ChartConfig, CreateChart} from '../core/chart/chart.actions';
import {ChartState} from '../core/chart/chart.state';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(WeatherState.weather) weather$: Observable<HourlyWeatherInterface[]>;
  @Select(ChartState.charts) charts$: Observable<ChartConfig[]>;
  private ngUnsubscribe = new Subject();
  public chartsWithData: ChartConfig[];
  public minDate: Date;
  public todayDate: Date;
  public currentDate: Date;

  constructor(private weatherService: WeatherService, private dialog: MatDialog, private store: Store, private actions$: Actions) {
    this.todayDate = new Date();
    this.currentDate = new Date(new Date().setDate(this.todayDate.getDate() - 1));
    // Due to API limitations can get data only for previous 7 days
    this.minDate = new Date(new Date().setDate(this.todayDate.getDate() - 7));
    this.store.dispatch(new LoadWeather(this.currentDate));
    this.chartsWithData = [];
  }

  ngOnInit(): void {
    combineLatest([this.weather$, this.charts$]).pipe(
      filter(([weather, charts]) => weather.length > 0 && charts.length > 0),
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(([weather, charts]) => {
        if (charts.length > this.chartsWithData.length) {
          this.chartsWithData.push({
            title: charts[charts.length - 1].title,
            chartData: charts[charts.length - 1].chartData.map(data => {
              return {
                ...data,
                dataset: weather.map(hour => {
                  return {
                    time: new Date(hour.time),
                    data: hour[data.measure.key],
                  };
                })
              };
            })
          });
        } else {
          this.chartsWithData = charts.map((chart) => {
            return {
              title: chart.title,
              chartData: chart.chartData.map(data => {
                return {
                  ...data,
                  dataset: weather.map(hour => {
                    return {
                      time: new Date(hour.time),
                      data: hour[data.measure.key],
                    };
                  })
                };
              })
            };
          });
        }
      });

    this.store.dispatch(new CreateChart({
      title: 'Temperature',
      chartData: [
        {
          type: 'column',
          color: '#64E572',
          measure: {
            name: 'temperature',
            key: 'temp_c'
          }
        },
        {
          type: 'column',
          color: '#24CBE5',
          measure: {
            name: 'temperature',
            key: 'temp_c'
          }
        }, {
          type: 'line',
          color: '#DDDF00',
          measure: {
            name: 'humidity',
            key: 'humidity'
          }
        }
      ],
    }));
  }

  addChart() {
    const dialogRef = this.dialog.open(ChardAddDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(chart => {
      if (chart) {
        this.store.dispatch(new CreateChart({
          title: chart.title,
          chartData: chart.chartData
        }));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeDate(event) {
    this.store.dispatch(new LoadWeather(event.value));
  }
}
