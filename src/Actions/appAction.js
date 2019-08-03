// import ajax from '../Functions/ajax';

// let baseURL = 'http://localhost:3009/v1';
//
// if (
//   typeof window !== 'undefined'
//   && window.location.href.indexOf('localhost') === -1
// ) {
//   baseURL = '//13.235.105.20/v1';
// }

export const setMessage = messageText => ({
  type: 'SET_MESSAGE',
  message: messageText,
});

export const setAsyncMessage = messageText => dispatch => new Promise((resolve) => {
  setTimeout(() => resolve(), 2000);
}).then(() => dispatch(setMessage(messageText)));
