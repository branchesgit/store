import {ICondition} from "../iManagement";

export default class Condition {

    private constructor(){}

    private static instance: Condition = null;

    static getInstance() {
        if (!Condition.instance) {
            Condition.instance = new Condition();
        }

        return Condition.instance;
    }

    getConditionAsCode(conditions: ICondition[], code: string): ICondition {
        const rets = (conditions || []).filter(c => c.Code === code);
        return rets && rets.length ? rets[0] : null;
    }
}
