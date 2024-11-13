import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      let token;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log("error in axiosInstance");
      console.error(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавление interceptor для ответов
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Удаляем токен
      //   localStorage.removeItem("token");
      // Редирект на страницу логина
      // history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
