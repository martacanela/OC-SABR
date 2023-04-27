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
  if (x.length === 0) return;
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (x.length === 1) return;
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("uploadBtn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("uploadBtn").style.display = "none";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function skipForm(elementoMarcado){
if (document.getElementById(elementoMarcado).checked){
  document.getElementById("nextBtn").style.display = 'none';
  document.getElementById('uploadBtn').style.display = 'inline';
  document.getElementsByName("circulitoPaso").forEach(function(a) {
    a.style.display = "none";
  })
}
else{
  document.getElementById("nextBtn").style.display = "inline";
  document.getElementById('uploadBtn').style.display = 'none';
  document.getElementsByName("circulitoPaso").forEach(function(a) {
    a.style.display = "inline-block";
  })
}
}

function nextPrev(n) {
// This function will figure out which tab to display
var x = document.getElementsByClassName("tab");
// Hide the current tab:
x[currentTab].style.display = "none";
// Increase or decrease the current tab by 1:
currentTab = currentTab + n;
// Otherwise:
// Check if the next tab is hidden due to not checking a primary tumor. If it is, adds or substracts the same step again; Otherwise, it remains the same.
currentTab += (x[currentTab].classList.contains('hidden')) ? n : 0; 
// Show next tab
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
  if (document.getElementById(labelElemento).checked) {
      document.getElementById(textoElemento).style.display = 'block';
  }
  else{
      document.getElementById(textoElemento).style.display = 'none';
  }
}

function mostrarDivs(labelElemento, divMostrar){
  console.log("document.getElementById(labelElemento).checked: ", document.getElementById(labelElemento).checked);
  if (document.getElementById(labelElemento).checked) {
    console.log("document.getElementsByClassName(divMostrar): ", document.getElementsByClassName(divMostrar));
    
    var elements = document.getElementsByClassName(divMostrar);
    for (var i = 0; i < elements.length; i++){
      console.log("document.getElementById(elements[i].id): ", document.getElementById(elements[i].id));
      document.getElementById(elements[i].id).style.display = 'block';
    }
      
  }
  else{
    var elements = document.getElementsByClassName(divMostrar);
    for (var i = 0; i < elements.length; i++){
      document.getElementById(elements[i].id).style.display = 'none';
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
    elements = document.getElementById(divADeshabilitar).getElementsByTagName('select');
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
    elements = document.getElementById(divADeshabilitar).getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++){
      document.getElementById(elements[i].id).disabled = false;
    }
  }
}


$('#QtA_completa').on('change', function () {
  if(this.value == "completada"){
      $("#fechaFinalizacionQT").show();
  } else {
      $("#fechaFinalizacionQT").hide();
  }
});
$('#ht_completa').on('change', function () {
  if(this.value == "completada_ht"){
      $("#fechaFinalizacionHT").show();
  } else {
      $("#fechaFinalizacionHT").hide();
  }
});
$('#rtna_completa').on('change', function () {
  if(this.value == "completada_rtna"){
      $("#fechaFinalizacionRT").show();
  } else {
      $("#fechaFinalizacionRT").hide();
  }
});
$('#it_completa').on('change', function () {
  if(this.value == "completada_it"){
      $("#fechaFinalizacionIT").show();
  } else {
      $("#fechaFinalizacionIT").hide();
  }
});
// Array de inputs invalidos
const invalidInputs = [];

// Añadir una alerta de enviamiento para comprobar validaciones. Si se quiere implementar el enviamiento, modificar / comentar este codigo
$('#regForm').on('submit', function(e) {
e.preventDefault();
document.getElementById('popup_container').classList.add('popup_showed');
})


