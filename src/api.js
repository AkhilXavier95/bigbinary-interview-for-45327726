import axios from "axios";

const Api = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((configArg) => {
    const config = configArg;
    return config;
  });

  return instance;
};

export default Api;
