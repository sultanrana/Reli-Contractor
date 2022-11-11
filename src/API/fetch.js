import { ContentTypes } from "./Constants";

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const get = async (url, request) => {

  let authHeader = 'token'

  return new Promise((resolve, reject) => {

    fetch(url, {
      ...{},
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
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


const post = async (url, dataStr, request='', bearer, contentType = ContentTypes.Raw, method = 'POST' ) => {
  let authHeader = bearer

  return new Promise((resolve, reject) => {

    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
        'Content-Type': contentType,
      },
      body: dataStr
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
};
