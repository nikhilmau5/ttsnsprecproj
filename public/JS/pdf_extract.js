  // DOM objects that are needed
  const upload_btn = document.getElementById("pdf");
  const pdf_inp = document.getElementById("pdf_inp");
  const display_pdf = document.getElementById("input_text_pdf");
  
  // when upload_btn clicked that triggers event...
  upload_btn.addEventListener("click", () =>{
    const form_data = new FormData(); 

    form_data.append("pdfFile", pdf_inp.files[0]); // adding HTML file input chosen by user(pdfFile(key) and the input(value))
    if (!pdf_inp.files[0]){     // if there is not a pdf input and upload button gets pressed then.... 
      alert("Pdf file was not uploaded, please upload a pdf file"); // alert with a message
    }else{
      let options = {method: "POST", body: form_data} //array of properties
      fetch("/extract_text", options    //fetch the route /extract_text that we created in our server and options
      ).then(response =>{
          return response.text(); 
        }).then(data =>{
            display_pdf.value = data;  // returns extracted text in textarea
          });   
    };
  }); 

