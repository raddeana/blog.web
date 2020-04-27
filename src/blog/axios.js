/**
 * axios 配置
 * @author Philip
 */

import axios from 'axios'

export function configAxios () {
    axios.defaults.baseURL = 'https://api.example.com';

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return Promise.reject(error);
    });

    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function updateToken (token) {
    axios.defaults.headers.common['token'] = token;
}

export function request (options) {

}

export function get (url) {

}

export function post (url) {

}