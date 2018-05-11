import {combineReducers} from 'redux';
import filters, * as fromFilter from './filters';
import houses, * as fromHouses from './houses';
import pages, * as fromPages from './pages';

const rootReducer = combineReducers({
  filters,
  pages,
  houses
});

export default rootReducer;

export const getValues = (state, filter) =>
  fromFilter.getValues(state.filters, filter);
export const getSetup = (state, filter) =>
  fromFilter.getSetup(state.filters, filter);
export const getCurrentPage = state => fromPages.getCurrentPage(state.pages);
export const getTotalPages = state => fromPages.getTotalPages(state.pages);
export const getHousesByPage = (state, page) =>
  fromHouses.getHousesByPage(state.houses);
