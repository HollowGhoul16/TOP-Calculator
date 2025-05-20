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

function operate(op1, op2, operand) {
    switch (operand) {
        case "+":
            return add(+op1, +op2);
            break;
        case "-":
            return subtract(+op1, +op2);
            break;
        case "*":
            return multiply(+op1, +op2);
            break;
        case "/":
            return divide(+op1, +op2);
            break; 
        default:
            return "ERROR";
    }
}

let operand1 = 0;
let operand2 = 0;
let operator = "";