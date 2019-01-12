import Request from "../utils/request";
import {ICondition} from "../interfaces/management/iManagement";


export default class RuningService {
    private constructor(){}

    private static instance: RuningService = null;

    static getInstance(): RuningService {
        if (!RuningService.instance) {
            RuningService.instance = new RuningService();
        }

        return RuningService.instance;
    }

    queryRuningServiceDicts() {
        return Request.getInstance().get("/bee/settings/QueryDicts");
    }

    queryStoreSettings() {
        return Request.getInstance().get("/bee/settings/QueryStore");
    }

    updateStoreSettings(settings: ICondition[]) {
        return Request.getInstance().post("/bee/settings/UpdateStore", {conditions: settings});
    }
}
