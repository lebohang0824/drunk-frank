const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

class Assistant {

	constructor() {
		this.assistantId  = process.env.ASSISTANT_ID;
		this.assistantObj = this.assistantV2(
			process.env.ASSISTANT_API_VERSION, process.env.ASSISTANT_API_KEY, process.env.ASSISTANT_API_URL
		);
	}

	assistantV2(version, apiKey, apiUrl) {
		return new AssistantV2({
			version: version,
			authenticator: new IamAuthenticator({
				apikey: apiKey,
			}),
			url: apiUrl,
			disableSslVerification: true,
		});
	}

	createSession() {
		return this.assistantObj.createSession({ assistantId: this.assistantId});
	}

	sendMessage(sessionId, message) {
		return this.assistantObj.message({
			assistantId: this.assistantId,
			sessionId: sessionId,
			input: {
				'message_type': 'text',
				'text': message
			}
		});
	}
} 

module.exports = Assistant;