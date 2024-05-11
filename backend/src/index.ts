import { WebSocketServer ,WebSocket } from "ws";

const wss = new WebSocketServer({port : 8080});

// global copy of sender & receiver socket 
let senderSocket : null | WebSocket = null;
let receiverSocket : null | WebSocket = null;

wss.on('connection',function connection(ws){
  ws.on('error',console.error);

  ws.on('message',function message(data : any){
    const parsedData = JSON.parse(data);
    if(parsedData.type === 'sender'){         // check for sender
        senderSocket = ws;
        console.log('sender set');
    }
    else if(parsedData.type === 'receiver'){      // check for receiver
      receiverSocket = ws;
      console.log('receiver set');
    }
    else if(parsedData.type === 'createOffer'){              //create offer message
      if (ws !== senderSocket) {
        return;
      }
      receiverSocket?.send(JSON.stringify({type:"createOffer",sdp:parsedData.sdp}));
      console.log('offer received');
    }
    else if(parsedData.type === 'createAnswer'){            //create answer message
      if (ws !== receiverSocket) {
        return;
      } 
      senderSocket?.send(JSON.stringify({type:"createAnswer",sdp:parsedData.sdp}));
      console.log("answer received");
    }
    else if(parsedData.type === 'iceCandidate'){
       if(ws === senderSocket){
        receiverSocket?.send(JSON.stringify({type:'iceCandidate',candidate:parsedData.candidate}));
       }
       else if(ws === receiverSocket){
        senderSocket?.send(JSON.stringify({type : 'iceCandidate',candidate:parsedData.candidate}));
       }
    }
  })
});