// Para todos los inputs y selects invalidos al enviar el formulario:
$('input, select').on('invalid', function(e) {
e.preventDefault();
// Coger el div padre y añadirle una clase form_error en caso que no la tenga ya
let parentDiv = this.parentElement;

if ($(parentDiv).hasClass('form_error')) return;
$(parentDiv).addClass('form_error');

// Añadirlos al array de inputs invalidos
invalidInputs.push(this);

// Si es el primer input invalido, y hay más de un tab, deberá mostrarse ese tab para comenzar a arreglar los errores
if (invalidInputs.indexOf(this) === 0 && document.getElementsByClassName('tab').length != 0) {
  // Todos los tabs
  let allTabs = Array.from(document.getElementsByClassName('tab'));

  // Se busca el tab de este input / select recorriendo un bucle hasta encontrar un div que tenga por clase "tab"
  let thisTab = this.parentElement;
  while (!$(thisTab).hasClass('tab')) {
    thisTab = thisTab.parentElement;
  }
  
  // Coger el índice del tab dentro del array de tabs
  let thisTabIndex = allTabs.indexOf(thisTab);
  
  // Ocultar todos los tabs menos este
  for (let i = 0; i < allTabs.length; i++) {
    if (i === thisTabIndex) continue;
    allTabs[i].style.display = "none";
  }

  // Mostrar este tab
  currentTab = thisTabIndex;
  showTab(thisTabIndex);
}
});


// Cada vez que en un input o select haya un cambia, se quita la clase form_error del div padre
Array.from(document.querySelectorAll('input, select')).map(input => input.addEventListener('change', function() {
if (this.closest('.form_error')) this.closest('.form_error').classList.remove('form_error');
}));


// Constante para guardar todos los inputs con nombre cancerPrimario
const cancerPrimarioInputs = document.getElementsByName('cancerPrimario');
// Constante para guardar el tab de tumor primario
const tumorPrimarioTab = document.getElementById('tumorPrimarioTab');
// Constante para guardar el círculo del paso opcional
const circulitoPasoAMostrar = document.querySelector('.optionalStep');

const inputsDentroDelHiddenTab = document.querySelectorAll('#tumorPrimarioTab input, #tumorPrimarioTab select');
// Por cada input del cancer primario, se añade un addEventListener que, cuando haya un cambio en el input:
cancerPrimarioInputs.forEach(cpInput => cpInput.addEventListener('change', function() {
// Llamar a todos los metodos relacionados con mostrar el tab de cancerPrimario
cambiarVisibilidadDelHiddenTab(this);
mostrarDivCorrespondienteHiddenTab(this);
cambiarRequiredDeInputsDentroDelDivDelHiddenTab(this);

// Mostrar cirugia y tipo qta correspondiente
mostrarCirugiaCorrespondiente(this);
mostrarQtaCorrecto(this);
mostrarLocalizacionRadioterapiaCorrecta(this);

let inhibidoresCromatasaNeo = document.getElementById('inhibidoresDeLaCromatasaNeo');
let inhibidoresCromatasaAdy = document.getElementById('inhibidoresDeLaCromatasaAdy');
if (cpInput.id === 'cancerPrimarioMama') {
  mostrarDivsDeInputs('tipoHormonoterapiaNeoadyuvante');
  mostrarDivsDeInputs('tipoHormonoterapiaAdyuvante');
  inhibidoresCromatasaNeo.setAttribute('required', 'true');
  inhibidoresCromatasaAdy.setAttribute('required', 'true');
} else {
  esconderDivsDeInputs('tipoHormonoterapiaNeoadyuvante');
  esconderDivsDeInputs('tipoHormonoterapiaAdyuvante');
  inhibidoresCromatasaNeo.removeAttribute('required');
  inhibidoresCromatasaAdy.removeAttribute('required');
}
}));

// Funcion para buscar el div concreto de Mama, Pulmon, Prostata o Colorrectal dentro del hidden tab (Cancer primario)
function findDivDeHiddenTab (changedInput) {
// Con la id del div concreto y todos los divs del tab oculto, buscar el div concreto
let divId = `tumor${changedInput.id.slice(6)}`;
let divsTumoresPrimarios = Array.from(document.querySelectorAll('#tumorPrimarioTab > div'));
return divsTumoresPrimarios.find(div => div.id === divId);
}

// Funcion para ocultar o mostrar el hidden tab
function cambiarVisibilidadDelHiddenTab(changedInput) {
// Si se marca el input "otros", añadir clase hidden para ocultar el tab y ocultar el circulito del paso opcional 
if (changedInput.id === 'cancerPrimarioOtros__L' || changedInput.id === 'cancerPrimarioOtros__T') {
  tumorPrimarioTab.classList.add('hidden');
  circulitoPasoAMostrar.style.display = 'none';
// De lo contrario, mostrar ambos
} else {
  // Quite la classe hidden del tab del tumor primario
  tumorPrimarioTab.classList.remove('hidden');
  // Muestre el circulo del paso opcional
  circulitoPasoAMostrar.style.display = 'inline-block';
}
}

