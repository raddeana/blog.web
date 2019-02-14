import axios from 'axios';

export const defaultParams = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return axios(url, {
    ...defaultParams,
    method: 'get'
  });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {
  return axios(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {
  return axios(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return axios(url, {
    ...defaultParams,
    method: 'delete'
  });
}

