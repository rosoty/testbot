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
                //sendMessage(event.sender.id,{"text": "Welcome "+ event.message.text});
                BookingBusList(event.sender.id,event.message.text);
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

// List Booking Bus Function

function BookingBusList(recipientId, text) {
    var imageUrl = "http://bousra.com/companyprofile/larryta/bustype/bus.jpg";
    if(text){
        message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Express",
                                "subtitle": "Express delivery passenger",
                                "image_url": "http://bousra.com/companyprofile/larryta/bustype/bus.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://againstallgrain.com/wp-content/uploads/2013/03/Iced_Vanilla_Coffee-006.jpg",
                                        "title": "Order",
                                        "webview_height_ratio": "tall"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Like",
                                        "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                    }
                                ]
                            },
                            {     
                                "title": "Towng Sing",
                                "subtitle": "Towng Sing",
                                "image_url": "http://leelalicious.com/wp-content/uploads/2016/04/Thai-Lemon-Iced-Tea.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://leelalicious.com/wp-content/uploads/2016/04/Thai-Lemon-Iced-Tea.jpg",
                                        "title": "Order",
                                        "webview_height_ratio": "tall"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Like",
                                        "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                    }
                                ]
                            },
                            {
                                "title": "STRAWBERRY SMOOTHIES",
                                "subtitle": "STRAWBERRY SMOOTHIES picture",
                                "image_url": "http://bousra.com/companyprofile/larryta/bustype/bus.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://machogrill63.ru/wp-content/uploads/2016/08/Hamburger-Food-Photography-Wallpaper-HD.jpg",
                                        "title": "Order",
                                        "webview_height_ratio": "tall"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Like",
                                        "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                    }
                                ]
                            },
                            { 
                                "title": "STRAWBERRY CAKE",
                                "subtitle": "STRAWBERRY CAKE picture",
                                "image_url": "http://www.chelseasmessyapron.com/wp-content/uploads/2015/04/The-BEST-Strawberry-and-Cream-Cake-Cream-Cheese-Frosting.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://www.chelseasmessyapron.com/wp-content/uploads/2015/04/The-BEST-Strawberry-and-Cream-Cake-Cream-Cheese-Frosting.jpg",
                                        "title": "Order",
                                        "webview_height_ratio": "tall"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Like",
                                        "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                    }
                                ]
                            },
                            {
                                "title": "CARAMEL LATTE",
                                "subtitle": "CARAMEL LATTE",
                                "image_url": "http://images2.laweekly.com/imager/demitasses-pistachio-rose-latte/u/745xauto/5299882/xmascoffee_demi01.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://images2.laweekly.com/imager/demitasses-pistachio-rose-latte/u/745xauto/5299882/xmascoffee_demi01.jpg",
                                        "title": "Order",
                                        "webview_height_ratio": "tall"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Like",
                                        "payload": "User " + recipientId + " likes kitten " + imageUrl,
                                    }
                                ]
                            }
                        ]
                    }
                }
        };   
        sendMessage(recipientId, message);
            
        return true;
    }
};