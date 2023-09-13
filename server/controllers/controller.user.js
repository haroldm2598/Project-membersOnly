const User = require('../models/models.user');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

exports.register = asyncHandler(async (req, res) => {
	try {
		const userFound = await User.findOne({ email: req.body.email });
		// if user does not exist then create
		if (!userFound) {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			const newUser = new User({
				email: req.body.email,
				name: req.body.name,
				password: hashPassword
			});

			await newUser.save();
			console.log('User created');
		} else {
			// if user exist then return an error
			console.log('Email already exist create other email');
		}
	} catch (err) {
		console.log(err);
	}
});

exports.login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) console.log(err);
		if (!user) res.send('No User Exists');
		else {
			req.login(user, (err) => {
				if (err) throw err;
				res.send('Successfully Authenticated');
			});
		}
	})(req, res, next);
};

exports.showUser = async (req, res) => {
	res.send(req.user);
};

exports.logout = (req, res, next) => {
	if (req.user) {
		req.logout((err) => {
			if (err) next(err);
			res.json({ message: 'user is logout' });
		});
	} else {
		res.json({ message: 'No user to logout' });
	}
};

// exports.showUserList = asyncHandler(async (req, res) => {
// 	const allUser = await User.find().exec();

// 	res.json({ allUser });
// });

// exports.showUserId = asyncHandler(async (req, res, next) => {
// 	// const allUser = await User.find().exec();
// 	const [userId] = await Promise.all([User.findById(req.params.id).exec()]);

// 	if (userId === null) {
// 		const err = new Error('User not found');
// 		err.status = 404;
// 		return next(err);
// 	}
// 	res.json({ userId });
// });
