const value = document.getElementById('value');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const resetButton = document.getElementById('reset');

const updateValue = () => {
    value.innerText = count;
};

let count = 0;
let interval = 0;

plusButton.addEventListener('mousedown', () => {
    interval = setInterval(() => {
        count++;
        updateValue();
    }, 100);

});

minusButton.addEventListener('mousedown', () => {
    interval = setInterval(() => {
        count--;
        updateValue();
    }, 100);

});

document.addEventListener('mouseup', () => clearInterval(interval));

resetButton.addEventListener('click', () => {
    count = 0;
    updateValue();
});