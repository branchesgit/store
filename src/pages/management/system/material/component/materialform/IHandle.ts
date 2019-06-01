export interface IHandle {

    isHideFeatureItem(): boolean;

    saveMaterial(view: React.Component, e): void;

    getTitle(action): string;

    updateMaterial(veiw, e);

    removeMaterial(view, e);

}
