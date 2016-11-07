var express = require('express');
var app = express();

var jsforce = require('jsforce');
console.log("till here");
var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
 loginUrl : 'https://login.salesforce.com'
});
conn.login("davide.delerma@edgetesting.co.uk", "Delermide85","YBW7KQDTFwhWGMe8tkZDCZ3NB", function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});