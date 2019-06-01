var server = {
    "target": "http://localhost:9000/",
    "changeOrigin": true
};

var debugServer = {
    "target": "http://localhost:8090/",
    "changeOrigin": true,
    "secure": false,
};

var proxyService = process.env.NODE_DEV === "development" ? debugServer : server;

export default {
    history: "hash",
    proxy: {
        "/storeserv": debugServer
    },

    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: false,
            title: 'store',
            dll: false,
            pwa: false,
            routes: {
                exclude: [
                    /handles/,
                    /models/,
                    /services/,
                    /component/,
                    /components/
                ],
            },
            hardSource: false,
        }],
    ],

    theme: "./theme.js"
}
