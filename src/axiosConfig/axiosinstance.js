import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoaderContext from "../contexts/LoaderContext";

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key:'349645b206c012e49de46b8c5f32e165', 
    language:'ar'
  }
});




function AxiosInterceptor({children}) {
  const [, setIsLoading] = useContext(LoaderContext)
  const [isSet, setIsSet] = useState(false)
  useEffect(() => {
    // Add a request interceptor
    const myInterceptorReq =axiosInstance.interceptors.request.use(function (config) {
      // Do something before request is sent
      setIsLoading(true)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
   
    // Add a response interceptor
    const myInterceptorRes = axiosInstance.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setIsLoading(false)
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    setIsSet(true)

    return () => {
      axiosInstance.interceptors.request.eject(myInterceptorReq);
      axiosInstance.interceptors.request.eject(myInterceptorRes);
    }

}, [setIsLoading])
return isSet && children
}

export default axiosInstance;

export {AxiosInterceptor}