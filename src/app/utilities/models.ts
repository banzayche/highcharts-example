export enum PossibleYAxis {
  CPU_UTILIZATION = 'CPU Usage Millicores',
  INSTANCE_COUNT = 'Service Instance Count'
}


export interface HighchartsDataModel {
  time: string;
  'CPU Usage Millicores'?: number;
  'Service Instance Count'?: number;
}

export interface GraphDataItem {
  x: string | number;
  y: number;
}
