// Simple math functions
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(op1, op2, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(+op1, +op2);
            break;
        case "-":
            result = subtract(+op1, +op2);
            break;
        case "x":
            result = multiply(+op1, +op2);
            break;
        case "÷":
            if(+op2 == 0) {
                display.textContent = "bruh";
                operand1 = "0";
                operator = "";
                return;
            }
            result = divide(+op1, +op2);
            break; 
        default:
            result = "ERROR";
            break;
    }
    
    result = Math.round(+result * ROUNDING) / ROUNDING;
    result = result.toString();
    if(result.length > 14) result = roundLargeNumber(result);
    display.textContent = result;
    operand1 = "0";
    operator = "";
}

function roundLargeNumber(result) {
    let buffer = result.length - 14;
    let exponent = 0;
    if(result.includes("e")) {
        exponent = +(result.slice(result.indexOf("e") + 1));
        buffer -= exponent.toString().length - 1;
        result = Math.round(+result * buffer) / buffer;
        result = result.toString().slice(0, result.toString().indexOf("e")) + `e+${exponent + buffer}`;
    }
    else {
        result = Math.round(+result * buffer) / buffer;
        result = result.toString() + `e+${exponent + buffer}`;
    }
    return result;
}

function updateDisplay(number) {
    if(display.textContent == "0" || overwrite == true) {
        display.textContent = number;
        if(overwrite == true) overwrite = false;
        return;
    }
    display.textContent += number;
}

function operatorClicked(op) {
    if(operator == "" && op == "=") return;
    if(operator == "") {
        operator = op;
        operand1 = display.textContent;
        overwrite = true;
    }
    else {
        if(overwrite == true) {
            operator = op;
            return;
        }
        operand2 = display.textContent;
        overwrite = true;
        operate(operand1, operand2, operator);
        if(op != "=") {
            operator = op;
            operand1 = display.textContent;
        }
        else {
            operand1 = "0";
            operand2 = "0";
            operator = "";
        }
    }
}

// Constant for most functions to update display
const display = document.querySelector("#display");

// Special Buttons and their functions
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    display.textContent = "0";
    operand1 = "0";
    operand2 = "0";
    operator = "";
});

const signButton = document.querySelector("#sign");
signButton.addEventListener("click", () => {
    if(!display.textContent.includes("-") && display.textContent != "0") display.textContent = "-" + display.textContent;
    else if(display.textContent.includes("-")) display.textContent = display.textContent.slice(1);
});

const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => display.textContent = (+display.textContent / 100).toString());

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
    if(overwrite == true) {
        display.textContent = "0.";
        overwrite = false;
    }
    else if(!display.textContent.includes(".")) display.textContent += ".";
});

// Add all functionality to operator and number buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => button.addEventListener("click", () => updateDisplay(button.textContent)));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(op => op.addEventListener("click", () => operatorClicked(op.textContent)));

// Default values
const ROUNDING = 10e10;
let operand1 = "0";
let operand2 = "0";
let operator = "";
let overwrite = false;