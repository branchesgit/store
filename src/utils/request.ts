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
        axios.interceptors.request.use(config => {
            if (config.method == "get") {
                let params = config.params || {};
                params = {
                    ...params,
                    storeID: params.storeID || sessionStorage.getItem("storeID") || "",
                    token: sessionStorage.getItem("token") || "",
                };

                config.params = params;

                return config;
            } else {
                let data = config.data || {};

                config.data = {
                    storeID: data.storeID || sessionStorage.getItem("storeID") || "",
                    token: sessionStorage.getItem("token") || "",
                    ...data
                }

                return config;
            }
        })
    }

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return axios.post(url, data || {}, config || {}).then(res => res.data);
    }

    get(url: string, data?: any) {
        data = data || {};

        return axios.get(url, {params: data}).then(res => res.data);
    }

}
