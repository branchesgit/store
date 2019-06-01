import {IMaterial} from "@/bean/interface/ISystem";

export default class Material {
    private constructor() {
    }

    private static instance: Material = null;

    static getInstance(): Material {
        !Material.instance && (Material.instance = new Material());
        return Material.instance;
    }

    getFeatures(materials: IMaterial[], feature) {
        return (materials || []).filter(m => m.feature === feature);
    }

    getMaterials(materials: IMaterial[], feature) {
        const ary = this.getFeatures(materials, feature);
        (ary || []).map(m => {
            const idx = materials.findIndex((material: IMaterial) => material.code == m.parent)

            if (idx !== -1) {
                m.featureName = materials[idx].name;
            }
        });

        return ary;
    }

}
