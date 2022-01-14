/*(en):Creating a Text-to-speech application using SpeechSynthesis Web API...check if speechSynthesis is supported in browser if yes power up speechSynthesis
(gr):Δημιουργία εφαρμογής  Text-to-speech με τη χρήση του SpeechSynthesis API...τσέκαρε αν το speechSynthesis υποστηρίζεται από τον browser αν ναι ενεργοποίησε το */
if ('speechSynthesis' in window) {
  const synthesize = window.speechSynthesis;
  /*(en):DOM objects required
  (gr):DOM objects που χρειάζονται*/
  //textarea
  const input_text = document.querySelector("#input_text_pdf");
  //(en): pitch and rate        (gr):Τονικό Ύψος και Ταχύτητα
  const pitch_value = document.querySelector("#pitch_value");
  const pitch = document.querySelector("#pitch");
  const rate_value = document.querySelector("#rate_value");
  const rate = document.querySelector("#rate");
  //(en): voice_list        (gr): λίστα φωνών
  var voices_list = document.querySelector("#voice_list");
  //section 1 and sheet 1 of section 1
  const body_bg1 = document.querySelector(".u-section-1");
  const body_bg2 = document.querySelector(".u-section-1 .u-sheet-1");
  //(en): buttons   (gr): κουμπιά
  const start = document.querySelector("#start");
  const pause = document.querySelector("#pause");
  const stop = document.querySelector("#cancel");

  /*(en):The createVoiceList function creates a list with the Browser voices available, the getVoices returns all
  the available voices on my device along with the Browser voices.

  (gr):H createVoiceList συνάρτηση δημιουργεί μία λίστα με φωνές που διαθέτει ο Browser, η getVoices επιστρέφει και
  τις φωνές που έχουμε κατεβασμένες στην συσκευή μας μαζί με τις υπόλοιπες φωνές που υποστηρίζει ο Browser.*/
  var voices = [];
  function createVoiceList() {
    voices = synthesize.getVoices();
    /*(en): loop for every voice
      (gr): επανάληψη για κάθε φωνή*/
    voices.forEach(voice => {
      /*(en):Creating a voice list with specific voices...If we want every voice available then simply delete if{} within the function.
      (gr):Δημιουργία μιας λίστας φωνών με συγκεκριμένες φωνές... Αν θέλουμε όλες τις διαθέσιμες φωνές τότε απλά διαγράφουμε το if{} μέσα στη συνάρτηση.*/
      if (voice.lang == 'en-US' || voice.lang == 'en-GB' || voice.lang == 'en-AU' || voice.lang == 'en-CA' || voice.lang == 'en-IE' || voice.lang == 'el-GR'){
        /*(en): Creating option variable...setting name and lang attributes
        (gr): Δημιουργία μεταβλητής option...θέτουμε name και lang attributes*/
        const option = document.createElement("option");
        option.textContent = voice.name + '(' + voice.lang + ')';

        option.setAttribute('name', voice.name);
        option.setAttribute('lang', voice.lang);

        /*(en): the voice_list gets every option object
        (gr): η κλάση voice_list παίρνει κάθε option object*/
        voices_list.appendChild(option);
      };
    });
  };
  createVoiceList();

  /*(en): the event gets triggered when voices that returned by getVoices changed(due to the browser or other issues)
  (gr): ενεργοποιείται όταν οι φωνές που επιστρέφονται από το getVoices αλλάζουν (λόγω του browser ή άλλων ζητημάτων)*/
  if (synthesize.onvoiceschanged !== undefined) {
    synthesize.onvoiceschanged = createVoiceList;
  }
  /*(en): create a speak_the_speech function where it contains the events that happen during the speaking
  (gr): δημιουργία συνάρτηση speak_the_speech όπου περιέχει τα γεγονότα που συμβαίνουν κατά τη διάρκεια της ομιλίας*/
  const speak_the_speech = function(){
    // if it speaks then return
    if(synthesize.speaking) {
        return;
    };
    // if input_text is not '' then...
    if(input_text !==''){

      /*(en): variable (utterThis) is a new speech request for input_text.value(should contain voice, pitch and rate info)
      (gr): μεταβλητή (utterThis) είναι ένα νέο αίτημα ομιλίας για το input_text.value (θα πρέπει να περιέχει πληροφορίες για τη φωνή, το ύψος και το ρυθμό)*/
      const utterThis = new SpeechSynthesisUtterance(input_text.value);
      
      /*(en): adding animation while text is "playing" to give a better experience to user
        (gr): προσθέτω animation καθώς "παίζει" το μήνυμα ώστε ο χρήστης να έχει καλύτερη εμπειρία*/
      body_bg1.style.background = `linear-gradient(#332929ba, #404040)`;
      body_bg2.style.background = `linear-gradient(#33292900, #404040)`;

      /*(en): when event ends...back to default animation
      (gr): όταν το συμβάν τελειώνει...επιστροφή στο προεπιλεγμένο animation*/
      utterThis.onend = function(event){
        body_bg1.style.background = `linear-gradient(#ffff, #404040)`;
        body_bg2.style.background = `linear-gradient(#ffff, #404040)`;
      };
        /*(en): variable that gets name of the voice that user chooses from the voice list
        (gr): μεταβλητή που παίρνει το όνομα της φωνής που επιλέγει ο χρήστης από τη λίστα φωνών*/
        const select_voice = voices_list.options[voices_list.selectedIndex].getAttribute('name');

        /*(en): for loop voice in voices...if voice.name is strickly same as select voice(which is the variable above) then...
        (gr): επανάληψη για κάθε φωνή...αν το όνομα είναι αυστηρά ίδιο με τη μεταβλητή select_voice τότε...*/
        voices.forEach(voice => {
          if (voice.name === select_voice){
            utterThis.voice = voice; // utterThis.voice attribute gets that voice   
          };
        });
        utterThis.pitch = pitch_value.value;// same with pitch 
        utterThis.rate = rate_value.value; //  same with rate

        synthesize.speak(utterThis); //speak utterThis
      };
    };
  /* (en): when start button is pressed(trigger an event)
  (gr): όταν πατιέται το κουμπί start trigger ένα γεγονός*/
  start.addEventListener('click', event =>{

    /* (en): add an if to check if the speaking is paused then resume(the start button starts event that "reads" the text and also resumes from where it stopped if "reading" was paused)
    (gr): προσθήκη if για να τσεκάρει αν η ομιλία είναι σε παύση τότε αν ξαναπατηθεί το κουμπί start συνέχισε από εκεί που είχε γίνει η παύση*/
    if (synthesize.paused){
      synthesize.resume();
    }

    event.preventDefault(); 
    speak_the_speech(); //speaks the text value 
    input_text.blur(); 
  });
  // same with pause button but it triggers pause when clicked and animation back to default
  pause.addEventListener('click', () =>{
    body_bg1.style.background = `linear-gradient(#ffff, #404040)`;
    body_bg2.style.background = `linear-gradient(#ffff, #404040)`;
    synthesize.pause();
  });
  // same with stop button but it triggers cancel when clicked and animation back to default
  stop.addEventListener('click', () =>{
    body_bg1.style.background = `linear-gradient(#ffff, #404040)`;
    body_bg2.style.background = `linear-gradient(#ffff, #404040)`;
    synthesize.cancel();
  });

  //create Event Listeners for pitch and rate

  /*(en): change pitch and rate value, change pitch and rate label
  (gr): αλλαγή τιμής τονικού ύψους και ταχύτητας, καθώς και αλλαγή ετικέτας*/
  pitch_value.addEventListener('change', () => {
    pitch.textContent = pitch_value.value;
  });

  rate_value.addEventListener('change', () => {
    rate.textContent = rate_value.value;
  });
//
} else{                                                   // else alert with message
  alert('Speech Synthesis is not supported by browser.');
};
