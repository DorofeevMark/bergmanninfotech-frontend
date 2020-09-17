import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ChartStateModel, CreateChart} from './chart.actions';

const initialState = {
  charts: []
};

@State<ChartStateModel>({
  name: 'Chart',
  defaults: initialState
})
@Injectable()
export class ChartState {
  @Selector()
  static charts(state: ChartStateModel) {
    return state.charts;
  }

  constructor() {
  }

  @Action(CreateChart)
  createChart({patchState, getState}: StateContext<ChartStateModel>, {config}: CreateChart) {
    patchState({
      charts: [...getState().charts, config]
    });
  }
}
