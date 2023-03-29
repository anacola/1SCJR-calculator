// const display = document.getElementById('displayyy');
const display = document.querySelector("#display");
const keys = document.querySelectorAll("[id*=tecla]");
const operators = document.querySelectorAll("[id*=operador]");

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(number) {
    if (newNumber) {
        display.textContent = number;
        newNumber = false;
    } else {
        display.textContent += number;
    }
};

const insertNumber = (number) => updateDisplay(number);

keys.forEach(function (key) {
    key.addEventListener("click", function (event) {
        insertNumber(event.target.textContent);
    })
});

const selectOperator = (event) => {
    previousNumber = display.textContent.replace(",",".");
    operator = event.target.textContent;
    newNumber = true;
}

operators.forEach((key) => key.addEventListener("click", selectOperator));

const calculate = () => {
    if(operator !== undefined){
        const actualNumber = display.textContent.replace(",",".");
        newNumber = true;
        const result = eval(`${previousNumber}${operator}${actualNumber}`);
        updateDisplay(result.toString().replace(",","."));
        operator = undefined;
    }
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
    clearDisplay();
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1));
}

document.querySelector("#apagar").addEventListener("click", removeLastNumber);


const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const actualValue = () => display.textContent.length > 0;
const actualDecimal = () => display.textContent.indexOf(",") !== -1;

const insertDecimal = () => {
    if (!actualDecimal()) {
        if (actualValue()) {
          updateDisplay(",");
        } else {
          updateDisplay("0,");
        }
  }
};

document.querySelector("#decimal").addEventListener("click", insertDecimal);

