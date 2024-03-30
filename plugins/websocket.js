// services/websocket.js

let sockets = {};

export const connectWebSocket = (stock, onMessageCallback) => {
  const socket = new WebSocket(`ws://91.203.134.157:5000/live-data?symbol=${stock}`);
  
  socket.onopen = () => {
    // console.log(`WebSocket connected for ${stock}`);
    sockets[stock] = socket; 
  };

  socket.onmessage = (message) => {
    onMessageCallback(JSON.parse(message.data));
  };

  socket.onclose = () => {
    // console.log(`WebSocket disconnected for ${stock}`);
    delete sockets[stock]; 
  }

  socket.onerror = (error) => {
    // console.error('WebSocket error:', error);
  };
};

export const disconnectWebSocket = (stock) => {
  const socket = sockets[stock];
  if (socket) {
    socket.close();
    delete sockets[stock];
  }
};
