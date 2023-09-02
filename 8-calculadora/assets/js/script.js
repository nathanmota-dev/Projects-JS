const resultado = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons button');

let numeroAtual = "";
let primeiroNumero = null;
let operador = null;
let reiniciar = false;

function atualizarResultado(originClear = false) {
    resultado.innerHTML = originClear ? 0 : numeroAtual.replace(".", ",");
}

function adicionarDigito(digito) {
    if (digito === ',' && (numeroAtual.includes(",") || !numeroAtual))
        return;

    if (reiniciar) {
        numeroAtual = digito;
        reiniciar = false;
    } else {
        numeroAtual += digito;
    }

    atualizarResultado();
}

function fazerOperacao(novaOperacao) {
    if (numeroAtual) {
        primeiroNumero = parseFloat(numeroAtual.replace(",", "."));
        numeroAtual = "";
    }

    operador = novaOperacao;
}

function calcular() {
    if (operador === null || primeiroNumero === null) return;
    let segundaOperacao = parseFloat(numeroAtual.replace(",", "."));
    let valorResultado;

    switch (operador) {
        case "+":
            resultValue = primeiroNumero + segundaOperacao;
            break
        case "-":
            resultValue = primeiroNumero - segundaOperacao;
            break
        case "×":
            resultValue = primeiroNumero * segundaOperacao;
            break
        case "÷":
            resultValue = primeiroNumero / segundaOperacao;
            break
        default:
            return;
    }

    if (valorResultado.toString().split(".")[1]?.length > 5) {
        numeroAtual = parseFloat(valorResultado.toFixed(5)).toString();
    } else {
        numeroAtual = valorResultado.toString();
    }

    operador = null;
    primeiroNumero = null;
    reiniciar = true;
    //
    atualizarResultado();

}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            adicionarDigito(buttonText);
        }
    });
});