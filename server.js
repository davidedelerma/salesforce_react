var express = require('express');

var jsforce = require('jsforce');
var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

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