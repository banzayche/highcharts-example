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
          // showCheckbox: true,
          events: {
            checkboxClick: function(event) {
              console.log(event.checked);
              if (event.checked) {
                this.update({
                  // dataLabels: {
                  //   enabled: true
                  // }
                  visible: true
                });

                return false;
              } else {
                this.update({
                  // dataLabels: {
                  //   enabled: false
                  // },
                  visible: false
                });

                return true;
              }

            },


          },
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
        // dateTimeLabelFormats: {
        //   minute: '%H:%M',
        //   hour: '%Hff',
        // },
        labels: {
          formatter: function() {
            // TODO define H:M or H AM/PM
            return this.value;
          },
          style: {
            // color: Highcharts.getOptions().colors[0]
            color: 'rgb(0,0,0)'
          }
          // rgb(48,96,158)
          //
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
          // style: {
          //   color: Highcharts.getOptions().colors[1]
          // }
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
          // style: {
          //   color: Highcharts.getOptions().colors[0]
          // }
        },
        labels: {
          // format: '{value} mm',
          style: {
            // color: Highcharts.getOptions().colors[0]
            color: 'rgb(0,0,0)'
          }
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
        useHTML: true,
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        labelFormatter: function() {
          return `<input type="checkbox" data-target-checkbox data-series="${this.name}" checked> ${this.name}`;
        }
        // backgroundColor:
        //   'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        // showCheckbox: true,
        // selected: true,

        events: {
          legendItemClick: () => false  // disable legend click
        },
        color: 'rgb(126,203,235)',
        data: [
          {
            x: Date.UTC(2012, 5, 22, 8, 15),
            y: 11
          },
          {
            x: Date.UTC(2012, 5, 22, 8, 40),
            y: 12
          },
          {
            x: Date.UTC(2012, 5, 22, 9, 35),
            y: 11
          }
        ],
        // tooltip: {
        //   valueSuffix: ' mm'
        // }

      }, {
        name: 'Temperature',
        type: 'line',
        // showCheckbox: true,
        // selected: true,
        events: {
          legendItemClick: () => false  // disable legend click
        },
        color: 'rgb(0,83,157)',
        data: [
          {
            x: Date.UTC(2012, 5, 22, 8, 15),
            y: 11
          },
          {
            x: Date.UTC(2012, 5, 22, 8, 20),
            y: 12
          },
          {
            x: Date.UTC(2012, 5, 22, 8, 25),
            y: 11
          }
        ],
        // tooltip: {
        //   valueSuffix: '°C'
        // }
      }]
    } as any);
  }
}
