// TODO FIX SCRAPPER TEMPERATURE

const DB = require('./admin-db-connection');
const io = require('socket.io')();
const schedule = require('node-schedule');
const config = require('./config');
const utility = require('./utilitiy');

io.on('connection', (client) => {
	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);
		schedule.scheduleJob('*/10 * * * * *', function(fireDate){
			DB.on('value', snapshot => {
				client.emit('lakes', utility.scrapperSimulator(snapshot.val()));
			}, errorObject => {
				console.log("The read failed: " + errorObject.code);
			});
		});
	});
});

io.listen(config.PORT);
console.log('listening on port ', config.PORT);
