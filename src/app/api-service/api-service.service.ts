import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockedDataCPUUsageMillicores, mockedDataServiceInstanceCount} from './MockedData';
import {HighchartsDataModel} from '../utilities/models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() {
  }

  // TODO fix types
  getChartsData(isRandom: boolean = false): Observable<HighchartsDataModel[][]> {
    if (isRandom) {
      return of(this.generateData());
    }

    return of([mockedDataServiceInstanceCount, mockedDataCPUUsageMillicores]);
  }

  private generateData() {
    const count = 60;
    const initialM = 0;
    const data = [[], []];

    for (let n = 0; n < count; n++) {
      data[0][n] = {
        time: `2020-09-01T02:${(initialM + n).toString().length === 1 ? '0' + (initialM + n) : initialM + n}:00.000Z`,
        'Service Instance Count': Math.floor(Math.random() * (14000 - 4000) + 4000)
      };
      data[1][n] = {
        time: `2020-09-01T02:${(initialM + n).toString().length === 1 ? '0' + (initialM + n) : initialM + n}:00.000Z`,
        'CPU Usage Millicores': Math.floor(Math.random() * (120 - 50) + 50)
      };
    }

    for (let n = 0; n < count; n++) {
      data[0][n + 60] = {
        time: `2020-09-01T03:${(initialM + n).toString().length === 1 ? '0' + (initialM + n) : initialM + n}:00.000Z`,
        'Service Instance Count': Math.floor(Math.random() * (14000 - 4000) + 4000)
      };
      data[1][n + 60] = {
        time: `2020-09-01T03:${(initialM + n).toString().length === 1 ? '0' + (initialM + n) : initialM + n}:00.000Z`,
        'CPU Usage Millicores': Math.floor(Math.random() * (120 - 50) + 50)
      };
    }
    console.log(data);
    return data;
  }
}
