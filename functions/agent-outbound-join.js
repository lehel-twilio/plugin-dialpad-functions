/* create a Twilio Function from this file

name: Flex Dialpad Agent Outbound Join
path /agent-outbound-join

*/

exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();

  console.log(event);

  twiml.dial().conference({
    statusCallback: 'call-outbound-join',
    statusCallbackEvent: 'join end',
    endConferenceOnExit: true,
    record: 'record-from-start',
    recordingStatusCallback: 'attach-recording-to-task',
    recordingStatusCallbackEvent: 'completed'
  },event.taskSid);
    callback(null, twiml);
};
