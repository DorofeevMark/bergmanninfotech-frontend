export interface ChartData {
  dataset?: {
    time: Date,
    data: number
  }[];
  type: string;
  measure: {
    key: string;
    name: string;
  };
  color: string;
}

export interface ChartConfig {
  title: string;
  chartData: ChartData[];
}

export class ChartStateModel {
  charts: ChartConfig[];
}

export class CreateChart {
  static readonly type = '[Chart] Create chart';
  constructor(public config: ChartConfig) {}
}
