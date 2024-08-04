const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
  console.log('Client connected');
  
  ws.on('message', message => {
    console.log(`Received: ${message}`);
    // 受け取ったメッセージを全クライアントにブロードキャスト
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server received: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
