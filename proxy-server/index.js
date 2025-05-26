const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

//Proxy /api or /project calls to backend

app.use(['/api', 'project'], createProxyMiddleware({
    target: 'http://localhost:8000', // Backend dev url
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', //remove api prefix when forwarding
        '^/project': '',
    },
    secure: false,
    cookieDomainRewrite: "localhost",

}));

// Proxy everything else to frontend

app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000', // Frontend dev url
    changeOrigin: true,
    secure: false
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});