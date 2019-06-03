import StoreRuleService from "../../../../../services/rules";
import {IRule, IStoreRule} from "@/bean/interface/ISystem";
import StoreRule from "@/bean/util/StoreRule";

export const RULES = "rules";

let count = 0;
export default {
    namespace: RULES,

    state: {},

    reducers: {
        innerState(state, innerState) {
            for (let name in innerState) {
                if (name !== "type") {
                    state = {
                        ...state,
                        [name]: innerState[name]
                    };
                }
            }

            return state;
        },

        changeStoreRule(state, {key, code, value}) {
            const storeRules: IStoreRule[] = state.storeRules;
            const storeRule: IStoreRule = storeRules.find(sr => sr.code == code );
            storeRule[key] = typeof value == "object" ? Number(value.target.value) : value;

            return {
                ...state,
                storeRules,
                count: count++,
            }
        }
    },

    effects: {
        * fetch({}, {call, put}) {
            const {result, status} = yield call(StoreRuleService.getInstance().queryStoreRules);

            if (status === "success") {
                const rules: IRule[] = result.rules;
                const storeRules: IStoreRule[] = result.storeRules;

                StoreRule.getInstance().initStoreRule(rules, storeRules);

                yield put({
                    type: "innerState",
                    storeRules,
                });
            }
        },

        * saveStoreRules({storeRules}, {call, put}) {
            const {result, statue} = yield call(StoreRuleService.getInstance().updateStoreRules, storeRules);

            if (status) {

            }
        }
    }
}
