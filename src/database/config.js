const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log(
			`💿 Successful database connection - ⌚ - ${new Date().toLocaleString()}`
		);
	} catch (error) {
		console.log(error);
		throw new Error('Error connecting to database');
	}
};

module.exports = {
	dbConnection,
};
