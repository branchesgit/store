import Request from "../utils/request";

export default class MaterialServer {
    private constructor() {
    }

    private static instance: MaterialServer = null;

    static getInstance(): MaterialServer {
        if (!MaterialServer.instance) {
            MaterialServer.instance = new MaterialServer();
        }

        return MaterialServer.instance;
    }

    queryFeatures() {
        return Request.getInstance().get(`/storeserv/rest/get/materials`);
    }

    saveMaterial(parameter) {
        return Request.getInstance().post('/storeserv/rest/save/material', {parameter});
    }

    updateMaterial(parameter) {
        return Request.getInstance().post('/storeserv/rest/update/material', {parameter});
    }

    removeMaterial(record) {
        return Request.getInstance().post('/storeserv/rest/delete/material', {id: record.id});
    }
}
