const passInput = document.querySelector("#inputPasswordId");
const lenInput = document.querySelector("#inputLengthId");
const infoLength = document.querySelector('label[for="inputLengthId"]');
const btnGerar = document.querySelector("#btnGerar");

const chkLower = document.querySelector("#chkLowerId");
const chkUpper = document.querySelector("#chkUpperId");
const chkNumber = document.querySelector("#chkNumberId");
const chkSymbols = document.querySelector("#chkSymbolsId");

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%"];

//Gera um Array com todas letras do alfabeto no formato ASCII ontem a = 97
const caracters = Array.from(Array(26)).map((_, i) => i + 97);
//Atribui o valor de ASCII ao caraceter correto minusculo, ex = 97 = a
const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
//Atribui o valor de ASCII ao caraceter correto maiusculo, ex = 97 = A
const UppercaseCaracters = LowercaseCaracters.map((item) => item.toUpperCase());

infoLength.innerHTML = lenInput.value;

lenInput.addEventListener("change", () => {

    infoLength.innerHTML = lenInput.value;
});

btnGerar.addEventListener("click", () => {

    generatePassword(

        chkNumber.checked,
        chkSymbols.checked,
        chkLower.checked,
        chkUpper.checked,
        lenInput.value
    );
});

const generatePassword = (

    hasNumbers,
    hasSymbols,
    hasLowercase,
    hasUppercase,
    lenght

) => {

    const newArray = [

        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
        ...(hasLowercase ? LowercaseCaracters : []),
        ...(hasUppercase ? UppercaseCaracters : []),
    ];

    if (newArray.length === 0) return;

    let password = "";

    for (let i = 0; i < lenght; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        password += newArray[randomIndex];
    }

    passInput.value = password;
};