// Mostrar div concreto dentro del tab hidden (Mama, Pulmon, Prostata...) y ocultar los otros
function mostrarDivCorrespondienteHiddenTab(changedInput) {
// Si el input es "Otros", return
if (changedInput.id === 'cancerPrimarioOtros__L' || changedInput.id === 'cancerPrimarioOtros__T') return;
// Buscar el div del input marcado y todos los divs
let thisDiv = findDivDeHiddenTab(changedInput);
let divsTumoresPrimarios = Array.from(document.querySelectorAll('#tumorPrimarioTab > div'));
// Ocultar todos los divs y mostrar el actual
divsTumoresPrimarios.map(div => div.style.display = 'none');
thisDiv.style.display = 'block';
}

// Cambiar required de inputs dentro del div seleccionado del hidden tab
function cambiarRequiredDeInputsDentroDelDivDelHiddenTab (changedInput) {
// Quitar required de todos los inputs
inputsDentroDelHiddenTab.forEach(input => input.removeAttribute('required'));
// Si es "Otros", return
if (changedInput.id === 'cancerPrimarioOtros__L' || changedInput.id === 'cancerPrimarioOtros__T') return;
// Guardar el div del input marcado y los inputs y selects dentro del div del input marcado
let thisDiv = findDivDeHiddenTab(changedInput);
let inputsDeThisDiv = Array.from(thisDiv.querySelectorAll('input, select'));
// Inicializar una variable lastInput con el primer input como valor inicial, y:
let lastInput = inputsDeThisDiv[0];
for (let i = 0; i < inputsDeThisDiv.length; i++) {
  // Por cada input dentro de inputsDeThisDiv añadir un required, siempre y cuando no sean del mismo grupo (con el mismo name) que el lastInput o no sean required
  if (lastInput.name === inputsDeThisDiv[i].name || inputsDeThisDiv[i].classList.contains('no-required')) continue;
  inputsDeThisDiv[i].setAttribute('required', '');
  // Actualizar lastInput
  lastInput = inputsDeThisDiv[i];
}
// Ponerle required al primer input, pues no se actualiza
inputsDeThisDiv[0].setAttribute('required', '');
}


const checkboxCirugia = document.getElementById('m1Cirugia');

function mostrarCirugiaCorrespondiente(changedInput) {
let divsSeleccionados = document.querySelectorAll('.selected.divsCirugias');
let selectCirugia = document.getElementById('numeroCirugia');
let numero = selectCirugia ? parseInt(selectCirugia.value) : 1;

if (changedInput.id === 'cancerPrimarioOtros__L' || changedInput.id === 'cancerPrimarioOtros__T') {
  if (divsSeleccionados.length === 0) return;
  divsSeleccionados.forEach(divSeleccionado => {
    ocultarCirugia(divSeleccionado);
    document.getElementById('m1Cirugia_preguntas').style.display = 'none';
    checkboxCirugia.checked = false;
  })
  return;
}

if (divsSeleccionados.length === 0) {
  let divCirugiaCorrespondiente = document.getElementById(`${changedInput.id}Cirugia`);
  let inputsCirugia = divCirugiaCorrespondiente.querySelector('input');
  divCirugiaCorrespondiente.classList.add('selected');
  divCirugiaCorrespondiente.style.display = 'block';
  inputsCirugia.setAttribute('required', true);
  return;
}

divsSeleccionados.forEach(divSeleccionado => ocultarCirugia(divSeleccionado));

for (let i = 1; i <= numero; i++) {
  let index = i === 1 ? '' : `_${i}`;

  let divCirugiaCorrespondiente = document.getElementById(`${changedInput.id}Cirugia${index}`);
  let inputsCirugia = divCirugiaCorrespondiente.querySelector('input');

  divCirugiaCorrespondiente.classList.add('selected');
  divCirugiaCorrespondiente.style.display = 'block';
  inputsCirugia.setAttribute('required', true);
}
}

function ocultarCirugia(divCirugia) {
divCirugia.classList.remove('selected');
divCirugia.style.display = 'none';
divCirugia.querySelector('input').removeAttribute('required');
}


