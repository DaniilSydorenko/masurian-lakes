const admin = require('firebase-admin');
const config = require('./config');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: config.FIREBASE_APP
});

const db = admin.database();
const DB = db.ref(config.DB_NAME);

module.exports = DB;
