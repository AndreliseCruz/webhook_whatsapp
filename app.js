const express = require('express')
const app = express()
const port = process.env.PORT || 5000

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
      res.sendStatus(200).json(reqbody);
    } else {
      // Return a '404 Not Found' if event is not from a whatsApp API
      res.sendStatus(404);
    }
  
  });
  
  // Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
  app.get('/webhook', (req, res) => {
    console.log(req.body);
    /** UPDATE YOUR VERIFY TOKEN
    This will be the Verify Token value when you set up webhook**/
    const VERIFY_TOKEN = 'EAAHQ99pBvgEBACBUGrBzbZCiG2gn5zCMUsETs7htVv8ZCFMfZCcABkZAP8wgD05Xpv3ykedUR2rEjzpsO9RScSCKlKMDeGUF9xhLmHYV34szND4qGTuE7sV1wsOPNKMttHBSTbc482dRbKXKNv2283wMHe1LN2b868VX3SJZCnoNllg9xWeQnXk8E7lwUbLHWZCZBXVllvyLghGODSGxo0k';
    
    console.log("TOKEN + "+ VERIFY_TOKEN);
  
    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    console.log("TOKEN + "+ token);
  
      
    // Check if a token and mode were sent
    if (mode && token) {
    
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  })