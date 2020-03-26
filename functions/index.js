const functions = require('firebase-functions');
const fs = require('fs');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// const fs = require('fs')

let config = functions.config().env
if (process.env.NODE_ENV !== 'production') {
  if (fs.existsSync('./env.json')) {
    const env = require('./env.json')

    config = env
  }
}
module.exports = config