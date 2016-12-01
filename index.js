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
// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            if (!kittenMessage(event.sender.id, event.message.text)) {
                sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
            }
        } else if (event.postback) {
            //console.log("Postback received: " + JSON.stringify(event.postback));
            receivedPostback(event);
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

// send rich message with kitten
function kittenMessage(recipientId, text) {
    
    text = text || "";
    var values = text.split(' ');
    
    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
            
            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "list",
                        "top_element_style": "compact",
                        "elements": [
                            // "title": "Kitten",
                            // "subtitle": "Cute kitten picture",
                            // "image_url": imageUrl ,
                            // "buttons": [{
                            //     "type": "web_url",
                            //     "url": imageUrl,
                            //     "title": "Show kitten"
                            //     }, {
                            //     "type": "postback",
                            //     "title": "I like this",
                            //     "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            // }]


                            {
                                "title": "Classic White T-Shirt",
                                "image_url": imageUrl,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Buy",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                                    }
                                ]                
                            },
                            {
                                "title": "Classic Blue T-Shirt",
                                "image_url": imageUrl,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Buy",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                                    }
                                ]                
                            },
                            {
                                "title": "Classic Black T-Shirt",
                                "image_url": imageUrl,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=102",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Buy",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=102",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                                    }
                                ]                
                            },
                            {
                                "title": "Classic Gray T-Shirt",
                                "image_url": imageUrl,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Buy",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=103",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                                    }
                                ]                
                            }
                        ],
                        "buttons": [
                            {
                                "title": "View More",
                                "type": "postback",
                                "payload": "payload"                        
                            }
                        ] 
                    }
                }
            };
    
            sendMessage(recipientId, message);
            
            return true;
        }
    }
    
    return false;
    
};

function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    sendMessage(senderID, "Postback called");
}

