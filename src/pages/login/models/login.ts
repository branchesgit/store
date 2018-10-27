import LoginService from "../services/login";
import Region from "../../../model/login/Region";

const loginService = LoginService.getInstance();
export default {
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
        *fetch({}, {call, put}) {
            const {data} = yield call(loginService.fetch);
            yield put({
                type: "save",
                regions: data
            });
        },
    }

}
