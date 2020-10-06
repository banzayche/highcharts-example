import {Injectable} from '@angular/core';
import {GraphDataItem, HighchartsDataModel, PossibleYAxis} from './models';
import * as moment from 'moment';
import {has, isNull} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataAdaptationService {
  getPreparedData(data: HighchartsDataModel[][]): GraphDataItem[][] {
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

  prepareMilicores(dataItem: HighchartsDataModel): GraphDataItem {
    return {
      x: isNull(dataItem.time) ? '0' : moment(dataItem.time).valueOf(),
      y: isNull(dataItem[PossibleYAxis.CPU_UTILIZATION]) ? 0 : dataItem[PossibleYAxis.CPU_UTILIZATION]
    };
  }

  prepareRainfall(dataItem: HighchartsDataModel): GraphDataItem {
    return {
      x: isNull(dataItem.time) ? '0' : moment(dataItem.time).valueOf(),
      y: isNull(dataItem[PossibleYAxis.INSTANCE_COUNT]) ? 0 : dataItem[PossibleYAxis.INSTANCE_COUNT]
    };
  }
}
