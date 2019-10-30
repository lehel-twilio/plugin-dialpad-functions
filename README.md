This repository contains the functions for the dialpad plugin. (https://github.com/lehel-twilio/plugin-dialpad).

Pre-requisites:
1. Install Twilio CLI. Please refer to the Twilio CLI documentation here https://www.twilio.com/docs/labs/serverless-toolkit. Please make sure that the correct profiles is activated within the CLI.
2. Install jq. Please refer to the documentation here https://stedolan.github.io/jq/

Installation instructions:
1. Add the following to your .env file:
ACCOUNT_SID=AC...
AUTH_TOKEN=...
TWILIO_WORKFLOW_SID=WW...
TWILIO_WORKSPACE_SID=WS...
2. Run `npm run deploy`

Change Log:
8/20/2019 - v4.2 - Starting off with version 4.2 to match the version of the Dialpad plugin. The Dialpad functions have been migrated to Functions v2, which requires them to be split out into a separate project.

10/30/2019 - v4.3 - The previous version of the Dialpad required that Functions v2 runtime domain name to be hardcoded. This version introduces a new deployment method, which will take the Functions v2 runtime domain name, and will POST to https://flex-api.twilio.com/v1/Configuration. Version 4.3 of the Dialpad will set the runtime domain dynamically base don the Flex Configuration, instead of requiring the domain name to be hardcoded. /create-new-task and /call-outbound-join have been modified to support E.164 format.
