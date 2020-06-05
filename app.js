const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static('/images', express.static(path.join(__dirname, 'images'))));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/feed', feedRoutes);

app.use( (error, req, res, next) => {
	console.log( error );
	const status = error.statusCode;
	const message = error.message;
	res.status(status).json({ message: message });
})

mongoose
	.connect(
		`mongodb+srv://osamabinmusic:Conchetumadre.,1595@vinilo-cluster-test001-e9dtn.gcp.mongodb.net/messages?retryWrites=true`,
		{ useNewUrlParser: true }
	)
	.then( result => {
		app.listen(8080);
	})
	.catch( err => console.log('Error mongoose', err));