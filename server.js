const express = require('express');
const cluster = require('cluster');

const app = express();

function delay(ms) {
	const startTime = Date.now();
	while (Date.now() - startTime < ms) {
		// event loop is blocked
	}
	return;

	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		resolve();
	// 	}, ms);
	// });
}

app.get('/', (req, res) => {
	res.send(`Performance example ${process.pid}`);
});

app.get('/timer', async (req, res) => {
	// delay the response for 2 seconds
	delay(10000);

	res.send(`ding ding ding ${process.pid}`);
});

if (cluster.isMaster) {
	// Count the machine's CPUs
	cluster.fork();
	cluster.fork();
} else {
	console.log('Worker process started');
	app.listen(3000, () => {
		console.log('Server is running on port 3000');
	});
}
