import {Component, OnInit} from '@angular/core';
import * as HighCharts from 'highcharts';
import * as moment from 'moment';
import {ApiServiceService} from './api-service/api-service.service';
import {DataAdaptationService} from './utilities/data-adaptation.service';
import {map} from 'rxjs/operators';
import {GraphDataItem} from './utilities/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ola Amigo';

  constructor(private service: ApiServiceService, private dataAdaptation: DataAdaptationService) {
  }

  ngOnInit() {
    this.service.getChartsData().pipe(
      map(data => this.dataAdaptation.getPreparedData(data))
    ).subscribe(data => {

      this.barChartPopulation(data);
    });
  }

  barChartPopulation(data: GraphDataItem[][]): void {
    HighCharts.chart('columnChart', {
      chart: {
        zoomType: 'xy',
        plotBackgroundColor: '#fff',
        backgroundColor: 'transparent',
        showAxes: true
      },
      title: {
        text: 'CHART TITLE',
        style: {
          fontFamily: 'Arial',
          color: 'rgb(72,72,72)'
        },
        align: 'left',
        margin: 20,
        x: 30
      },
      credits: {enabled: false},
      plotOptions: {
        allowPointSelect: false,
        series: {
          marker: {
            enabled: false
          }
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
          formatter: function() {
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
            // TODO color: Highcharts.getOptions().colors[0]
            color: 'rgb(0,0,0)'
          }
        },
        reversed: false,
        gridLineWidth: 1,
        gridLineColor: 'rgb(250,250,250)',
        minorTickLength: 0,
        tickLength: 0,
        lineColor: 'rgb(214,214,214)',
        lineWidth: 1
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
          x: 20,
          offset: -50,
        },
        lineColor: 'rgb(214,214,214)',
        lineWidth: 1,
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
          x: 5,
          offset: -50
        },
        labels: {
          style: {
            color: 'rgb(0,0,0)'
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        x: 200,
        verticalAlign: 'top',
        y: -10,
        floating: true,
        useHTML: true,
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        labelFormatter: function() {
          return `<input type="checkbox" data-target-checkbox data-series="${this.name}" checked> ${this.name}`;
        }
      },
      series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        events: {
          legendItemClick: () => false  // disable legend click
        },
        color: 'rgb(126,203,235)',
        data: data[1]
      }, {
        name: 'Temperature',
        type: 'spline',
        events: {
          legendItemClick: () => false  // disable legend click
        },
        color: 'rgb(0,83,157)',
        data: data[0]
      }]
    } as any);
  }
}
