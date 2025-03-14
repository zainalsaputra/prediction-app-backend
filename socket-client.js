const io = require('socket.io-client');

const socket = io('http://localhost:3000', { transports: ['websocket'] });

socket.on('connect', () => {
    console.log('Connected to WebSocket Server:', socket.id);

    socket.emit('join_room', 'b077733d-e727-4cd5-8a6c-88f98f59d7b1');

    socket.on('post_reported', (data) => {
        console.log('Post reported:', data);
    });

    socket.on('post_status_updated', (data) => {
        console.log('Post status updated:', data);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
