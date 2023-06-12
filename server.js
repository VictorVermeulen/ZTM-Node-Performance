const express = require('express');

const app = express();

function delay(ms) {
	//const startTime = Date.now();
	//while (Date.now() - startTime < ms) {
	// event loop is blocked
	//}
	//return;

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

app.get('/', (req, res) => {
	res.send('Performance example');
});

app.get('/timer', async (req, res) => {
	// delay the response for 2 seconds
	await delay(10000);

	res.send('ding ding ding');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
