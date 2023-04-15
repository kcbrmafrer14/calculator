let num1 = '';
let num2 = '';
let answer = '';
let operand = '';
let currentDisplay = document.querySelector('.current');
let previousDisplay = document.querySelector('.previous');

// switches
let firstNumber = true;
let nextNumber = false;
let operandInPlace = false;

// to get number
const numbers = document.querySelectorAll('.number');
numbers.forEach((button) => button.addEventListener('click', numberize));

//  for operators
const operator = document.querySelectorAll('.operator');
operator.forEach((button) => button.addEventListener('click', () => {
  if (button.textContent === '-') {
    if (firstNumber && num1 === '') {
      num1 = '-' + num1;
      isNegative = true;
      updateDisplay();
    } else if (nextNumber && num2 === '') {
      num2 = '-' + num2;
      isNegative = true;
      updateDisplay();
    } else {
      if (firstNumber && !operandInPlace && !nextNumber) {
        operand = button.textContent;
        firstNumber = false;
        operandInPlace = true;
        nextNumber = true;
        updateDisplay();
        addDecimal();
      } else if (!firstNumber && operandInPlace && nextNumber) {
        operate();
        num1 = answer;
        operand = button.textContent;
        num2 = '';
        updatePrevious();
        updateDisplay();
        addDecimal();
      }}
    }
    else {
        if (firstNumber && !operandInPlace && !nextNumber) {
            operand = button.textContent;
            firstNumber = false;
            operandInPlace = true;
            nextNumber = true;
            updateDisplay();
            addDecimal();
        }
        else if (!firstNumber && operandInPlace && nextNumber) {
            operate();
            num1 = answer;
            operand = button.textContent;
            num2 = '';
            updatePrevious();
            updateDisplay();
            addDecimal();
    }
  }
}));

// for equal
const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
  if (operandInPlace && num2 !== '') {
    operate();
    updatePrevious();
    currentDisplay.textContent = answer;
    reset();
    addDecimal();
  } else if (num2 === '' && operandInPlace) {
    answer = num1;
    addDecimal();
    updatePrevious();
    currentDisplay.textContent = answer;
  }
});

// for del
const del = document.querySelector('.del')
del.addEventListener('click', () => {
  if (operandInPlace) {
    operand = '';
    operandInPlace = false;
    firstNumber = true;
    nextNumber = false;
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 3);
  } else if (nextNumber) {
    num2 = num2.slice(0, num2.length - 1)
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
  } else if (firstNumber) {
    num1 = num1.slice(0, num1.length - 1)
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
  }
});
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
  isNegative = false;
  addDecimal();
});

// checking decimal
const decimal = document.querySelector('.period');
decimal.addEventListener('click', addDecimal);

function addDecimal() {
    if (firstNumber && num1.includes('.')) {
        decimal.textContent = '';
    }
    else if (nextNumber && num2.includes('.')) {
        decimal.textContent = '';
    }
    else {
        decimal.textContent = '.';
    }
}

function numberize() {
  if (firstNumber) {
    num1 += this.textContent;
    updateDisplay();
  } else if (nextNumber) {
    num2 += this.textContent;
    updateDisplay();
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
      num2 = '';
  }
}

function updateDisplay() {
  currentDisplay.textContent = '';
  currentDisplay.textContent = `${num1} ${operand} ${num2}`;
}

function updatePrevious() {
  previousDisplay.textContent = '';
  previousDisplay.textContent = currentDisplay.textContent;
}

function reset() {
  firstNumber = true;
  nextNumber = false;
  operandInPlace = false;
  isNegative = false;
  num1 = '';
  num2 = '';
  operand = '';
  addDecimal();
}

const footer = document.querySelector('#year');
footer.textContent = new Date().getFullYear();