/* create a Twilio Function from this file

name: Flex Dialpad Create New Task
path /create-new-task

Remove the checkmark from Check for valid Twilio signature

*/

const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {

  Object.keys(event).forEach( thisEvent => console.log(`${thisEvent}: ${event[thisEvent]}`));

  const workspace = context.TWILIO_WORKSPACE_SID;
  const workflowSid = context.TWILIO_WORKFLOW_SID;

  let client = context.getTwilioClient();

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const authed = await validateToken(event.Token, context.ACCOUNT_SID, context.AUTH_TOKEN);
  if (typeof authed !== 'object' || !authed.data || authed.data.valid !== true) {
    console.log('couldn\'t auth', event.Token);
    return callback(null, response);
  }

  console.log('successfully authed ', authed.data);
  console.log('To ', event.To);
  console.log('From ', event.From);

  client
  .taskrouter.workspaces(workspace)
  .tasks
  .create(
    {
      attributes: JSON.stringify(
        {
          to: event.To,
          direction: 'outbound',
          name: event.To,
          from: event.From,
          url: context.RUNTIME_DOMAIN,
          targetWorker: event.Worker,
          autoAnswer: 'true',
          internal: event.Internal
        }),
      workflowSid: workflowSid,
      taskChannel: 'custom1',
      timeout: 30
    })
  .then(task => {
    response.setBody( task.sid );
    callback(null, response);
  })
  .catch((error) => {
    console.log(error);
    callback(error);
  });
});

