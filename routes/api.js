var express = require('express');
var router = express.Router();

const Assistant = require('../services/Assistant');
const Speech = require('../services/Speech');

var multer  = require('multer');
var upload = multer();

// Create session
router.post('/session', function(req, res, next) {
	const assistant = new Assistant();

	assistant.createSession()
		.then(results => {
			console.log(results);
	    	if (results.status == 201) {
	    		res.send({session: results.result.session_id});
	    	}
	  	})
	  	.catch(err => {
	    	res.send(err);
	  	});
});

// Send message to the bot
router.post('/message', function(req, res, next) {
	const assistant = new Assistant();

	// Send message
	assistant.sendMessage(req.body.session, req.body.message)
		.then(results => {
			res.status(200).json(results.result.output.generic[0]);
		})
		.catch(err => {
			console.log(err.message);
		});
});

// Send message to the bot
router.post('/convert', upload.single('recording'), function(req, res, next) {

	const speech = new Speech();

	let uploadLocation = __dirname + '/' + req.file.originalname

	const blob = Buffer.from(new Uint8Array(req.file.buffer));

	speech.convert(blob).then(data => {
		res.send(data.result.results[0]);
	}).catch(err => res.send(err));
	
});

module.exports = router;
