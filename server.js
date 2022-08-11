/*(en): load required dependencies
(gr): φορτώστε τις απαιτούμενες εξαρτήσεις*/
const express = require("express");//(en): need to create the server (gr): χρειάζεται για τη δημιουργία του διακομιστή
const fileUpload = require ("express-fileupload");//(en): need for uploading files on server  (gr): χρειάζεται για τη μεταφόρτωση αρχείων στο διακομιστή
const pdfParse = require("pdf-parse");//(en): need for extracting text from pdf  (gr): ανάγκη για εξαγωγή κειμένου από pdf
const fileSaver = require("file-saver");//(en): need to save a txt file  (gr): για αποθήκευση αρχείου txt
const dlf = require("dialogflow-fulfillment");//(en): for HTTP callbacks for chatbot requests and responses  (gr): για HTTP callbacks
const path = require("path");// The path
require("dotenv").config();// need for enironment variables

/*(en):create the server and define the port that it runs on
(gr): δημιουργία του διακομιστή και ορισμός της θύρας στην οποία τρέχει*/
const app = express();
const port = process.env.PORT || 5000;

/*(en):express needs to serve the static files, (path.join(__dirname)) is the root directory, 'public' is the directory that needs to be served
(gr): το express πρέπει να εξυπηρετεί τα στατικά αρχεία, (path.join(__dirname)) είναι το root directory, 'public' είναι το directory που πρέπει να εξυπηρετηθεί*/
app.use('/', express.static(path.join(__dirname, 'public')));
// sending homepage
app.get('/', (req, res) => {
    res.send("index.html")
});

/*(en): serves the file upload function, gives the right to upload files
(gr): εξυπηρετεί τη file upload συνάρτηση, δίνει το δικαίωμα μεταφόρτωσης αρχείων*/
app.use(fileUpload());

/*(en): "creating /extract_text" route, is the route which pdf-parse will invoke upon receiving a request from the user.
(gr): "δημιουργία /extract_text" route, είναι το route  το οποίο το pdf-parse θα καλέσει όταν λάβει ένα αίτημα από τον χρήστη.*/
app.post("/extract_text", (req, res) =>{
  if(!req.files.pdfFile){ //status 400 (bad HTTP request)
    res.status(400).end();
  }
  /*(en): pdf parse called and then the server sends the result text
  (gr):καλείται η pdf parse και στη συνέχεια ο διακομιστής στέλνει το κείμενο του αποτελέσματος*/
  pdfParse(req.files.pdfFile).then(result =>{
    res.send(result.text);
  });
});

//app.use(express.json()); //recognize the incoming Request Object as a JSON Object(body parser for post request except html)
//app.use(express.urlencoded({ extended: true }));//recognize the incoming Request Object as strings or arrays.(body parser for html)


/**(en): on this route dialogflow sends the webhook request
  * For the dialogflow we need post route.

  * (gr): το dialogflow στέλνει το αίτημα webhook
  * Για το dialogflow χρειαζόμαστε ένα post request*/

/*app.post("/webhook", (req, res) => {

  // get agent from request
  let agent = new dlf.WebhookClient({request: req, response: res});

  function movieIntent(agent) {
    agent.add("10 Things I hate about you, I heard is a really romantic movie");
    agent.add("In case you haven't watch it yet, Harry Potter is a classic one! If you've watched it then again you can always rewatch it!");
    agent.add("If you like musicals I would recommend Lala land");
    agent.add("I heard Spider-Man No way home is out.");
    agent.add("The Joker is a really good one!");
  }

  function randomIntent(agent) {
    agent.add("1");
    agent.add("5");
    agent.add("8");
    agent.add("10");
    agent.add("99");
  }

  // create intentMap for handling intents of agent
  let intent_map = new Map();

  // add intent map
  intentMap.set("chatbot-1-movie-pick", movieIntent);
  intentMap.set("chatbot-1-number", randomIntent);

  // agent handles request and passes intent map
  agent.handleRequest(intentMap);

});*/

//server listens on port and displays message and the port
app.listen(port);
console.log("Server running on port:" + port);
