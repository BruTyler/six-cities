import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized, onUpdateLastApiError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    onUpdateLastApiError(null);
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
    }

    const errorDetailed = response.data && response.data.error ? response.data.error : ``;
    onUpdateLastApiError(`${response.statusText}: ${errorDetailed}`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
