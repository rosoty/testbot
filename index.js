var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        console.log("BABA_KH: "+JSON.stringify(event.message));
        if(event.message && event.message.attachments && event.message.attachments[0].payload && event.message.attachments[0].type=="location")
        {
            
        }
        else if ((event.message && event.message.quick_reply && event.message.quick_reply.payload)|| (event.postback && event.postback.payload))
        {
            console.log("DROITE_KH");
            if(event.postback)
                var str=event.postback.payload;
            else
                var str=event.message.quick_reply.payload;

            console.log("STRE+"+str);
            if(str.includes("step1"))
            {
                    
                
            }
            else if(str.includes("step2"))
            {
         

            }
            else if(str.includes("step3"))
            {         
            
            }
        }
        else if(event.message && event.message.text)
        {
            console.log("MON SIMPLE TEXT");
            var str=event.message.text;
            console.log("TEXT:"+str);
            if(str.toLowerCase()=="hi")
            {
                sendMessage(event.sender.id,{"text": "Welcome HI"});
            }
            else if(str.toLowerCase()=="admin")
            {
                sendMessage(event.sender.id,{"text": "Welcome ADMIN"});   
            }
            else{
                sendMessage(event.sender.id,{"text": "Welcome "+ event.message.text});
            }
        }
    }
    res.sendStatus(200);
});

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};