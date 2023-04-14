let num1 = '';
let num2 = '';
let answer;
let operand;
let currentDisplay = document.querySelector('.current');
let previousDisplay = document.querySelector('.previous');

// switches
let firstNumber = true;
let nextNumber = false;
let operandInPlace = false;

// to get number
const numbers = document.querySelectorAll('.number');
numbers.forEach(button => button.addEventListener('click', numberize));

//  for operators
const operator = document.querySelectorAll('.operator');
operator.forEach(button => button.addEventListener('click', () => {
    if (firstNumber && !nextNumber && !operandInPlace) {
        firstNumber = false;
        operandInPlace = true;
        operand = button.textContent;
        currentDisplay.textContent += ` ${operand} `;
    }
    else if (nextNumber && !operandInPlace && !firstNumber) {
        operate();
        num1 = answer;
        num2 = '';
        operand = button.textContent;
        previousDisplay.textContent = currentDisplay.textContent
        currentDisplay.textContent = `${answer} ${operand} `;
        nextNumber = false;
        operandInPlace = true;
    }
}));

// for equal
const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if (operandInPlace) {
        firstNumber = true;
        nextNumber = false;
        operandInPlace = false;
        previousDisplay.textContent = ''
        currentDisplay.textContent = num1;
        num1 = '';
        num2 = '';
        answer = '';
        operand = '';
    }
    else {
        firstNumber = true;
        nextNumber = false;
        operandInPlace = false;
        operate();
        previousDisplay.textContent = currentDisplay.textContent
        currentDisplay.textContent = answer;
        num1 = '';
        num2 = '';
        answer = '';
        operand = '';
    }
})

// for del
const del = document.querySelector('.del')
del.addEventListener('click', () => {
    if (operandInPlace) {
        operand = ''
        operandInPlace = false;
    }
    else if (nextNumber) {
        num2 = num2.slice(0, num2.length - 1)
        currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    }
    else if (readyToOperate) {
        num1 = num1.slice(0, num1.length - 1)
        currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    }

})
// for AC
const clearAll = document.querySelector('.ac');
clearAll.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    answer = '';
    operand = '';
    currentDisplay.textContent = '';
    previousDisplay.textContent = '';
    firstNumber = true;
    nextNumber = false;
    operandInPlace = false;
})

// checking decimal

function numberize() {
    if (firstNumber && !nextNumber && !operandInPlace) {
        num1 += this.textContent;
        currentDisplay.textContent += `${this.textContent}`;
    }
    else if (!firstNumber && !nextNumber && operandInPlace) {
        operandInPlace = false;
        nextNumber = true;
        num2 += this.textContent;
        currentDisplay.textContent += `${this.textContent}`;
    }
}

function operate() {
    switch (operand) {
        case '+':
            answer = parseFloat(num1) + parseFloat(num2);
            answer = Math.round(answer * 10000) / 10000;
            break;
        case '-':
            answer = parseFloat(num1) - parseFloat(num2);
            answer = Math.round(answer * 10000) / 10000;
            break;
        case '*':
            answer = parseFloat(num1) * parseFloat(num2);
            answer = Math.round(answer * 10000) / 10000;
            break;
        case '÷':
            answer = parseFloat(num1) / parseFloat(num2);
            answer = Math.round(answer * 10000) / 10000;
            break;
        default:
            num2;
            
    }
}
