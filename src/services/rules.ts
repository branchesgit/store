import Request from "../utils/request";
import {IStoreRule} from "@/bean/interface/ISystem";


export default class StoreRuleService {
    private constructor(){}

    private static instance: StoreRuleService = null;

    static getInstance(): StoreRuleService {
        if (!StoreRuleService.instance) {
            StoreRuleService.instance = new StoreRuleService();
        }

        return StoreRuleService.instance;
    }

    queryStoreRules() {
        return Request.getInstance().get("/storeserv/rest/get/rules");
    }

    updateStoreRules(storeRules: IStoreRule[]) {
        return Request.getInstance().post("/storeserv/rest/save/rules", {parameter: storeRules});
    }

}
