This repository contains the functions for the dialpad plugin. (https://github.com/lehel-twilio/plugin-dialpad)

You will need to use the Twilio CLI to create a service and deploy the Functions to your Account. Please refer to the Twilio CLI documentation here https://www.twilio.com/docs/labs/serverless-toolkit.

1. Add the following to your .env file:
ACCOUNT_SID=AC...
AUTH_TOKEN=...
TWILIO_WORKFLOW_SID=WW...
TWILIO_WORKSPACE_SID=WS...
2. Download and install Twilio CLI
3. Install the serverless plugin for Twilio CLI
4. Create a new profile `twilio login`
5. Create a new Twilio Serverless Project `twilio serverless:deploy`
6. Make note of the domain, and add it to DialpadPlugin.js
