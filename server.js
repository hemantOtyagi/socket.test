import { error } from 'node:console';
import { WebSocketServer , WebSocket } from 'ws'

const wss = new WebSocketServer({ port : 8080 });

wss.on('connection' , (socket , request) => {
      
     const ip = request.socket.remoteAddress;
     
     socket.on('message' , (rawData) => {
       
        const message = rawData.toString();
        console.log({ "binary raw data" : rawData })
        console.log({ "raw data " : message})
         
        wss.clients.forEach((client) => {
            if(client.readyState == WebSocket.OPEN) client.send(`Server Broadcast : ${message}`);
        })

     })
       
     socket.on('error' , (error) => {
        console.error(`Error : ${error.message} : ${ip}`);
     })

     socket.on('close' , () => {
        console.log("Client Disconnected")
     })

})


console.log(`WebSocket Sever is Live on ws://localhost:8080`);