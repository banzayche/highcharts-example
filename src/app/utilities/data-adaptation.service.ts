import {Injectable} from '@angular/core';
import {GraphDataItem, HighchartsDataModel, PossibleYAxis} from './models';
import * as moment from 'moment';
import {has, isNull} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataAdaptationService {
  public getPreparedData(data: HighchartsDataModel[][]): GraphDataItem[][] {
    return data.map(itemArray => itemArray.map(dataItem => {
      if (has(dataItem, PossibleYAxis.CPU_UTILIZATION)) {
        return this.prepareMilicores(dataItem);
      } else if (has(dataItem, PossibleYAxis.INSTANCE_COUNT)) {
        return this.prepareRainfall(dataItem);
      } else {
        return {x: null, y: null};
        console.warn('Wrong data set');
      }
    }));
  }

  private prepareMilicores(dataItem: HighchartsDataModel): GraphDataItem {
    return {
      x: isNull(dataItem.time) ? null : moment(dataItem.time).utc().valueOf(),
      y: dataItem[PossibleYAxis.CPU_UTILIZATION]
    };
  }

  private prepareRainfall(dataItem: HighchartsDataModel): GraphDataItem {
    return {
      x: isNull(dataItem.time) ? null : moment(dataItem.time).utc().valueOf(),
      y: dataItem[PossibleYAxis.INSTANCE_COUNT]
    };
  }
}
