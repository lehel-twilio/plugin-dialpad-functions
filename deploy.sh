#!/bin/bash

#Ptompt user for Account Sid and Token
echo Please enter your Account Sid
read ACCOUNTSID

echo Please enter your Auth Token
read AUTHTOKEN

#Clean up old files, if applicable
trap `rm uiAttributes.json` EXIT
trap `rm updatedUiAttributes.json` EXIT
trap `rm logs.txt` EXIT

#deploy functions and parse the output, to grab the runtime domain
DOMAIN=`twilio serverless:deploy -l debug | awk '/domain[[:space:]]/ { print $2 }'`
echo $DOMAIN

#get Flex configuration using Twilio cli
UIATTRIBUTES=`twilio api:flex:v1:configuration:fetch --properties=uiAttributes`

#strip leading "Ui Attributes"
STRIPPEDUIATTRIBUTES=$(echo $UIATTRIBUTES | cut -c15-)
#save json to disk
echo $STRIPPEDUIATTRIBUTES >> uiAttributes.json

#use jq to append dialpadDomain to the configuation
UPDATEDUIATTRIBUTES=`jq --arg domain $DOMAIN '.dialpadDomain=$domain' uiAttributes.json`
#write updated attributes to disk
echo $UPDATEDUIATTRIBUTES >> updatedUiAttributes.json

#call node function which will call the REST API to update the configuration
`node updateFlexConfiguration.js updatedUiAttributes $ACCOUNTSID $AUTHTOKEN`

#Clean up files
trap `rm uiAttributes.json` EXIT
trap `rm updatedUiAttributes.json` EXIT
trap `rm logs.txt` EXIT
