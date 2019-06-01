import Request from "../utils/request";

export default class LoginService {
    private static instance: LoginService = null;

    static getInstance(): LoginService {
        if (!LoginService.instance) {
            LoginService.instance = new LoginService();
        }

        return LoginService.instance;
    }

    fetch() {
        return Request.getInstance().get(`/storeserv/rest/get/regions`);
    }

    fetchStores({regionID}) {
        return Request.getInstance().get(`/storeserv/rest/get/stores`, {regionID});
    }

    login(values) {
        return Request.getInstance().post('/storeserv/rest/post/login', values);
    }
}
