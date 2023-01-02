function otrosAparece(){
    console.log(document.getElementById('otras').checked);
    if (document.getElementById('otras').checked) {
        document.getElementById('ubicacionOtras').style.display = 'block';
    }
    else{
        document.getElementById('ubicacionOtras').style.display = 'none';
    }
}
function formSubido(){
    alert("The form was submitted");
}