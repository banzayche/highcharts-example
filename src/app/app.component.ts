import {Component, ElementRef, OnInit} from '@angular/core';
import * as HighCharts from 'highcharts';
import * as moment from 'moment';
import {ApiServiceService} from './api-service/api-service.service';
import {DataAdaptationService} from './utilities/data-adaptation.service';
import {map, takeUntil} from 'rxjs/operators';
import {GraphDataItem} from './utilities/models';
import {fromEvent} from 'rxjs';
import {BaseUnsubscribe} from './utilities/base-unsubscribe';
import {HTMLDOMElement} from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseUnsubscribe implements OnInit {
  constructor(
    private service: ApiServiceService,
    private dataAdaptation: DataAdaptationService,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.service.getChartsData().pipe(
      map(data => this.dataAdaptation.getPreparedData(data))
    ).subscribe(data => {
      this.barChartPopulation(data);
    });
  }

  private barChartPopulation(data: GraphDataItem[][]): void {
    HighCharts.chart('demo-chart', {
      chart: {
        zoomType: 'xy',
        plotBackgroundColor: '#fff',
        backgroundColor: 'transparent',
        showAxes: true,
        events: {
          load: this.onLoadChart.bind(this),
          redraw: chart => this.updateLegendCheckboxesState(chart.target)
        }
      },
      lang: {
        noData: 'Provide some data',
      },
      title: {
        useHTML: true,
        text: 'CHART TITLE' + ' ' + '<button class="refresh-data" data-refresh>REFRESH DATA</button>',
        style: {
          fontFamily: 'Arial',
          color: 'rgb(72,72,72)'
        },
        align: 'left',
        margin: 20,
        x: 30
      },
      tooltip: {
        shared: true
      },
      credits: {enabled: false},
      plotOptions: {
        series: {
          marker: {
            enabled: false
          },
          events: {
            legendItemClick(e) {
              return false;
            }
          }
        },
        column: {
          maxPointWidth: 550,
          groupPadding: 0,
          pointPadding: 0
        }
      },
      xAxis: [{
        units: [
          [
            'minute',
            [15, 30]
          ],
          [
            'hour',
            [1]
          ]],
        uniqueNames: true,
        type: 'datetime',
        labels: {
          formatter() {
            const myMoment: moment.Moment = moment(this.value);
            let value;
            if (myMoment.utc().format('hh:mm').includes(':00')) {
              value = myMoment.utc().format('h a');
            } else {
              value = myMoment.utc().format('hh:mm');
            }
            return value.toUpperCase();
          },
          style: {
            color: 'rgb(0,0,0)'
          }
        },
        reversed: false,
        gridLineWidth: 1,
        gridLineColor: 'rgb(250,250,250)',
        minorTickLength: 0,
        tickLength: 0,
        lineColor: 'rgb(214,214,214)',
        lineWidth: 1,
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          style: {
            color: 'rgb(0,0,0)'
          }
        },
        title: {
          text: 'Instance Count',
          style: {
            fontFamily: 'Arial',
            color: 'rgb(128, 128, 128)'
          },
          align: 'high',
          rotation: 0,
          y: -5,
          x: 30,
          offset: -50,
        },
        lineColor: 'rgb(214,214,214)',
        lineWidth: 1,
        tickInterval: 10,
        min: 0,
        tickPixelInterval: 20
      }, { // Secondary yAxis
        gridLineColor: 'rgb(250,250,250)',
        title: {
          text: 'milicores',
          style: {
            fontFamily: 'Arial',
            color: 'rgb(128, 128, 128)'
          },
          align: 'high',
          rotation: 0,
          y: -5,
          x: 0,
          offset: -50
        },
        labels: {
          style: {
            color: 'rgb(0,0,0)'
          }
        },
        opposite: true,
        tickInterval: 200,
        min: 0,
        tickPixelInterval: 20
      }],
      legend: {
        x: 450,
        verticalAlign: 'top',
        y: -10,
        floating: true,
        useHTML: true,
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        labelFormatter() {
          return `<input class="legend-checkbox" type="checkbox" data-legend-checkbox data-series="${this.name}"> ${this.name}`;
        }
      },
      series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        color: 'rgb(126,203,235)',
        data: data[1]
      },
        {
          name: 'Temperature',
          type: 'spline',
          color: 'rgb(0,83,157)',
          data: data[0]
        }
      ]
    } as any);
  }

  private onLoadChart(e): void {
    const chart: HighCharts.Chart = e.target;
    const chartDom = this.elementRef.nativeElement.querySelector('#demo-chart');
    this.updateLegendCheckboxesState(chart);
    fromEvent(chartDom, 'click').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((clickEv: any) => {
      if (clickEv.target.hasAttribute('data-legend-checkbox')) {
        this.toggleSeries(chart, clickEv);
      } else if (clickEv.target.hasAttribute('data-refresh')) {
        this.refresh(chart);
      }
    });
  }

  private updateLegendCheckboxesState(chart: HighCharts.Chart): void {
    this.elementRef.nativeElement.querySelector('[data-series="Rainfall"]').checked = chart.series[0].visible;
    this.elementRef.nativeElement.querySelector('[data-series="Temperature"]').checked = chart.series[1].visible;
  }

  private toggleSeries(chart: HighCharts.Chart, clickEv: Event): void {
    const seriesIndex = (clickEv.target as HTMLDOMElement).getAttribute('data-series') === 'Rainfall' ? 0 : 1;
    if (chart.series[seriesIndex].visible) {
      chart.series[seriesIndex].hide();
    } else {
      chart.series[seriesIndex].show();
    }
  }

  private refresh(chart: HighCharts.Chart): void {
    this.service.getChartsData(true).pipe(
      map(data => this.dataAdaptation.getPreparedData(data))
    ).subscribe(data => {
      chart.series.forEach((seriesItem, index) => {
        // @ts-ignore
        seriesItem.setData(data[index], true);
      });
    });
  }
}
