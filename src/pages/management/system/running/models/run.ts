import RuningService from "../../../../../services/running";
import {StaticRouter} from "react-router";
import {ICondition, IDict} from "../../../../../interfaces/management/iManagement";
import Dict from "../../../../../interfaces/management/models/Dict";
import Condition from "../../../../../interfaces/management/models/Condition";
import {MONEY_CODE, PRODUCT_CODE} from "../Running";

export default {
    namespace: "run",

    state: {},

    reducers: {
        save: (state, {payload: {moneies, products, settings, mb, pb}}) => {
            return {
                ...state,
                moneies,
                products,
                settings,
                mb, pb
            }
        },

        // change state is undeep clone....
        changeDict: (state, {payload: {code, dictID}}) => {
           const {moneies, products, settings, count } = state;

           if (code === MONEY_CODE) {
               moneies.map((m: IDict) => {
                   m.selected = m.Id + "" === dictID + ""
               })
           } else if (code === PRODUCT_CODE) {
               products.map((p: IDict) => p.selected = p.Id + "" === dictID + "");
           }

           count = count || 1;
           count++;
           return {
               ...state,
               count
           };
        },

        changeBit: (state, {payload: {key, value}}) => {
            return {
                ...state,
                [key]: value
            }
        }
    },

    effects: {
        * fetch({}, {call, put}) {
            const {data: dicts} = yield call(RuningService.getInstance().queryRuningServiceDicts);
            const {data: settings} = yield call(RuningService.getInstance().queryStoreSettings);

            let moneies: IDict[] = [];
            let products: IDict[] = [];
            if (dicts && dicts.length) {
                moneies = Dict.getInstance().getDictsAsCode(MONEY_CODE, dicts, settings);
                products = Dict.getInstance().getDictsAsCode(PRODUCT_CODE, dicts, settings);
            }

            let con: ICondition = Condition.getInstance().getConditionAsCode(settings, MONEY_CODE);
            const mb = con && con.AdditionBit || 0;
            con = Condition.getInstance().getConditionAsCode(settings, PRODUCT_CODE);
            const pb = con && con.AdditionBit || 4;

            yield put({
                type: "save",
                payload: {
                    moneies,
                    products,
                    settings,
                    mb,
                    pb
                }
            });
        },
    }
}
