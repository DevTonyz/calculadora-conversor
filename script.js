// Variáveis da calculadora
var elementoResultado = document.getElementById('resultado');
var numeroAtual = '';
var operador = '';
var primeiroNumero = '';
var elementoHistorico = document.getElementById('historico');
var resultadoExibido = false; // Adiciona um estado para rastrear se um resultado foi calculado
var maxItensHistorico = 10; // Define o limite de itens no histórico

// Função para limpar o resultado
function limparResultado() {
    elementoResultado.value = '';
    numeroAtual = '';
    operador = '';
    primeiroNumero = '';
    resultadoExibido = false; // Reseta o estado quando o resultado é limpo
}

// Função para atualizar o número atual
function adicionarNumero(numero) {
    if (resultadoExibido) { // Limpa o input se um resultado foi calculado
        elementoResultado.value = '';
        numeroAtual = '';
        resultadoExibido = false;
    }
    numeroAtual += numero;
    elementoResultado.value = numeroAtual;
}

// Função para atualizar o operador
function adicionarOperador(op) {
    if (numeroAtual === '') return;
    if (operador !== '') calcularResultado();
    operador = op;
    primeiroNumero = numeroAtual;
    numeroAtual = '';
}

// Função para calcular o resultado
function calcularResultado() {
    if (primeiroNumero === '' || numeroAtual === '' || operador === '') return;
    var num1 = parseFloat(primeiroNumero);
    var num2 = parseFloat(numeroAtual);
    var resultado = 0;

    switch(operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
    }

    adicionarAoHistorico(`${num1} ${operador} ${num2} = ${resultado}`);
    elementoResultado.value = resultado;
    numeroAtual = resultado.toString();
    operador = '';
    primeiroNumero = '';
    resultadoExibido = true; // Define o estado como verdadeiro quando um resultado é calculado
}

// Função para adicionar uma entrada ao histórico
function adicionarAoHistorico(entrada) {
    if (elementoHistorico.childElementCount >= maxItensHistorico) {
        elementoHistorico.removeChild(elementoHistorico.lastChild);
    }

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(entrada));
    elementoHistorico.insertBefore(li, elementoHistorico.firstChild);
}

// Event listener para capturar a tecla Enter e calcular o resultado
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calcularResultado();
    } else if (event.key >= '0' && event.key <= '9') {
        adicionarNumero(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        adicionarOperador(event.key);
    }
});

// Variáveis para armazenar os elementos dos campos de temperatura
var entradaCelsius = document.getElementById('celsius');
var entradaFahrenheit = document.getElementById('fahrenheit');
var entradaKelvin = document.getElementById('kelvin');

// Função para limpar os campos de temperatura
function limparCamposTemperatura(excetoCampo) {
    if (excetoCampo !== 'celsius') entradaCelsius.value = '';
    if (excetoCampo !== 'fahrenheit') entradaFahrenheit.value = '';
    if (excetoCampo !== 'kelvin') entradaKelvin.value = '';
}

// Função para converter temperaturas
function converterTemperatura() {
    var celsius = parseFloat(entradaCelsius.value);
    var fahrenheit = parseFloat(entradaFahrenheit.value);
    var kelvin = parseFloat(entradaKelvin.value);

    if (!isNaN(celsius)) {             //!isNaN verifica se contém um valor numérico valido
        entradaFahrenheit.value = (celsius * 9/5 + 32).toFixed(2);
        entradaKelvin.value = (celsius + 273.15).toFixed(2);
    } else if (!isNaN(fahrenheit)) {
        entradaCelsius.value = ((fahrenheit - 32) * 5/9).toFixed(2);
        entradaKelvin.value = (((fahrenheit - 32) * 5/9) + 273.15).toFixed(2);
    } else if (!isNaN(kelvin)) {
        entradaCelsius.value = (kelvin - 273.15).toFixed(2);
        entradaFahrenheit.value = ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
    }
}

// Função para limpar os campos do conversor de temperatura
function limparCampos() {
    entradaCelsius.value = '';
    entradaFahrenheit.value = '';
    entradaKelvin.value = '';
}

// Adicionar event listeners aos campos de entrada para limpar os outros campos
entradaCelsius.addEventListener('input', function() {
    limparCamposTemperatura('celsius');
});
entradaFahrenheit.addEventListener('input', function() {
    limparCamposTemperatura('fahrenheit');
});
entradaKelvin.addEventListener('input', function() {
    limparCamposTemperatura('kelvin');
});
