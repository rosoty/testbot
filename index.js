var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var mongodb = require("mongodb");
var db;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));


//V1.1 Sal+text
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  
});

convertDate = function (time){
    var current=Date.now();
    var delta=current-time;
    console.log("CURRENT="+current);
    console.log("time="+time);
    var seconde=delta/1000;
  if(seconde<60)
    return Math.round(seconde)+" seconds ago.";
    var minute=seconde/60;
    if(minute<60)
        return Math.round(minute)+" minutes ago.";
    var hours=minute/60;
    if(hours<24)
        return Math.round(hours)+" hours ago.";
    var days=hours/24;
    return Math.round(days)+" days ago.";
    
    
}


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


        if(event.message && event.message.attachments && event.message.attachments[0].payload && event.message.attachments[0].type=="location"){
            
        }else if ((event.message && event.message.quick_reply && event.message.quick_reply.payload)|| (event.postback && event.postback.payload)){
            console.log("DROITE_KH");
            if(event.postback)
                var str=event.postback.payload;
            else
                var str=event.message.quick_reply.payload;

            console.log("STRE+"+str);
            if(str.includes("step1")){
                    "image_url":"https://www.business2sell.com.au/images/blogs/20141002/pizza2.jpg",
                
            }else if(str.includes("step2")){
         

            }else if(str.includes("step3")){                
            
            }
                

        }else if(event.message && event.message.text){
            console.log("MON SIMPLE TEXT");
            var str=event.message.text;
            console.log("TEXT:"+str);
            if(str.toLowerCase()=="hi"){
                sendMessage(event.sender.id,{"text": "welcome hi"});
            }else if(str.toLowerCase()=="admin"){
                sendMessage(event.sender.id,{"text": "welcome admin"});
            }
        }
    }
    res.sendStatus(200);
});

function CatMessage(recipientId, text) {
    
    //text = text || "";
    //var values = text.split(' ');
    var imageUrl = "http://demo.ajax-cart.com/photos/product/4/176/4.jpg";
    if (text) {
         message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Kitten",
                        "subtitle": "Cute kitten picture",
                        "image_url": imageUrl ,
                        "buttons": [{
                            "type": "web_url",
                            "url": imageUrl,
                            "title": "Show kitten"
                            }, {
                            "type": "postback",
                            "title": "I like this",
                            "payload": "User " + recipientId + " likes kitten " + imageUrl,
                        }]
                    }]
                }
            }
        };
    
        sendMessage(recipientId, message);
        
        return true; 
    }  
    return false;
    
};
