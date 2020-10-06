import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockedDataCPUUsageMillicores, mockedDataServiceInstanceCount} from './MockedData';
import {HighchartsDataModel} from '../utilities/models';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  // TODO fix types
  getChartsData(isRandom: boolean = false): Observable<HighchartsDataModel[][]> {
    return of([mockedDataServiceInstanceCount, mockedDataCPUUsageMillicores]);
  }
}
