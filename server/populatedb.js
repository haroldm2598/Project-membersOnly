// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Admin = require('./models/models.admin');
const Message = require('./models/models.message');
const User = require('./models/models.user');

const users = [];
const messages = [];
const admins = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createUser();
	await createMessage();
	await createAdmin();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(index, name, email, password) {
	const userdetail = {
		name: name,
		email: email,
		password: password
	};

	const user = new User(userdetail);
	await user.save();
	users[index] = user;
	console.log(`Added user: ${name}`);
}

async function messageCreate(index, title, description, authorName) {
	const messagedetail = {
		title: title,
		description: description,
		authorName: authorName
	};

	const message = new Message(messagedetail);
	await message.save();
	messages[index] = message;
	console.log(`Added message: ${title}`);
}

async function adminCreate(index, name, email, password) {
	const admindetail = { name: name, email: email, password: password };
	const admin = new Admin(admindetail);

	await admin.save();
	admins[index] = admin;
	console.log(`Added admin: ${name}`);
}

async function createUser() {
	console.log('Adding user');
	await Promise.all([
		userCreate(0, 'mike', 'mike@testing.com', '123qwerty'),
		userCreate(1, 'foxtrot', 'foxtrot@testing.com', 'asdhfgwe'),
		userCreate(2, 'deltaPhi', 'deltaPhi@testing.com', 'sigesigepo')
	]);
}

async function createMessage() {
	console.log('Adding message');
	await Promise.all([
		messageCreate(
			0,
			'H&M demartin o carpio',
			'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
			users[0]
		),
		messageCreate(
			1,
			'Travis Scott J29',
			'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.',
			users[1]
		),
		messageCreate(
			2,
			'demartin o carpio',
			'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
			users[2]
		)
	]);
}

async function createAdmin() {
	console.log('Adding admin');
	await Promise.all([
		adminCreate(0, 'shenna', 'shenna@testing.com', 'titimomalaki'),
		adminCreate(1, 'Shoes', 'shoes@testing.com', 'sigelanglods')
	]);
}
