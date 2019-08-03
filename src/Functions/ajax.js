// import axios from 'axios';
// import _ from 'lodash';
//
// import { store } from '../store/configureStore';
//
// import { loaderStart, loaderStop } from '../Actions/commonActions';
//
// axios.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
//   return request;
// });
//
// axios.interceptors.response.use((response) => {
//   console.log('Response:', response);
//   return response;
// });
//
// export default (function () {
//   let loaderCount = 0;
//   // var ua = window.navigator.userAgent;
//   const ajax = (method, url, option) => {
//     const options = _.isUndefined(option) ? {} : option;
//     const headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
//
//     if (_.has(options, 'headers')) {
//       Object.keys(options.headers).forEach((item) => {
//         headers[item] = options.headers[item];
//       });
//     }
//
//     options.headers = headers;
//     options.method = method;
//     options.timeout = 3000000;
//     options.url = url;
//     options.baseURL = 'http://localhost:3009/v1';
//     // options.baseURL = 'http://13.235.105.20/v1';
//     if (
//       typeof window !== 'undefined'
//       && window.location.href.indexOf('localhost') === -1
//     ) {
//       options.baseURL = 'https://apifarmengine.farmguide.in/v1';
//     }
//     /* isLoader : true means no need of common loader */
//     if (!options.isLoader) {
//       loaderCount += 1;
//       // store.dispatch(loaderStart())
//     }
//     if (loaderCount > 0 && !options.isLoader) {
//       store.dispatch(loaderStart());
//     }
//     return axios(options)
//       .then(
//         (response) => {
//           if (loaderCount > 0 && !options.isLoader) {
//             loaderCount -= 1;
//             if (loaderCount === 0) {
//               store.dispatch(loaderStop());
//             }
//           }
//           return response;
//         },
//         (error) => {
//           if (loaderCount > 0 && !options.isLoader) {
//             loaderCount -= 1;
//             if (loaderCount === 0) {
//               store.dispatch(loaderStop());
//             }
//           }
//           return error.response;
//         },
//       )
//       .catch((error) => {
//         if (loaderCount > 0 && !options.isLoader) {
//           loaderCount -= 1;
//           if (loaderCount === 0) {
//             store.dispatch(loaderStop());
//           }
//         }
//         return error.response;
//       });
//   };
//
//   ['get', 'put', 'post', 'delete'].forEach((method) => {
//     ajax[method] = function (url, options) {
//       return ajax(method, url, options);
//     };
//   });
//
//   return ajax;
// }());
