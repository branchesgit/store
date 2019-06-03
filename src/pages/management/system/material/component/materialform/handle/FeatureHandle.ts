import {IHandle} from "../IHandle";
import {MATERIALS} from "@/pages/management/system/material/models/material";
import Store from "@/utils/store";

export default class FeatureHandle implements IHandle {

    feature = 1;

    getTitle(action): string {
        action = !action ? "添加" : action === "modify" ? "修改" : "删除";
        return action + "类型";
    }

    private constructor() {
    }

    private static instance: FeatureHandle = null;

    static getInstance(): FeatureHandle {
        !FeatureHandle.instance && (FeatureHandle.instance = new FeatureHandle());
        return FeatureHandle.instance;
    }

    isHideFeatureItem(): boolean {
        return true;
    }

    saveMaterial(view, e): void {
        e.preventDefault();

        view.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Store.getInstance().dispatch({
                    type: `${MATERIALS}/saveMaterial`,
                    payload: {
                        ...values,
                        parent: -1,
                        feature: this.feature
                    },
                    form: view.props.form,
                });

            }
        });
    }

    updateMaterial(view, e) {
        e.preventDefault();
        const record = view.props.record;

        view.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Store.getInstance().dispatch({
                    type: `${MATERIALS}/updateMaterial`,
                    payload: {
                        ...record,
                        ...values,
                    }
                })
            }
        })
    }

    removeMaterial(view, e) {
        Store.getInstance().dispatch({
            type: `${MATERIALS}/removeMaterial`,
            payload: {
                ...view.props.record,
            }
        })
    }
}
