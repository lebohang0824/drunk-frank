const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

class Speech {

	constructor() {
		this.speechToText = new SpeechToTextV1({
			authenticator: new IamAuthenticator({
				apikey: process.env.SPEECH_API_KEY,
			}),
			url: process.env.SPEECH_API_URL,
			disableSslVerification: true,
		});		
	}

	convert(blob, contentType = 'audio/mp3', wordAlternativesThreshold = 0.5, keywords = ['hello'], keywordsThreshold = 0.5) {
		const recognizeParams = {
			audio: blob,
			contentType: contentType,
			wordAlternativesThreshold: wordAlternativesThreshold,
			keywords: keywords,
			keywordsThreshold: keywordsThreshold,
		};

		return this.speechToText.recognize(recognizeParams);
	}

}

module.exports = Speech;