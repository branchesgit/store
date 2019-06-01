import {Action, AnyAction} from "../../node_modules/@types/react-router-redux/node_modules/redux";

export default class Store {

    private constructor() {
    }

    private static instance: Store = null;

    static getInstance(): Store {
        !Store.instance && (Store.instance = new Store());
        return Store.instance;
    }

    getStore() {
        return window.g_app._store;
    }

    dispatch(action: AnyAction) {
        var store = this.getStore();
        store && store.dispatch(action);
    }
}
