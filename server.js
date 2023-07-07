/*(en): load required dependencies
(gr): φορτώστε τις απαιτούμενες εξαρτήσεις*/
const express = require("express");//(en): need to create the server (gr): χρειάζεται για τη δημιουργία του διακομιστή
const fileUpload = require ("express-fileupload");//(en): need for uploading files on server  (gr): χρειάζεται για τη μεταφόρτωση αρχείων στο διακομιστή
const pdfParse = require("pdf-parse");//(en): need for extracting text from pdf  (gr): ανάγκη για εξαγωγή κειμένου από pdf
const fileSaver = require("file-saver");//(en): need to save a txt file  (gr): για αποθήκευση αρχείου txt
const path = require("path");// The path
require("dotenv").config();// need for enironment variables

/*(en):create the server and define the port that it runs on
(gr): δημιουργία του διακομιστή και ορισμός της θύρας στην οποία τρέχει*/
const app = express();
const port = process.env.PORT;

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


//server listens on port and displays message and the port
app.listen(port);
console.log("Server running on port:" + port);
