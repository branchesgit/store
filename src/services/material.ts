import Request from "../utils/request";

export default class MaterialServer {
    private constructor(){}

    private static instance: MaterialServer = null;

    static getInstance(): MaterialServer {
        if (!MaterialServer.instance) {
            MaterialServer.instance = new MaterialServer();
        }

        return MaterialServer.instance;
    }

    queryFeatures(){
        Request.getInstance().get("/bee/settings/QueryFeatures");
    }
}
