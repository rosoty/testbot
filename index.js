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
                //sendMessage(event.sender.id, {text: "Echo: " + event.message.text + ", SenderId= " + event.sender.id });
                getInfo(event.sender.id, {first_name: "Your name: " +event.message.first_name});
            }
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
            // receivedPostback(event);
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

// Get User Information
function getInfo(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'GET',
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
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "ICED VANILLA LATTE",
                                "subtitle": "ICED VANILLA LATTE picture",
                                "image_url": "http://againstallgrain.com/wp-content/uploads/2013/03/Iced_Vanilla_Coffee-006.jpg" ,
                                "buttons": [{
                                    "type": "web_url",
                                    "url": "http://againstallgrain.com/wp-content/uploads/2013/03/Iced_Vanilla_Coffee-006.jpg",
                                    "title": "Order"
                                    }, {
                                    "type": "postback",
                                    "title": "details",
                                    "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                }]
                            },
                            {     
                                "title": "ICED LEMON TEA",
                                "subtitle": "ICED LEMON TEA",
                                "image_url": "http://leelalicious.com/wp-content/uploads/2016/04/Thai-Lemon-Iced-Tea.jpg" ,
                                "buttons": [{
                                    "type": "web_url",
                                    "url": "http://leelalicious.com/wp-content/uploads/2016/04/Thai-Lemon-Iced-Tea.jpg",
                                    "title": "Order"
                                    }, {
                                    "type": "postback",
                                    "title": "details",
                                    "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                }]
                            },
                            {
                                "title": "STRAWBERRY SMOOTHIES",
                                "subtitle": "STRAWBERRY SMOOTHIES picture",
                                "image_url": "http://foodrecipess.com/wp-content/uploads/2016/03/How-To-Make-Strawberry-Smoothie-Recipe..jpg" ,
                                "buttons": [{
                                    "type": "web_url",
                                    "url": "http://machogrill63.ru/wp-content/uploads/2016/08/Hamburger-Food-Photography-Wallpaper-HD.jpg",
                                    "title": "Order"
                                    }, {
                                    "type": "postback",
                                    "title": "details",
                                    "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                }]
                            },
                            { 
                                "title": "STRAWBERRY CAKE",
                                "subtitle": "STRAWBERRY CAKE picture",
                                "image_url": "http://www.chelseasmessyapron.com/wp-content/uploads/2015/04/The-BEST-Strawberry-and-Cream-Cake-Cream-Cheese-Frosting.jpg" ,
                                "buttons": [{
                                    "type": "web_url",
                                    "url": "http://www.chelseasmessyapron.com/wp-content/uploads/2015/04/The-BEST-Strawberry-and-Cream-Cake-Cream-Cheese-Frosting.jpg",
                                    "title": "Order"
                                    }, {
                                    "type": "postback",
                                    "title": "details",
                                    "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                }]
                            },
                            {
                                "title": "CARAMEL LATTE",
                                "subtitle": "CARAMEL LATTE",
                                "image_url": "http://images2.laweekly.com/imager/demitasses-pistachio-rose-latte/u/745xauto/5299882/xmascoffee_demi01.jpg" ,
                                "buttons": [{
                                    "type": "web_url",
                                    "url": "http://images2.laweekly.com/imager/demitasses-pistachio-rose-latte/u/745xauto/5299882/xmascoffee_demi01.jpg",
                                    "title": "Order"
                                    }, {
                                    "type": "postback",
                                    "title": "details",
                                    "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                }]
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
    var first_name = event.sender.first_name;
    var last_name = event.sender.last_name;
    var profile_pic = event.sender.profile_pic;
    var local = event.sender.local;
    var gender = event.sender.gender;
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

