import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-courier-server-five.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
