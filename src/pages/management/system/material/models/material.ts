import MaterialServer from "../../../../../services/material";
import FeatureHandle from "@/pages/management/system/material/component/materialform/handle/FeatureHandle";
import Material from "@/bean/util/Material";
import MaterailHandle from "@/pages/management/system/material/component/materialform/handle/MaterailHandle";

export const MATERIALS = "materials";

export default {
    namespace: MATERIALS,

    state: {
        visible: false,
        iHandle: null,
        loading: true
    },

    reducers: {
        innerState(state, innner) {
            for (let name in innner) {
                if (name !== "type") {
                    state = {
                        ...state,
                        [name]: innner[name]
                    }
                }
            }

            return state;
        }
    },

    effects: {
        * fetch({}, {call, put}) {
            yield put({
                type: 'innerState',
                loading: true
            });

            const server = MaterialServer.getInstance();
            const res = yield call(server.queryFeatures);

            if (res && res.status == "success") {
                const ins = Material.getInstance();

                yield put({
                    type: "innerState",
                    materials: res.result,
                    features: ins.getFeatures(res.result, FeatureHandle.getInstance().feature),
                    ms: ins.getMaterials(res.result, MaterailHandle.getInstance().feature),
                    loading: false
                });
            }
        },

        * saveMaterial({payload, form}, {call, put}) {
            const server = MaterialServer.getInstance();
            const res = yield call(server.saveMaterial, payload);

            if (res && res.status == "success") {
                yield put({type: "fetch"});
                form.resetFields();
            }
        },

        * updateMaterial({payload}, {call, put}) {
            const server = MaterialServer.getInstance();
            const res = yield call(server.updateMaterial, payload);
        },

        * removeMaterial({payload}, {call, put}) {
            const server = MaterialServer.getInstance();
            const res = yield call(server.removeMaterial, payload);
        }
    }
}
