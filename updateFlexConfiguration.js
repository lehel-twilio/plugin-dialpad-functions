const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

//Create blank logs file
fs.writeFileSync('logs.txt', '');

log(`Opening file ${process.argv[2]}`);

//Open JSON file passed in as argument and parse file
const uiAttributes = fs.readFileSync(`${process.argv[2]}.json`, 'utf8');
const parsedUiAttributes = JSON.parse(uiAttributes);

//Grab Account Sid and Token from arguments
const accountSid = process.argv[3];
const authToken = process.argv[4];

//CLean up JSON file, add required Account Sid
let configuration = {};
configuration["ui_attributes"] = parsedUiAttributes;
configuration["account_sid"] = accountSid;

log(`Sending the following configuration:`);
log(JSON.stringify(configuration));

//Update Flex configuration through REST API
axios({
    method: 'POST',
    url: 'https://flex-api.twilio.com/v1/Configuration',
    data: JSON.stringify(configuration),
    headers:{'Content-Type': 'application/json'},
    auth: {
      username: accountSid,
      password: authToken
    }
}).then(function (response) {
  log(response);
}).catch(function (error) {
  log(error);
});

//Append messages to log file
function log(message) {
  const timestamp = moment().format();
  fs.appendFileSync('logs.txt', `\n ${timestamp}: ${message}`);
}
