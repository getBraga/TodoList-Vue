import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});
export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endopoint, body) {
    return axiosInstance.post(endopoint, body);
  },
  put(endopoint, body) {
    return axiosInstance.put(endopoint, body);
  },
  patch(endopoint, body) {
    return axiosInstance.patch(endopoint, body);
  },
  delete(endopoint) {
    return axiosInstance.delete(endopoint);
  },
};