function mostrarQtaCorrecto(changedInput) {
  let divSelectQta = document.getElementById('qtaTipoDivSelect');
  let divCheckboxsQta = document.getElementById('qtaTipoDivCheckboxs');
  let divSelectQtna = document.getElementById('qtnaTipoDivSelect');
  let divCheckboxsQtna = document.getElementById('qtnaTipoDivCheckboxs');
  if (changedInput.id === 'cancerPrimarioMama') {
    divSelectQta.style.display = divSelectQtna.style.display = 'none';
    divCheckboxsQta.style.display = divCheckboxsQtna.style.display = 'block';
  } else {
    divSelectQta.style.display = divSelectQtna.style.display = 'block';
    divCheckboxsQta.style.display = divCheckboxsQtna.style.display = 'none';
  }
}


function esconderDivsDeInputs(idDiv) {
let divAEsconder = document.getElementById(idDiv);
divAEsconder.style.display = 'none';
}

function mostrarDivsDeInputs(idDiv) {
let divAMostrar = document.getElementById(idDiv);
divAMostrar.style.display = 'block';
}

function mostrarLocalizacionRadioterapiaCorrecta(changedInput) {
let divsLocalizacion = Array.from(document.getElementsByClassName('divsRTLocalizacion'));
let thisDivLocalizacion = document.getElementById(`${changedInput.id}RTLocalizacion`);

if (!thisDivLocalizacion) {
  divsLocalizacion.map(div => {
    div.querySelector('input').removeAttribute('required');
    div.style.display = 'none';
  });
  return;
};

let firstInputOfThisDiv = thisDivLocalizacion.querySelector('input');

divsLocalizacion.map(div => {
  div.querySelector('input').removeAttribute('required');
  div.style.display = 'none';
});

firstInputOfThisDiv.setAttribute('required', true);
thisDivLocalizacion.style.display = 'block';
}


// Inputs que tienen un desplegable (con clase dropdownGroup)
const inputsQueTienenDropdowns = document.querySelectorAll('.dropdownGroup');

// Funcion para cambiar el atributo required en los child inputs de los desplegables
function cambiarRequiredEnChildInputs() {
if (this.id === 'hormonoterapia' || this.id === 'hormonoterapiaAdyuvante') {
  let inhibidoresCromatasaNeo = document.getElementById('inhibidoresDeLaCromatasaNeo');
  let inhibidoresCromatasaAdy = document.getElementById('inhibidoresDeLaCromatasaAdy');
  if (document.getElementById('cancerPrimarioMama').checked) {
    inhibidoresCromatasaNeo.setAttribute('required', 'true');
    inhibidoresCromatasaAdy.setAttribute('required', 'true');
  } else {
    inhibidoresCromatasaNeo.removeAttribute('required');
    inhibidoresCromatasaAdy.removeAttribute('required');
  }
  return;
}

// Si la clase de el input cambiado contiene `idGroup`, siendo "id" el atributo id del propio input, guardar los inputs que contengan la clase `idDropdown`.
// En caso contrario, guardar los inputs con clase `nameDropdown`, siendo name el atributo name del grupo de inputs del input cambiado (Se usara `idDropdown` para
// los checkboxes y `nameDropdown` para los radiobuttons, pues todos los radio buttons de un grupo de inputs afecta a un desplegable, mientras que un solo checkbox afecta
// a un desplegable).
let childInputs = (this.classList.contains(`${this.id}Group`)) ? document.querySelectorAll(`.${this.id}Dropdown`) : document.querySelectorAll(`.${this.name}Dropdown`);
// Si tiene la clase "hasDropdown" y esta marcado, dar required a los child inputs
if (this.classList.contains('hasDropdown') && this.checked) {
  childInputs.forEach(input => input.setAttribute('required', ''));
// En caso contrario, quitar el required
} else {
  childInputs.forEach(input => input.removeAttribute('required'));
}
}

// Por todos los inputs que tienen desplegable, llamar a la funcion cambiarRequiredEnChildInputs cada vez que haya un cambio
inputsQueTienenDropdowns.forEach(input => input.addEventListener('change', cambiarRequiredEnChildInputs));


// Todos los inputs de tipo texto
const checkboxs = document.querySelectorAll('input[type=checkbox]');

