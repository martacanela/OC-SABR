$('.habToxicos :checkbox').change(function () {
    var $cs = $(this).closest('.habToxicos').find(':checkbox:checked');
    if ($cs.length > 3) {
        this.checked = false;
    }
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Subir";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function skipForm(elementoMarcado){
  if (document.getElementById(elementoMarcado).checked){
    document.getElementById("nextBtn").innerHTML = "Subir";
    document.getElementsByName("circulitoPaso").forEach(function(a) {
      a.style.display = "none";
    })
  }
  else{
    document.getElementById("nextBtn").innerHTML = "Siguiente";
    document.getElementsByName("circulitoPaso").forEach(function(a) {
      a.style.display = "inline-block";
    })
  }

}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");

  //Si es 'Acompañante' todas las preguntas requeridas tienen que dejar de serlo y se tiene que subir el form cuando le de a subir

  if (document.getElementById("acomp").checked){
    //Quitar preguntas requeridas a partir de aquí
    eliminarAtributoRequerido("pacienteAcomp");
    //Validar formulario
    if (validateForm()){
      document.getElementById("regForm").submit();
      alert("Hello. El formulario se ha subido correctamente");
    }
    else{
      alert("Hello. Faltan campos por rellenar");
    }
    return true;
  }
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    alert("Hello. El formulario se ha subido correctamente");

    //return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function eliminarAtributoRequerido(nomElem){
  var elementosRequeridos = document.querySelectorAll("[required]");
  var borrarApartir = false;
  for (var elemento of elementosRequeridos){
    if(elemento.name == nomElem && !borrarApartir){
      borrarApartir = true;
    }
    if (borrarApartir){
      if(elemento.required){
        elemento.removeAttribute("required");
      }
    }
  }
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].querySelectorAll("[required]");

    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if(y[i].type === "radio" || y[i].type === "checkbox"){
          let radioValueCheck = false;
          document.getElementById("regForm").querySelectorAll(`[name=${y[i].name}]`).forEach(function(r) {
            if (r.checked) radioValueCheck = true;
          })
          if (radioValueCheck == false){console.log("y[i].className: ", y[i].className); y[i].className += " invalid"; valid = false;}
        }
        else{
          if (y[i].checkValidity() == false) {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
          }
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function otrosAparece(labelElemento, textoElemento){
  console.log(document.getElementById(labelElemento).checked);
  if (document.getElementById(labelElemento).checked) {
      document.getElementById(textoElemento).style.display = 'block';
  }
  else{
      document.getElementById(textoElemento).style.display = 'none';
  }
}

function otrosApareceYDeshabilita(labelElemento, textoElemento){
  if (document.getElementById(labelElemento).checked) {
      document.getElementById(textoElemento).style.display = 'block';
      var elements = document.getElementById(textoElemento).getElementsByTagName('input');;
      for (var i = 0; i < elements.length; i++){
        if (document.getElementById(elements[i].id).required == false){
          document.getElementById(elements[i].id).setAttribute('required', "");
        }
      }
  }
  else{
      document.getElementById(textoElemento).style.display = 'none';
      var elements = document.getElementById(textoElemento).getElementsByTagName('input');

      for (var i = 0; i < elements.length; i++){
        if (document.getElementById(elements[i].id).required == true){
          document.getElementById(elements[i].id).removeAttribute('required');
        }
      }

  }
}

function deshabilita(elementoMarcado, divADeshabilitar){
  if(document.getElementById(elementoMarcado).checked){
    var elements = document.getElementById(divADeshabilitar).getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++){
      document.getElementById(elements[i].id).disabled = true;
      if (document.getElementById(elements[i].id).checked){
        document.getElementById(elements[i].id).checked = false;
      }
    }
  }
  else{
    var elements = document.getElementById(divADeshabilitar).getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++){
      document.getElementById(elements[i].id).disabled = false;
    }
  }
}