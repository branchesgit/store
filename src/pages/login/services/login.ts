import Request from "../../../utils/request";

export default class LoginService {
    private static instance: LoginService = null;

    static getInstance(): LoginService {
        if (!LoginService.instance) {
            LoginService.instance = new LoginService();
        }

        return LoginService.instance;
    }

    fetch() {
        return Request.getInstance().get(`/region/get`);
    }

    fetchStores({regionID}) {
        return Request.getInstance().get(`/stores/get?regionID=${regionID}`);
    }

    login(values) {
        const user = {
            userName: values.userName,
            password: values.password,
            storeId: values.storeID,
        };

        return Request.getInstance().post('/login/post', user);

    }
}
