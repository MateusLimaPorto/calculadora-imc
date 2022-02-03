let altura = document.getElementById('altura');
let peso = document.getElementById('peso');
let tituloResultado = document.getElementById('tituloResultado');
let resultado = document.getElementById('resultado');

setInputFilter(document.getElementById("altura"), function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

setInputFilter(document.getElementById("peso"), function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

document.getElementById('submit').addEventListener('click', validarFormulario);

function validarFormulario() {
  if (altura.value == '' || peso.value == '') {

    alert('Por favor para realizar o cálculo. Preencha todos os campos altura e peso!');
    limparFormulario();

  } else {
    verificaIMC();
  }
}

function limparFormulario() {

  tituloResultado.innerHTML = '';
  resultado.innerHTML = '';
  altura.focus();

}

function verificaIMC() {

  let imc = calcularIMC(peso.value, altura.value);

  let result = '';

  if (imc < 18.5) {
    result = 'Magreza';
  } else if (18.5 <= imc && imc <= 24.9) {
    result = 'Normal';
  } else if (24.9 <= imc && imc <= 30) {
    result = 'Sobrepeso';
  } else if (imc > 30) {
    result = 'Obesidade';
  }

  tituloResultado.innerHTML = result;
  resultado.innerHTML = 'IMC: ' + parseFloat(imc).toFixed(2) + ' kg/m²';

}

function calcularIMC(peso, altura) {

  return Number(peso) / (((Number(altura) / 100) * Number(altura)) / 100);

}


function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}