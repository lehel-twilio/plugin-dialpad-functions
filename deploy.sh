#!/bin/bash

#Ptompt user for Account Sid and Token
echo Please enter your Account Sid
read ACCOUNT_SID

echo Please enter your Auth Token
read AUTH_TOKEN

#deploy functions and parse the output, to grab the runtime domain
DOMAIN=`twilio serverless:deploy --override-existing-project -l debug | awk '/domain[[:space:]]/ { print $2 }'`
echo $DOMAIN

#Update Flex configuation with new Functions v2 domain
curl -s 'https://flex-api.twilio.com/v1/Configuration' -u $ACCOUNT_SID:$AUTH_TOKEN |
jq --arg domain $DOMAIN --arg account_sid $ACCOUNT_SID -r -c '{ ui_attributes: .ui_attributes } * { "account_sid": $account_sid, "ui_attributes": { "dialpadDomain": $domain }}' |
curl -s -X POST 'https://flex-api.twilio.com/v1/Configuration' -u $ACCOUNT_SID:$AUTH_TOKEN -H 'Content-Type: application/json' -d @-
