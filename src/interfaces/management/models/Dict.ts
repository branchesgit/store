import {ICondition, IDict} from "../iManagement";

export default class Dict {
    private constructor() {
    }

    private static instance: Dict = null;

    static getInstance(): Dict {
        if (!Dict.instance) {
            Dict.instance = new Dict();
        }

        return Dict.instance;
    }

    getDictsAsCode(code: string, dicts: IDict[], settings: ICondition[]) {
        const s = (settings || []).filter(s => s.Code === code)[0];
        const rets = (dicts || []).filter(dict => {
            const ret = dict.Code === code;
            if (ret) {
                dict.selected = dict.Id === s.DictPK;
            }
            return ret;
        });
        return rets;
    }

    getDictsAsCode_ID(code: string, dicts: IDict[], dictID: number) {
        const rets = (dicts || []).filter(dict => {
            const ret = dict.Code === code;
            if (ret) {
                dict.selected = dict.Id === dictID;
            }
            return ret;
        });
        return rets;
    }
}
