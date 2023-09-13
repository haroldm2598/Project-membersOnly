const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	authorName: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Message', MessageSchema);
