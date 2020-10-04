import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {mockedDataCPUUsageMillicores, mockedDataServiceInstanceCount} from './MockedData';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  // TODO fix types
  getChartsData(isRandom: boolean = false): Observable<any> {
    return of([mockedDataServiceInstanceCount, mockedDataCPUUsageMillicores]);
  }
}