// Funcion para activar o desactivar el required de un grupo de checkboxs segun si se ha marcado alguno de sus inputs
function cambiarRequiredEnCheckbox() {
// Grupo de checkboxs (conjunto de inputs) que tienen el mismo name que el actual
let checkboxGroup = Array.from(document.querySelectorAll(`input[type='checkbox'][name='${this.name}']`));
// Si hay un input marcado en el grupo de checkboxs actual y no es el primero (ya que es el required por defecto)
let elementoQueEstaMarcado = checkboxGroup.find(checkbox => checkbox.checked);
if (elementoQueEstaMarcado != null && elementoQueEstaMarcado != checkboxGroup[0]) {
  // Quitar el atributo remove del primer checkbox para que no se valide de forma incorrecta
  checkboxGroup[0].removeAttribute('required');
// En caso contrario, añadir el required
} else {
  checkboxGroup[0].setAttribute('required', '');
}
}

// Por cada cambio en un checkbox, llamar a la funcion cambiarRequiredEnCheckbox
checkboxs.forEach(checkbox => checkbox.addEventListener('change', cambiarRequiredEnCheckbox))


function mostrarCirugias() {
let divsCirugias = document.querySelectorAll('.divsCirugias');
divsCirugias.forEach(div => div.classList.contains('selected') ? div.style.display = 'block' : div.style.display = 'none');
}


const selectsNumeroDeTratamientos = Array.from(document.getElementsByClassName('selectNumero'));

selectsNumeroDeTratamientos.map(select => select.addEventListener('change', function () {
let numeroContainer = document.querySelector(`div.selectContainer:has(select#${this.id}) + div.numeroContainer`);
let template = numeroContainer.querySelector('div.template');
let newDiv = '';
let cantidad = parseInt(this.value);

numeroContainer.innerHTML = '';

for (let i = 1; i <= cantidad; i++) {
  let index = i === 1 ? '' : `_${i}`;

  newDiv = template.cloneNode(true);
  newDiv.style.display = 'block';
  
  let divsCirugias = Array.from(newDiv.querySelectorAll('.divsCirugias'));
  let labelsDeNewDiv = Array.from(newDiv.querySelectorAll('label'));
  let inputsYSelectsDeNewDiv = Array.from(newDiv.querySelectorAll('input, select'));

  divsCirugias.map(div => div.id = `${div.id}${index}`);
  
  labelsDeNewDiv.map(label => {
    label.htmlFor = `${label.htmlFor}${index}`;
    if (label.hasAttribute('id')) label.id = `${label.id}`;
  });

  inputsYSelectsDeNewDiv.map (input => {
    input.id = `${input.id}${index}`;
    if (input.hasAttribute('name')) input.name = `${input.name}${index}`;
  })

  numeroContainer.appendChild(newDiv);
}
}));


const radiosUbicacionCirugia = Array.from(document.querySelectorAll('input[name="ubicacionCirugia"]'));

function mostrarTipoCirugiaSegunUbicacion(changedInput) {
let divsCirugiaTipo = Array.from(document.getElementsByClassName('divsCirugiasTipo'));
let divAMostrar = divsCirugiaTipo.find(div => div.id === `${changedInput.id}DivCirugia`);
let divTipoCirugia = document.getElementById('divTipoCirugia');

if (changedInput.id === 'ubicacionCirugiaOtras__L' || changedInput.id === 'ubicacionCirugiaOtras__T') {
  divTipoCirugia.style.display = 'none';
  return;
}

divTipoCirugia.style.display = 'block';
divsCirugiaTipo.map(div => div.style.display = 'none');
divAMostrar.style.display = 'block';
}

radiosUbicacionCirugia.map(input => input.addEventListener('change', function() {
mostrarTipoCirugiaSegunUbicacion(this);
}));

