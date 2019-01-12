import LoginService from "../../../services/login";

const loginService = LoginService.getInstance();

export const STORE_NAMESPACE = "store";

export default {
    namespace: STORE_NAMESPACE,

    state: {
        stores: [],
    },

    reducers: {
        save(state, {stores}) {
            state = {
                ...state,
                stores,
                storeID: stores.length ? stores[0].storeID + "" : "",
            };

            return state;
        },
    },

    effects: {
        * fetch({payload: {regionID}}, {call, put}) {
            const response = yield call(loginService.fetchStores, {regionID});
            yield put({
                type: "save",
                stores: response.result,
            })
        }
    }


}
