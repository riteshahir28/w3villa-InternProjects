const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ccon) => {
  console.log(" New client connected");

  ccon.on("message", (ms) => {
    try {
      const payload = JSON.parse(ms.toString());
      console.log(`Client message --> ${payload.text} from ${payload.senderId}`);
      
      // Broadcast to all clients including sender
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            text: payload.text,
            senderId: payload.senderId,
            timestamp: Date.now()
          }));
        }
      });
    } catch (e) {
      console.log(`Invalid JSON message: ${ms}`);
    }
  });

  ccon.on("close", () => {
    console.log("Client disconnected");
  });
});
