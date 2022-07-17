"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const net_1 = __importDefault(require("net"));
let urls = [];
setInterval(() => {
    console.log('ping');
    for (let i = 0; i < urls.length; i++) {
        try {
            const u = new URL(urls[i]);
            https_1.default.request(Object.assign(Object.assign({}, u), { timeout: 3000 }));
        }
        catch (e) {
            console.log(e, urls[i]);
            urls = urls.filter(u => u !== urls[i]);
        }
    }
}, 5000);
let socket;
const server = {
    host: '45.77.73.193',
    port: 3335
};
function connect() {
    socket = new net_1.default.Socket();
    socket.on('data', (data) => {
        urls.push(data.toString().trim());
    });
    socket.connect(server);
    socket.once('close', () => {
        console.log('close');
        setTimeout(connect, 1000);
    });
    socket.once('end', () => {
        console.log('end');
        setTimeout(connect, 1000);
    });
    socket.once('error', (err) => {
        console.log('error');
        console.log(err);
        setTimeout(connect, 1000);
    });
}
connect();
//# sourceMappingURL=pinger.js.map