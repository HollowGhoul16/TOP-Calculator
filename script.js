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

// THIS CODE DOESNT LOOK GOOD FOR LARGE NUMBERS
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
    // if(result.length > 12) result = roundLargeNumber(result);
    display.textContent = result;
    operand1 = "0";
    operator = "";
}

// In progress if I ever come back to this, to handle large numbers displaying correctly in the calculator
// function roundLargeNumber(result) {
//     let buffer = result.length - 12;
//     let bufferExponent = +`10e${buffer-1}`;
//     let exponent = 0;
//     if(result.includes("e")) {
//         exponent = +(result.slice(result.indexOf("e") + 1));
//         buffer -= exponent.toString().length - 2;
//         result = Math.round(+result * buffer) / buffer;
//         result = result.toString().slice(0, result.toString().indexOf("e")) + `e+${exponent + buffer}`;
//     }
//     else {
//         result = Math.round(+result * bufferExponent) / bufferExponent;
//         result = result.toString() + `e+${buffer}`;
//     }
//     return result;
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handles overwriting the display and appending the clicked number to the display
function updateDisplay(number) {
    if(display.textContent == "0" || overwriteDisplay == true) {
        display.textContent = number;
        if(overwriteDisplay == true) overwriteDisplay = false;
        return;
    }
    display.textContent += number;
}

// Has multiple checks to see what state the calculator
function operatorClicked(op) {
    if(operator == "" && op == "=") return; // Makes sure we are not hitting equals early

    if(operator == "") {
        operator = op;
        operand1 = display.textContent;
        overwriteDisplay = true;
    }
    else {
        // If we have yet to put in a new operand, just update the operator
        if(overwriteDisplay == true) {
            if(op == "=") return;
            operator = op;
            return;
        }
        overwriteDisplay = true;
        operate(operand1, display.textContent, operator);
        
        if(op != "=") {
            operator = op;
            operand1 = display.textContent;
        }
        else {
            operand1 = "0";
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
    operator = "";
});

// Handles toggling the sign for operands and results
const signButton = document.querySelector("#sign");
signButton.addEventListener("click", () => {
    if(!display.textContent.includes("-") && display.textContent != "0") display.textContent = "-" + display.textContent;
    else if(display.textContent.includes("-")) display.textContent = display.textContent.slice(1);
});

// Divides the current displayed number by 100
const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => display.textContent = (+display.textContent / 100).toString());

// Handles multiple decimal points and if the display needs to be overwritten
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
    if(overwriteDisplay == true) {
        display.textContent = "0.";
        overwriteDisplay = false;
    }
    else if(!display.textContent.includes(".")) display.textContent += ".";
});

// Add all functionality to operator and number buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => button.addEventListener("click", () => updateDisplay(button.textContent)));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(op => op.addEventListener("click", () => operatorClicked(op.textContent)));

// Default values
const ROUNDING = 10e4; // 10^5, allows 5 decimal places maximum
let operand1 = "0";
let operator = "";
let overwriteDisplay = false;