export const loaderStart = () => ({
  type: 'LOADER_START',
  payload: true,
});

export const loaderStop = () => ({
  type: 'LOADER_STOP',
  payload: false,
});
