(function(ext) {
  let ws;

  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  ext.connect = function(url) {
    ws = new WebSocket(url);
    
    ws.onopen = function() {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = function(event) {
      console.log(`Message from server: ${event.data}`);
    };

    ws.onclose = function() {
      console.log('WebSocket connection closed');
    };
  };

  ext.sendMessage = function(message) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  ext._shutdown = function() {
    if (ws) {
      ws.close();
    }
  };

  ScratchExtensions.register('WebSocket Extension', {
    blocks: [
      [' ', 'connect to %s', 'connect', 'ws://localhost:8080'],
      [' ', 'send message %s', 'sendMessage', 'Hello, World!']
    ]
  }, ext);
})({});
