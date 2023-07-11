const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));

app.listen(process.env.PORT, () => {
	console.log(
		`🚀 Server run on http://${process.env.HOSTNAME}:${
			process.env.PORT
		}/ - ⌚ - ${new Date().toLocaleString()}`
	);
});
