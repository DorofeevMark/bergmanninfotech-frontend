import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ChartConfig, ChartData} from './chart.actions';

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnChanges {
  @Input() config: ChartConfig;
  public options: any = {
    chart: {
      height: 700
    },
    tooltip: {
      formatter() {
        return 'time: ' + Highcharts.dateFormat('%e %b %y %H:%M', this.x) +
          ' value: ' + this.y.toFixed(1);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
  };

  constructor(private el: ElementRef) {
    this.resetOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const config = changes.config.currentValue;
    if (config) {
      this.resetOptions();

      this.options.title = {
        text: config.title,
      };


      config.chartData.forEach((data: ChartData, i) => {
        this.options.colors.push(data.color);
        this.options.series[i] = {
          name: data.measure.name,
          data: data.dataset.map(hour => {
            return [hour.time.getTime(), hour.data];
          }),
          type: data.type
        };
      });

      Highcharts.chart(this.el.nativeElement, this.options);
    }
  }

  private resetOptions() {
    this.options.colors = [];
    this.options.series = [{data: []}];
  }
}
