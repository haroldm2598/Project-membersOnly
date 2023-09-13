const express = require('express');
const session = require('express-session');
const passport = require('passport');

const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

// ==== IMPORT ROUTER ====
const mainRoutes = require('./routes/allRoutes');

const app = express();
const port = process.env.PORT || 5000;

// ==== CONNECT TO MONGODB ====
mongoose
	.connect(process.env.MONGO_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((result) => {
		console.log('mongodb is connected');
		app.listen(port, () => {
			console.log(`post is listening to ${port}`);
		});
	})
	.catch((err) => console.log(err));

// ==== MIDDLEWARE ====
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true
	})
);

app.use(session({ secret: 'cats', resave: true, saveUninitialized: true }));
app.use(cookieParser('cats'));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passportDb')(passport);
// ==== END OF MIDDLEWARE ====

// ==== ROUTES ====
app.use('/', mainRoutes);

app.use((req, res) => {
	res.status(404).send('ERROR PAGE NOT FOUND');
});
