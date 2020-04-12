import axios from "axios";
import { BASE_URL, ACCESS_TOKEN } from "@src/constants";

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function tokenHeader() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `JWT ${token}`;
  }
  return headers;
}

export const clientRequest = function (options) {
  const onSuccess = function (response) {
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function (error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export const clientRequestWithToken = function (options) {
  options["headers"] = tokenHeader();
  return clientRequest(options);
};
