import {getValues, getCurrentPage} from '../../reducers/search';
import urls from '../../routes';
import axios from 'axios';

export const makeRequest = () => (dispatch, getState) => {
  const rating = getValues(getState(), 'rating');
  const price = getValues(getState(), 'price');
  const query = getValues(getState(), 'query');
  const page = getCurrentPage(getState());
  const url = urls.house.get.search({query, price, rating, page});
  console.log(url);
  axios({method: 'get', url, withCredentials: true}).then(res =>
    console.log(res)
  );
};
