var server =  {
    "target": "http://localhost:9000/",
    "changeOrigin": true
};

var debugServer =  {
    "target": "http://localhost:8080/",
    "changeOrigin": true
};

var proxyService = false ?  debugServer : server;

export default {
    history: "hash",
    proxy: {
        "/region": proxyService,
        "/stores": proxyService,
        "/login":proxyService
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
                exclude: [],
            },
            hardSource: false,
        }],
    ],
}
