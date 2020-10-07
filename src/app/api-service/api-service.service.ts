import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockedDataCPUUsageMillicores, mockedDataServiceInstanceCount} from './MockedData';
import {HighchartsDataModel} from '../utilities/models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  getChartsData(isRandom: boolean = false): Observable<HighchartsDataModel[][]> {
    if (isRandom) {
      return of(this.generateData());
    }

    return of([mockedDataServiceInstanceCount, mockedDataCPUUsageMillicores]);
  }

  private generateData(): HighchartsDataModel[][] {
    const count = 120;
    const initialM = 0;
    const initialH = 2;
    const dataSet: HighchartsDataModel[][] = [[], []];

    const k = Math.random() * (180 - 60) + 60;

    for (let i = 0; i < count; i++) {
      dataSet[0][i] = {
        time: `2020-09-01T0${this.getHours(initialH, i)}:${this.getMinutes(initialM, i)}:00.000Z`,
        'Service Instance Count': Math.abs(Math.sin(Math.PI * 2 / k * i) * 1500) // Math.floor(Math.random() * (14000 - 4000) + 4000)
      };
      dataSet[1][i] = {
        time: `2020-09-01T0${this.getHours(initialH, i)}:${this.getMinutes(initialM, i)}:00.000Z`,
        'CPU Usage Millicores': Math.abs(Math.sin(Math.PI * 2 / k * 2 * i) * 100)
      };
    }

    return dataSet;
  }

  private getMinutes(minutes: number, i: number): string | number {
    if (i === 60) {
      i = 0;
    }
    if (i > 60) {
      i = i - 60;
    }
    return (minutes + i).toString().length === 1 ? '0' + (minutes + i) : minutes + i;
  }

  private getHours(h, n): number {
    return n < 60 ? h : h + 1;
  }
}
