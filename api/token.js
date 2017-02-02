// api/token.js

module.exports.attemptAuthenticate = function(req, res) {
	if (req.body.grant_type === 'password') {
		res.status(200).send('{ "access_token": "secret token!" }');
	}
};