const Message = require('../models/models.message');
const asyncHandler = require('express-async-handler');

exports.showMessageList = asyncHandler(async (req, res) => {
	const allMessage = await Message.find().populate('authorName').exec();

	res.json({ allMessage });
});

exports.createMessage = asyncHandler(async (req, res) => {
	try {
		const titleFound = await Message.findOne({ title: req.body.title });
		if (!titleFound) {
			const newUser = new Message({
				title: req.body.title,
				description: req.body.description,
				authorName: req.user._id
			});

			await newUser.save();
			console.log('Message created');
		} else {
			console.log('Title already exist create other email');
		}
	} catch (err) {
		console.log(err);
	}
	// console.log(req.user.username);
});
