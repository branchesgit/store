import {IRule, IStoreRule} from "@/bean/interface/ISystem";

export default class StoreRule {
    private constructor() {
    }

    static MONEY_CODE = 1;

    static PRODUCTION_CODE = 2;

    static PRODUCTION_NAME_CODE = 3;


    private static instance: StoreRule = null;

    static getInstance(): StoreRule {
        !StoreRule.instance && (StoreRule.instance = new StoreRule());
        return StoreRule.instance
    }

    // 初始化数据；
    initStoreRule(rules: IRule[], storeRules: IStoreRule[]) {
        storeRules.forEach((storeRule: IStoreRule, _) => {
            const code = storeRule.code;
            storeRule.rules = rules.filter(rule => rule.codeable === code);
        });

        return storeRules;
    }

}
