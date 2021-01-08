import axios from "axios";

axios.defaults.baseURL = `https://images-api.nasa.gov`;

axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  async error => {
    let status = error.response ? error.response.status : null;

    if (status && status === 403) {
      if(error.response.data?.message) {
        alert(error.response.data.message);
      }
    }

    if (status && status === 500) {
      alert("Không có phản hồi");
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
