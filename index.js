var express = require('express');
var app = express();
var expressHandlebars  = require('express-handlebars');
var http = require("http-request");
var cheerio = require("cheerio");
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/horoscope',function(req,appResponse){
    var day = req.query["day"];
    var sign = req.query["sign"];
    var selector = '.daily-horoscope-tabs #'+ day +' p'
    http.get('http://new.theastrologer.com/'+sign+'/', function (err, res) {
        if (err) {
            appResponse.status(403).json({ success : false, message : "Sorry!! Something went wrong!! Please try again later" });
        } else {
            html = res.buffer.toString();
            var $ = cheerio.load(html);
            var content = $($(selector)[0]).text();
            var intensity = $($(selector)[1]).text();
            var mood = $($(selector)[2]).text();
            var keywords = $($(selector)[3]).text();

            response_data = {
                content : content,
                intensity : intensity,
                mood : mood,
                keywords : keywords
            };
            appResponse.status(200).json({ success : true, response_data : response_data });    
        }
    });
})

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.listen(process.env.PORT || 5011, function () {
  console.log("Listening on port 5011...");
});
