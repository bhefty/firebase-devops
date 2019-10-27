'use strict';
/** EXPORT ALL FUNCTIONS
 * https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *   Author: David King
 *   Edited: Tarik Huber
 *   Additional Edits: Bill Hefty
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
require(`idempotent-babel-polyfill`);

const admin = require(`firebase-admin`);
// const getConfig = require(`./utils/getConfig`).getConfig;
// const fbConfig = getConfig(`fb`);
// const project = process.env.GCLOUD_PROJECT;

// const accountName = project === `[DEFAULT]` ? `app-dev-rentmindr` : project;

// const serviceAccount = require(`./serviceAccounts/${accountName ||
//   `app-dev-rentmindr`}.json`);

// Initialize Firebase Admin with service account
// admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: fbConfig.db,
// });
// Just a comment 2
admin.initializeApp()

const glob = require(`glob`);
const camelCase = require(`camelcase`);

const files = glob.sync(`./**/*.f.js`, {
  cwd: __dirname,
  ignore: [`./node_modules/**`, `./functions/**`],
});
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f];
  const functionName = camelCase(
    file
      .substring(6)
      .slice(0, -5)
      .split(`/`)
      .join(`_`)
  ); // Strip off './dist' and 'f.js'
  if (
    !process.env.FUNCTION_NAME ||
    process.env.FUNCTION_NAME === functionName
  ) {
    exports[functionName] = require(file);
  }
}
