import axios from 'axios'

import { StorageKey } from './consts';
const API_URL = 'https://api.gmap.gr';


export async function doRequest (endpoint, options = {}, additionalHeaders = {}) {
  const AUTH_TOKEN = localStorage.getItem(StorageKey.Token) || '';
  let response = await axios({
                    method: options.method || 'GET',
                    url: `${API_URL}${endpoint}`,
                    responseType: 'json',
                    headers: {
                      ...additionalHeaders,
                      'token': AUTH_TOKEN,
                    },
                    data: options.data
                })
                

  try {
      console.log( '1', 'start-try')
      if(response.statusText !== "OK") {
        throw new Error('Errors on server');
      }

      if(response.data.data.success === false) {
        throw new Error(response.data.data.message);
      }
      console.log( '2', 'end-try')
      return response.data.data

  } catch (err) {
    // console.log('===', err)
    console.log( '3', 'start-err')
        throw err;

  } finally {  }


}




// export async function doRequest (endpoint, options = {}, additionalHeaders = {}) {
//     const AUTH_TOKEN = localStorage.getItem(StorageKey.Token) || '';

//     const headers = new Headers({
//         'Content-Type': 'application/json',
//         'token': AUTH_TOKEN,
//         ...additionalHeaders,
          
//         });
//     options = {
//         ...options, 
//         timeout : options.timeout || 5000, 
//         // credentials: 'include', 
//         headers
//     };

//     let response = await timeoutPromise(
//         options.timeout,
//         fetch(`${API_URL}${endpoint}`, options)
//       );

//     try {
//         if (!response.ok) {
//             throw new Error('Errors on server');
//         }

//         let result;
//         try {
//             result = await response.json();
//         } catch (e) {
//             throw new Error('Incorrect server response (json error)');
//         }

//         if (!result.success) {
//             throw new Error(result.message);
//         }

//         return result.data;
//     }
//     catch (e) {
//         console.log(e);
//         throw e;
//     }
//     finally {}
    
// }


// function timeoutPromise (ms, promise) {
//     return new Promise((resolve, reject) => {
//         const timeoutId = setTimeout(() => {
//             reject(new Error("Timeout error"))
//         }, ms);
//         promise.then(
//             (res) => {
//                 clearTimeout(timeoutId);
//                 resolve(res);
//             },
//             (err) => {
//                 clearTimeout(timeoutId);
//                 reject(err);
//             }
//         );
//     })
// };