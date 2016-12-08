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
                AllBusCompany(event.sender.id,event.message.text);
                //Getdirection(event.sender.id,event.message.text);
            }
            // else if(str.toLowerCase()=="admin")
            // {
            //     sendMessage(event.sender.id,{"text": "Welcome ADMIN"});   
            // }
            // else if(str.toLowerCase()=="from")
            // {
            //     GetFrom(event.sender.id,event.message.text);
            // }
            // else if(str.toLowerCase()=="to")
            // {
            //     GetTo(event.sender.id,event.message.text);
            // }
            // else{
            //     AllBusCompany(event.sender.id,event.message.text);
            // }
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

function AllBusCompany(recipientId, text) {
    var imageUrl = "http://bousra.com/companyprofile/larryta/bustype/bus.jpg";
    if(text){
        message = {
                "attachment": {
                    "type": "template",
                    "text":"All Bus Company : ",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Express",
                                "subtitle": "VGS EXPRESS TRANSPORTATION (MINI VAN)",
                                "image_url": "http://bousra.com/companyprofile/larryta/bustype/bus.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://againstallgrain.com/wp-content/uploads/2013/03/Iced_Vanilla_Coffee-006.jpg",
                                        "title": "Book Now",
                                        "webview_height_ratio": "tall"
                                    }
                                ]
                            },
                            {     
                                "title": "Towng Sing",
                                "subtitle": "To convey the best conceivable support of our clients and we plan to make and keep up our progress by giving excellent support of our clients.",
                                "image_url": "http://tss-transport.com/wp-content/uploads/2016/03/aboutUS.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://leelalicious.com/wp-content/uploads/2016/04/Thai-Lemon-Iced-Tea.jpg",
                                        "title": "Book Now",
                                        "webview_height_ratio": "tall"
                                    }
                                ]
                            },
                            {
                                "title": "CAPITOL",
                                "subtitle": "Various bus companies in Cambodia (Phnom Penh)",
                                "image_url": "http://www.globalprice.info/rus/kombodjia/foto/2013/26.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://machogrill63.ru/wp-content/uploads/2016/08/Hamburger-Food-Photography-Wallpaper-HD.jpg",
                                        "title": "Book Now",
                                        "webview_height_ratio": "tall"
                                    }
                                ]
                            },
                            { 
                                "title": "Mekong Express",
                                "subtitle": "Cambodia Impressive Travel",
                                "image_url": "http://www.cambodiatourtravel.com/uploads/image/mekong-express-bus.jpg" ,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://www.chelseasmessyapron.com/wp-content/uploads/2015/04/The-BEST-Strawberry-and-Cream-Cake-Cream-Cheese-Frosting.jpg",
                                        "title": "Book Now",
                                        "webview_height_ratio": "tall"
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

// Get From 

function GetFrom(recipientId, text){
    var rep = recipientId;
    if(text){
        var msg={
            "text":"Choose place where are you ?",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Phnom Penh",
                "image_url":"http://www.phnompenhpost.com/sites/default/files/ppp_favicon.ico",
                "payload":rep+"_pp"
              },
              {
                "content_type":"text",
                "title":"Siem Reap",
                "image_url":"https://image.freepik.com/free-icon/angkor-wat_318-133983.jpg",
                "payload":rep+"_siepreap"
              },
              {
                "content_type":"text",
                "title":"Batdombong",
                "image_url":"http://www.hrcambodia.com/images/location/Battambang.jpg",
                "payload":rep+"_bb"
              }
            ]
          };
          sendMessage(recipientId, msg);
          return true;
    }
};

// Get To

function GetTo(recipientId, text){
    var rep = recipientId;
    if(text){
        var msg={
            "text":"Choose place where do you want to go ?",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Kompong Cham",
                "image_url":"http://www.hrcambodia.com/images/location/Kampong%20Cham.jpg",
                "payload":rep+"_pp"
              },
              {
                "content_type":"text",
                "title":"Koh Kong",
                "image_url":"http://www.hrcambodia.com/images/location/Koh%20Kong.jpg",
                "payload":rep+"_siepreap"
              },
              {
                "content_type":"text",
                "title":"Kompong Som",
                "image_url":"https://i.ytimg.com/vi/ge8Zl935vq0/hqdefault.jpg",
                "payload":rep+"_bb"
              }
            ]
          };
          sendMessage(recipientId, msg);
          return true;
    }
}

// Get Directio Map

function Getdirection(recipientId, text){
    var rep = recipientId;
    if(text){
        var msg={
            "text":"Choose where you want to eat:",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Delivery",
                "image_url":"https://news.usc.edu/files/2015/10/delivery_WEB-824x549.jpg",
                "payload":rep+"_delivery"
              },
              {
                "content_type":"text",
                "title":"Take Away",
                "image_url":"http://www.asac.it/wp-content/uploads/2015/02/TakeAway-logo-350x280.jpg",
                "payload":rep+"_takeaway"
              },
              {
                "content_type":"text",
                "title":"Indoor",
                "image_url":"https://www.business2sell.com.au/images/blogs/20141002/pizza2.jpg",
                "payload":rep+"_indoor"
              }
            ]
          };
          sendMessage(recipientId, msg);
          return true;
    }
};