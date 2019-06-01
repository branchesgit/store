import {IHandle} from "@/pages/management/system/material/component/materialform/IHandle";
import {MATERIALS} from "@/pages/management/system/material/models/material";
import Store from "@/utils/store";

export default class MaterailHandle implements IHandle {
    removeMaterial(view, e) {
        Store.getInstance().dispatch({
            type: `${MATERIALS}/removeMaterial`,
            payload: {
                record: view.props.record,
            }
        })
    }

    feature = 2;

    private constructor() {
    }

    private static instance: MaterailHandle = null;

    static getInstance(): MaterailHandle {
        !MaterailHandle.instance && (MaterailHandle.instance = new MaterailHandle());
        return MaterailHandle.instance;
    }

    isHideFeatureItem(): boolean {
        return false;
    }

    saveMaterial(view: React.Component, e): void {
        e.preventDefault();

        view.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                Store.getInstance().dispatch({
                    type: `${MATERIALS}/saveMaterial`,
                    payload: {
                        ...values,
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

    getTitle(action): string {
        action = !action ? "添加" : action === "modify" ? "修改" : "删除";
        return action + "类型";
    }

}
