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
        calcular();
        primeiroNumero = parseFloat(numeroAtual.replace(",", "."));
        numeroAtual = "";
    }

    operador = novaOperacao;
    atualizarResultado();
}

function calcular() {
    if (operador === null || primeiroNumero === null) return;
    let segundaOperacao = parseFloat(numeroAtual.replace(",", "."));
    let valorResultado;

    switch (operador) {
        case "+":
            valorResultado = primeiroNumero + segundaOperacao;
            break
        case "-":
            valorResultado = primeiroNumero - segundaOperacao;
            break
        case "×":
            valorResultado = primeiroNumero * segundaOperacao;
            break
        case "÷":
            valorResultado = primeiroNumero / segundaOperacao;
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
    //valorPorcentagem = null;
    atualizarResultado();

}

function limparCalculadora() {
    numeroAtual = "";
    primeiroNumero = null;
    operador = null;
    atualizarResultado();
}

function calcularPorcentagem() {
    let resultado = parseFloat(numeroAtual) / 100;

    if (["+", "-"].includes(operador)) {
        resultado = resultado * (primeiroNumero || 1);
    }

    if (resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5).toString();
    }

    numeroAtual = resultado.toString();
    atualizarResultado();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            adicionarDigito(buttonText);
        } else if (["+", "-", "×", "÷"].includes(buttonText)) {
            fazerOperacao(buttonText); // Call fazerOperacao with the operator
        } else if (buttonText === "=") {
            calcular();
        } else if (buttonText === "C") {
            limparCalculadora();
        } else if (buttonText === "±") {
            numeroAtual = (
                parseFloat(numeroAtual || primeiroNumero) * -1
            ).toString();
            atualizarResultado();
        }
    });
});
