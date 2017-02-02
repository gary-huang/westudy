// api/quote.js

var Quote = require('../models/quote');

module.exports.getAllQuotes = function(req, res) {  
    Quote.find(function(err, quotes) {
        if (err) {
            res.send(err);
        }
        res.json({quotes: quotes});
    });
};

module.exports.addQuote = function(req,res) {  
    var quote = new Quote(req.body.quote);
    quote.save(function(err) {
        if (err) {
            res.send(err);

        }
        res.json({quote: quote});
    });
};