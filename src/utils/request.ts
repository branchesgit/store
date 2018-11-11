import axios, {AxiosRequestConfig} from "axios";

export default class Request {
    private constructor() {
    }

    private static instance: Request = null;

    static getInstance(): Request {
        if (!Request.instance) {
            Request.instance = new Request();
            Request.instance.initAxios();
        }

        return Request.instance;
    }

    initAxios() {

    }

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return axios.post(url, data || {}, config || {});
    }

    get(url: string, data?: any) {
        return axios.get(url, data);
    }

}
