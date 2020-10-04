import {Component, OnInit} from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ola Amigo';

  constructor() {
  }

  ngOnInit() {
    this.barChartPopulation();
  }

  barChartPopulation() {
    HighCharts.chart('columnChart', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'CHART TITLE',
        style: {
          fontFamily: 'Arial'
        },
        align: 'left',
        margin: 20,
        x: 30
      },
      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°C',
          // style: {
          //   color: Highcharts.getOptions().colors[1]
          // }
        },
        title: {
          text: 'Instance Count',
          style: {
            fontFamily: 'Arial'
          },
          align: 'high',
          rotation: 0,
          y: -5,
          x: 20,
          offset: -50
          // style: {
          //   color: Highcharts.getOptions().colors[1]
          // }
        }
      }, { // Secondary yAxis
        title: {
          text: 'milicores',
          style: {
            fontFamily: 'Arial'
          },
          align: 'high',
          rotation: 0,
          y: -5,
          x: 5,
          offset: -50
          // style: {
          //   color: Highcharts.getOptions().colors[0]
          // }
        },
        labels: {
          format: '{value} mm',
          // style: {
          //   color: Highcharts.getOptions().colors[0]
          // }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        // layout: 'vertical',
        // align: 'left',
        x: 200,
        verticalAlign: 'top',
        y: -10,
        floating: true,
        backgroundColor:
          'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Temperature',
        type: 'line',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: '°C'
        }
      }]
    } as any);
  }
}
