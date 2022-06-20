
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()), // creates express http server
  port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  
  
    /*console.log("Incoming POST request: ");
    console.log(req.body);
    res.status(200).send("[POST] Incoming request");  */
    
    // Parse the request body from the POST
    let reqbody = req.body;
    
    // Check the Incoming webhook message
    console.log("Incoming webhook: " + JSON.stringify(reqbody));
    
    // Validate the webhook
    if(reqbody.object){
      //res.sendStatus(200).json(reqbody);
      res.status(200).json(reqbody)

    } else {
      // Return a '404 Not Found' if event is not from a whatsApp API
      //res.sendStatus(404);
      res.status(404);
    }
  
  });
  
  // Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
  app.get('/webhook', (req, res) => {
    console.log(req.body);
    /** UPDATE YOUR VERIFY TOKEN
    This will be the Verify Token value when you set up webhook**/
    const VERIFY_TOKEN = process.env.fb_token;
    
    console.log("TOKEN + "+ VERIFY_TOKEN);
  
    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Check if a token and mode were sent
    if (mode && token) {
    
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        //res.sendStatus(403);
        res.status(403);
      }
    }
  })