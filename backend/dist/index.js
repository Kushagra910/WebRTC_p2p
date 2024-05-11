"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// global copy of sender & receiver socket 
let senderSocket = null;
let receiverSocket = null;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const parsedData = JSON.parse(data);
        if (parsedData.type === 'sender') { // check for sender
            senderSocket = ws;
            console.log('sender set');
        }
        else if (parsedData.type === 'receiver') { // check for receiver
            receiverSocket = ws;
            console.log('receiver set');
        }
        else if (parsedData.type === 'createOffer') { //create offer message
            if (ws !== senderSocket) {
                return;
            }
            receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "createOffer", sdp: parsedData.sdp }));
            console.log('offer received');
        }
        else if (parsedData.type === 'createAnswer') { //create answer message
            if (ws !== receiverSocket) {
                return;
            }
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: parsedData.sdp }));
            console.log("answer received");
        }
        else if (parsedData.type === 'iceCandidate') {
            if (ws === senderSocket) {
                receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: parsedData.candidate }));
            }
            else if (ws === receiverSocket) {
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: 'iceCandidate', candidate: parsedData.candidate }));
            }
        }
        console.log(parsedData);
    });
});
