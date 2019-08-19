exports.handler = function(context, event, callback) {
	Object.keys(event).forEach( thisEvent => console.log(`${thisEvent}: ${event[thisEvent]}`));

	let client = context.getTwilioClient();
	let workspace = context.TWILIO_WORKSPACE_SID;

	let taskFilter = `conference.sid == '${event.ConferenceSid}'`;

	//search for the task based on the CallSid attribute
	client.taskrouter.workspaces(workspace)
		.tasks
		.list({evaluateTaskAttributes: taskFilter})
		.then(tasks => {

			let taskSid = tasks[0].sid;
			let attributes = {...JSON.parse(tasks[0].attributes)};
			attributes.conversations = attributes.conversations || {};
			attributes.conversations.segment_link = event.RecordingUrl;

			//update the segment_link
			client.taskrouter.workspaces(workspace)
				.tasks(taskSid)
				.update({
					attributes: JSON.stringify(attributes)
				})
				.then(task => {
					callback(null, null);
				})
				.catch(error => {
					console.log(error);
					callback(error);
				});

		})
		.catch(error => {
			console.log(error);
			callback(error);
		});
}
