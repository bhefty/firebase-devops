// INCLUDE BELOW AT TOP OF ALL FUNCTION FILES
const functions = require(`firebase-functions`);
const admin = require(`firebase-admin`);
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  /***/
}
try {
  const settings = { timestampsInSnapshots: true };
  admin.firestore().settings(settings);
} catch (e) {
  /***/
}
// INCLUDE ABOVE AT TOP OF ALL FUNCTION FILES

const { demo } = require('./util')

exports = module.exports = functions.https.onCall(async (data, context) => {
  try {
    const result = demo()
    return { message: `Hello world! Demo - ${result}` };
  } catch (error) {
    console.error(`Error`, error);
    return { error };
  }
});
