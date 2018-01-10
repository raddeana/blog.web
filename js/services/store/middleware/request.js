import axios from 'axios';
import * as urls from '../../config/urls';
import { defaultParams as defaultFetchParams } from '../modules/utils/fetch';

export default function request({ dispatch }) {
  return (next) => async (action) => {
    const { type, payload = null, meta = {} } = action;

    if (!type || type.constructor !== Array) return next(action);

    const [BEGIN, SUCCESS, FAILURE] = action.type;
    let [url, fetchParams] = meta.fetch;

    dispatch({
      type: BEGIN,
      payload: payload
    });

    fetchParams = {
      ...defaultFetchParams,
      ...fetchParams
    };

    if (url.match(/^http/) === null) url = `${urls.api}${url}`;

    const response = await axios(url, fetchParams);
    
    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: SUCCESS,
        payload: fetchParams.method === 'delete' ? payload : response
      });
    } else {
      dispatch({
        type: FAILURE,
        error: true,
        payload: fetchParams.method === 'delete' ? payload : response
      });
    }
  };
}
