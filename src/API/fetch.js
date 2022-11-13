import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContentTypes } from "./Constants";

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const get = async (url, request) => {

  let authHeader = await AsyncStorage.getItem('token')

  return new Promise((resolve, reject) => {

    fetch(url, {
      ...{},
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(`${request}-response: `, result)
        if (result) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
        return error;
      });
  });
};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */


const post = async (url, dataStr, request = '', bearer, contentType = ContentTypes.Raw, method = 'POST', isJson = true) => {
  let authHeader = bearer

  return new Promise((resolve, reject) => {

    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
        'Content-Type': contentType,
      },
      body: dataStr,
      json: isJson
    }).then((res) => res.json())
      .then((result) => {
        console.log(`${request} response:`, result)
        if (result) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
      });
  });
};

const put = async (url, dataStr, request = '', bearer, contentType = ContentTypes.Raw, method = 'PUT', isJson = true) => {

  let authHeader = await AsyncStorage.getItem('token')

  return new Promise((resolve, reject) => {

    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
        'Content-Type': contentType,
      },
      body: dataStr,
      json: isJson
    }).then((res) => res.json())
      .then((result) => {
        console.log(`${request} response:`, result)
        if (result) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
      });
  });
};

const del = async (url, request, method = 'DELETE') => {

  let authHeader = await AsyncStorage.getItem('token')
  return new Promise((resolve, reject) => {

    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(`${request} response:`, result)
        if (result) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
      });
  });
};

export default {
  get,
  post,
  del,
  put
};
