/*(en): power up speech recognition, if speechrecognition or webkitspeechrecognition class exist in window then do the rest
(gr): ενεργοποιούμε τον έλεγχο για το αν υπάρχει το speechrecognition στο browser window, αν ναι τότε κάνε ότι υπάρχει μέσα στην if*/
if ("SpeechRecognition" || "webkitSpeechRecognition" in window) {
  /*(en): declare a variable SpeechRecognition
  (gr): δηλώνουμε μία μεταβλητή Speech Recognition*/
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  /*(en): then creating an instance object for speech recognition
  (gr): μετά δημιουργούμε μία περίπτωση για το SpeechRecognition*/
  const rec =  new SpeechRecognition();
  /*(en): then we declare the rest of the variables needed
  (gr): στην συνέχεια δηλώνουμε τις υπόλοιπες μεταβλητές που χρειάζονται*/
  //DOM Objects
  //(en): the buttons         (gr): τα κουμπάκια
  const start = document.querySelector("#start_btn");
  const stop = document.querySelector("#stop_btn");
  //(en): the status Messages     (gr): τα status μηνύματα
  const status_1 = document.querySelector("#display_status_1");
  const status_2 = document.querySelector("#display_status_2");
  //section 2 and sheet 1 of section 2
  var body_bg1 = document.querySelector(".u-section-2");
  var body_bg2 = document.querySelector(".u-section-2 .u-sheet-1");
  // (en): text for textarea      (gr): text για το text area
  const text = document.querySelector("#audio_text");
  /*(en): declare a global variable "content" as empty, it is needed for keeping what the app listens
  (gr): δεσμεύουμαι το "content" ως κενό, είναι μία μεταβλητή που στη συνέχεια θα κρατάει ότι ακούει η εφαρμογή*/
  var content = '';
  /*(en): disable interim results(simply didn't want to use it) and enable continuous(the 1st is for results in between listening and the 2nd for continuing listening until it is stopped by user)
  (gr): απενεργοποιούμε το interimResults (απλά δεν ήθελα να το χρησιμοποιήσω) και ενεργοποιούμε το continuous(το 1ο είναι για τα αποτελέσματα μεταξύ των ακροάσεων και το 2ο για την ακρόαση μέχρι να σταματήσει ο χρήστης)*/
  rec.interimResults = false;
  rec.continuous = true;
  // Event Listeners-Methods
  /*(en): creating event listeners for start and stop button...when clicked start speech recognition and stop speech recognition
  (gr): Δημιουργία event listeners για το κουμπί έναρξης και παύσης... όταν πατηθούν ξεκινά η αναγνώριση ομιλίας και σταματά η αναγνώριση ομιλίας*/
  start.addEventListener('click',() => {
    rec.start();
  });
  stop.addEventListener('click',() => {
    rec.stop();
  });
  //Adding events
  /*(en): when speech recognition starts display message status1 inline...if there is content delete it, change colors of bg animation
  (gr): όταν ξεκινάει να ηχογραφεί εμφανίζει μήνυμα status1...αν υπάρχει text μέσα στο content το διαγράφει, αλλαγή χρωμάτων του bg animation*/
  rec.onstart = function() {
    status_1.style.display = "inline" ;
    status_1.style.marginTop = "100px";
    status_1.style.fontSize = "x-large";
    body_bg1.style.background = `linear-gradient(#332929ba, #404040)`;
    body_bg2.style.background = `linear-gradient(#33292900, #404040)`;
    if (content.length){
      content = '';
    }
  };
  /*(en): when speech recognition ends stop displaying message status1...animation back to default
  (gr): στο τέλος σταματάει να εμφανίζει το μήνυμα status1...animation πίσω στην προεπιλογή*/
  rec.onspeechend = function() {
    status_1.style.display = "none";
    body_bg1.style.background = `linear-gradient(#ffff, #404040)`;
    body_bg2.style.background = `linear-gradient(#ffff, #404040)`;
  };
  /*(en): when speech recognition error  display message status2 inline
  (gr): σε σφάλμα εμφανίζει το μήνυμα status2*/
  rec.onerror = function() {
    status_2.style.display = "inline"
    status_2.style.marginTop = "100px";
    status_2.style.fontSize = "x-large";
    body_bg1.style.background = `linear-gradient(#ffff, #404040)`;
    body_bg2.style.background = `linear-gradient(#ffff, #404040)`;
  }
  /*(en): on event on result do function(event) where...
  (gr): στο event αποτέλεσμα εκτελούμε συνάρτηση event όπου...*/
  rec.onresult = function(event) {
    /*(en): transcript is a variable that equals to event.results (is an object that represents all final results for certain speaking session...here is a continuous speech(means till the user stops it)),
    event.resultIndex(is an index that represents a result object at the last position in the speech session),
    [0].transcript(is for SpeechRecognitionAlternative.transcript at 0 position, means that it returns a string that contains the transcript of recognised words including whitespaces when needed)
    (gr): transcript είναι μία μεταβλητή που ισούται με event.results (είναι ένα αντικείμενο που αντιπροσωπεύει όλα τα τελικά αποτελέσματα για συγκεκριμένη συνεδρία ομιλίας...εδώ έχουμε συνεχή ομιλία(μέχρι να την σταματήσει ο χρήστης)),
    event.resultIndex(είναι ένας δείκτης που αντιπροσωπεύει ένα result object στην τελευταία θέση της συνεδρίας ομιλίας),
    [0].transcript(είναι για το SpeechRecognitionAlternative.transcript στη θέση 0, σημαίνει ότι επιστρέφει μια συμβολοσειρά που περιέχει τo κείμενο των αναγνωρισμένων λέξεων, συμπεριλαμβανομένων των κενών όταν χρειάζεται)*/
    var transcript = event.results[event.resultIndex][0].transcript;
    content = content + transcript;
    /*(en): we update the value of constant variable text, equals to content
    (gr): ενημερώνουμε το value της const μεταβλητής text, να ισούται με το content*/
    text.value = content;
  }
  /*(en): else speech recognition api not supported by browser so display alert message
  (gr): αλλιώς το speech recognition δεν υποστηρίζετε από τον browser όποτε εμφανίζει μήνυμα*/
} else {
  alert("Speech Recognition Not Supported!")
}
