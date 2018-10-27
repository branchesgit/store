import LoginService from "../services/login";

const loginService = LoginService.getInstance();

export default {
    state: {
        stores: [],
    },

    reducers: {
        save(state, {stores}) {
            state = {
                ...state,
                stores,
            };

            return state;
        },
    },

    effects: {
        *fetch({playload: {regionID}}, {call, put}) {
            const {data} = yield call(loginService.fetchStores, {regionID})
            yield put({
                type: "save",
                stores: data,
            })
        }
    }


}
