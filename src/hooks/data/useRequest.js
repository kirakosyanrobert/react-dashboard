
// export async function doRequest(endpoint, options = {}, additionalHeaders = {}) {
//     const headers = new Headers({'App-Version': '1.0', ...additionalHeaders});
//     options = {
//                 ...options,
//                 timeout : options.timeout || 5000,
//                 credentials: 'include',
//                 headers
//             };
//     let response = await timeoutPromise(options.timeout, fetch(endpoint, options));

//     try {
//         if (!response.ok){
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
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
//     finally {}
// }