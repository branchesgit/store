import request from "../../../utils/request";

export default class LoginService {
    private static instance: LoginService = null;

    static getInstance(): LoginService {
        if (!LoginService.instance) {
            LoginService.instance = new LoginService();
        }

        return LoginService.instance;
    }

    fetch() {
        return request(`/region/get`);
    }

    fetchStores({regionID}) {
        return request(`/stores/get?regionID=${regionID}`);
    }

    login(values) {
        const user = {
            userName: values.userName,
            password: values.password,
            storeId: values.storeID,
        };

        return request('/login/post', {
            method: "post",
            body: JSON.stringify(user),
        });

    }
}