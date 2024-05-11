import { useEffect} from "react";

export const Receiver = () =>{
  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      socket.send(JSON.stringify({type:'receiver'}));
    }

    //receives an offer
 
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc = null;
      if(message.type === 'createOffer'){
        //set the remote description
         pc = new RTCPeerConnection();
         pc.setRemoteDescription(message.sdp);

         pc.onicecandidate = (event) => {
          console.log(event);
          if(event.candidate){
            socket?.send(JSON.stringify({type:"iceCandidate",candidate:event.candidate}));
          }
        }

        pc.ontrack = (event) => {
           console.log(event);
           const video = document.createElement('video');
           document.body.appendChild(video);
           video.srcObject = new MediaStream([event.track]);
           video.play();
        }
        //create an answer
        const answer = await pc.createAnswer();
        // set the local description
        await pc.setLocalDescription(answer);

        //send the answer to sender
        socket.send(JSON.stringify({type:'createAnswer',sdp:pc.localDescription}))
      }else if (message.type === 'iceCandidate') {
        //@ts-ignore
        pc?.addIceCandidate(message.candidate);
    }
    }
  },[]);
  return (
    <div>Receiver
    </div>
  )
}