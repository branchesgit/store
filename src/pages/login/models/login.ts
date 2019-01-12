import LoginService from "../../../services/login";
import Region from "../components/models/Region";

const loginService = LoginService.getInstance();
export const LOGIN_NAMESPACE = "login";

export default {
    namespace: LOGIN_NAMESPACE,

    state: {
        regions: []
    },
    reducers: {
        save(state, {regions}) {
            state = {...state, regions};
            return state;
        }
    },
    effects: {
        * fetch({}, {call, put}) {
            const response = yield call(loginService.fetch);
            yield put({
                type: "save",
                regions: response.result
            });
        },
    }

}
