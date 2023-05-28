// Prevenimos el comportamiento por defecto de envío de formulario. Aquí se añadirá AJAX.
$('#contactForm').on('submit', function(e) {
    e.preventDefault();
})

// Cuando el estado del checkbox cambie, revisa si esta marcado; En caso de estarlo, habilita el botón de enviar
$('#privacyPoliticsCB').on('change', function() {
    $(this).is(':checked') ? $('#submitBtn').prop('disabled', false) : $('#submitBtn').prop('disabled', true);
})

// Cuando escribimos algo y luego clicamos fuera de estos campos (nombre y mensaje):
$('#nameInput, #messageInput').blur(function(e) {
    // Comprobamos si son válidos
    e.target.checkValidity();
// En caso de ser inválidos:
}).bind('invalid', function(e) {
    // Prevenimos comportamiento por defecto
    e.preventDefault();
    // Controlamos que no haya ya un mnensaje de error: Si no lo hay, muestra un mensaje y añade una clase de 'error' 
    // para cambiar los estilos, con el texto correspondiente
    if (!$(this).next().hasClass('error')) $(this).after('<p class="error">This field is required</p>')
// Si se vuelve a escribir texto:
}).on('focus', function(e) {
    // Comprobamos si hay un mensaje de error: En caso de haberlo, lo borramos
    if ($(this).next().hasClass('error')) $(this).next().remove();
});

// Cuando escribimos algo y luego clicamos fuera de este campo (email):
$('#emailInput').blur(function(e) {
    // Comprobamos si es válido
    e.target.checkValidity();
// En caso de ser inválido:
}).bind('invalid', function(e) {
    // Prevenimos comportamiento por defecto
    e.preventDefault();
    // Controlamos que no haya ya un mnensaje de error. Si no lo hay:
    if (!$(this).next().hasClass('error')) {
        // Comprobamos cual es el error. Si el input esta vacío:
        if ($(this).val() === '') {
            // Avisamos de que es obligatorio
            $(this).after('<p class="error">This field is required</p>')
        // En caso contrario, si hay texto pero es con formato incorrecto
        } else {
            // Mostramos su formato correcto
            $(this).after('<p class="error">Incorrect format: name@domain.com</p>')
        }
    }
// Si se vuelve a escribir texto:
}).on('focus', function(e) {
    // Comprobamos si hay un mensaje de error: En caso de haberlo, lo borramos
    if ($(this).next().hasClass('error')) $(this).next().remove();
})