function actualizarPreguntaRecaida(etapaSeleccionada) {
// Obtener la entrada de radio correspondiente a "1 mes post SABR"
const unMesPost = document.getElementById('unMesPost');

// Obtener el campo de la segunda pregunta
const preguntaRecaida = document.getElementById('recaidaPersistenca');
const fechaRecaidaCancerPrimario = document.getElementById('fechaRecaidaCancerPrimario');
const tratamientoRecaidaCancerPrimario = document.getElementById('tratamientoRecaidaCancerPrimario');
const fechaRecaidaGanglionar = document.getElementById('fechaRecaidaGanglionar');
const tratamientoRecaidaGanglionar = document.getElementById('tratamientoRecaidaGanglionar');
const fechaRecaidaM1 = document.getElementById('fechaRecaidaM1');
const tratamientoRecaidaM1 = document.getElementById('tratamientoRecaidaM1');
const recaidaNumeroM1 = document.getElementById('recaidaNumeroM1');


// Si "1 mes post SABR" está seleccionado, se quita la propiedad "required" de la segunda pregunta
if (etapaSeleccionada === unMesPost) {
  preguntaRecaida.removeAttribute('required');
  fechaRecaidaCancerPrimario.removeAttribute('required');
  tratamientoRecaidaCancerPrimario.removeAttribute('required');
  fechaRecaidaGanglionar.removeAttribute('required');
  tratamientoRecaidaGanglionar.removeAttribute('required');
  fechaRecaidaM1.removeAttribute('required');ç
  tratamientoRecaidaM1.removeAttribute('required');
  recaidaNumeroM1.removeAttribute('required');
} else {
  // De lo contrario, se agrega la propiedad "required" a la segunda pregunta
  preguntaRecaida.setAttribute('required', '');
  fechaRecaidaCancerPrimario.setAttribute('require', '');
  tratamientoRecaidaCancerPrimario.setAttribute('require', '');
  fechaRecaidaGanglionar.setAttribute('require', '');
  tratamientoRecaidaGanglionar.setAttribute('require', '');
  fechaRecaidaM1.setAttribute('require', '');
  tratamientoRecaidaM1.setAttribute('require', '');
  recaidaNumeroM1.setAttribute('require', '');
}
}

function mostrarSeccion() {
// Obtener el valor del radio button seleccionado
var num_veces = document.querySelector('.num_veces:checked').value;
console.log(num_veces);

// Obtener la sección que se mostrará múltiples veces
var seccion = document.querySelector('#seccionUbicacion');

// Remover cualquier sección clonada previamente
var secciones_clonadas = document.querySelectorAll('.seccion_clonada');
console.log(secciones_clonadas);
for (var i = 0; i < secciones_clonadas.length; i++) {
  secciones_clonadas[i].remove();
}

// Mostrar la sección el número de veces indicado
for (var i = 0; i < num_veces; i++) {
  var seccion_clonada = seccion.cloneNode(true);
  console.log(seccion_clonada);
  seccion_clonada.style.display = "block";
  seccion_clonada.classList.add('seccion_clonada');
  document.body.appendChild(seccion_clonada);

  document.getElementById("cloneSection").appendChild(seccion_clonada);
}
}


// Obtiene el menú desplegable y la sección de abajo
const numUbicacionesDropdown = document.getElementById('numUbicaciones');
const repeticionesUbicacionSection = document.querySelector('.repeticionesUbicacion');

// Agrega un evento onchange al menú desplegable
numUbicacionesDropdown.addEventListener('change', () => {
  // Obtiene el valor de la opción seleccionada
  const numUbicaciones = numUbicacionesDropdown.value;

  // Usa una estructura de control para mostrar/ocultar secciones
  switch(numUbicaciones) {
      case 'ubicacion1':
          repeticionesUbicacionSection.style.display = 'none';
          break;
      case 'ubicacion2':
          repeticionesUbicacionSection.style.display = 'block';
          document.getElementById('tacTab').style.display = 'block';
          document.getElementById('rmTab').style.display = 'none';
          document.getElementById('pecTacTab').style.display = 'none';
          break;
      case 'ubicacion3':
          repeticionesUbicacionSection.style.display = 'block';
          document.getElementById('tacTab').style.display = 'block';
          document.getElementById('rmTab').style.display = 'block';
          document.getElementById('pecTacTab').style.display = 'none';
          break;
      case 'ubicacion4':
          repeticionesUbicacionSection.style.display = 'block';
          document.getElementById('tacTab').style.display = 'block';
          document.getElementById('rmTab').style.display = 'block';
          document.getElementById('pecTacTab').style.display = 'block';
          break;
      case 'ubicacion5':
          repeticionesUbicacionSection.style.display = 'block';
          document.getElementById('tacTab').style.display = 'block';
          document.getElementById('rmTab').style.display = 'block';
          document.getElementById('pecTacTab').style.display = 'block';
          document.querySelector('#respuestaRadiologica').parentElement.style.display = 'block';
          break;
  }
});