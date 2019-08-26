import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8001');

function subscribeToTimer(cb) {
	socket.on('lakes', lakes => cb(null, lakes));
	socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer };