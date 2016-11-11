'use strict'
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const jsforce = require('jsforce');

const privateKey  = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express();
const path = require('path')

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(8080);
httpsServer.listen(3000, () => {
   var host = httpsServer.address().address;
   var port = httpsServer.address().port;

   console.log('Example app listening at https://%s:%s', host, port);
 }

);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));


const oauth2 = new jsforce.OAuth2({
    clientId : '3MVG9HxRZv05HarRfAthTbRdIOL_j19KuWlkWFX7EAUzJx85k3b4SsTMGPY9RSsJHfF20JJx.c0wNAQU0G8ky',
    clientSecret : '8062053103645632031',
    redirectUri : 'https://localhost:3000/',
 });


app.get('/oauth2/auth', (req, res) => {
    res.redirect(oauth2.getAuthorizationUrl(302, { scope: 'api id web refresh_token' }));
 });

app.get('/oauth2/callback', function(req, res) {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.param('code');
  conn.authorize(code, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
  });
});


////////// WORKIN
/* var conn = new jsforce.Connection({
   oauth2 : {
     // you can change loginUrl to connect to sandbox or prerelease env.
     //loginUrl : 'https://test.salesforce.com',
     clientId : '3MVG9HxRZv05HarRfAthTbRdIOL_j19KuWlkWFX7EAUzJx85k3b4SsTMGPY9RSsJHfF20JJx.c0wNAQU0G8ky',
     clientSecret : '8062053103645632031',
     redirectUri : 'https://localhost:3000/'
   },

   //  instanceUrl : 'https://eu11.salesforce.com',
   //  accessToken : '00D0Y000000a9od!AQEAQNc9psahXRZqVrJ7gbxZLJBMKv7F64IybArrvEUgNBgN9DKxLXITTBtI9E9kSjvjvm8AO2.EPmc.ymR83.HiLzhwllrs',
   //  refreshToken : '<your Salesforce OAuth2 refresh token is here>'
 });


 conn.login( "davide.delerma@edgetesting.co.uk", "Delermide85YBW7KQDTFwhWGMe8tkZDCZ3NB", (err,userInfo) => {
   if (err) { return console.error(err); }
   // // Now you can get the access token and instance URL information.
   // // Save them to establish connection next time.
   console.log(conn.accessToken);
   console.log(conn.instanceUrl);
   // // // logged in user property
   console.log("User ID: " + userInfo.id);
   console.log("Org ID: " + userInfo.organizationId);
   // // ...
 });
*/
//////////////////////////////////


