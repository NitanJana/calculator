const prevExpression = document.querySelector('#prev-expression');
const currentExpression = document.querySelector('#current-expression');
const equalButton = document.querySelector('#equal-button');
const clearButton = document.querySelector('#clear-button');

equalButton.addEventListener('click', handleEqualButton);
clearButton.addEventListener('click', handleClearButton);

const digitButtons = Array.from(document.querySelectorAll('.button-digit'));
digitButtons.forEach(item => item.addEventListener('click', addDigit));

const operatorButtons = Array.from(document.querySelectorAll('.button-operator'));
operatorButtons.forEach(item => item.addEventListener('click', addOperator));



let operator = ''
  , operand1 = ''
  , operand2 = ''
  , result
  , isEqualButtonPressed = false;


function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  return operand1 / operand2;
}
  
  

function operate() {
  operand1 = +operand1;
  operand2 = +operand2;
  switch (operator) {
    case '+':
      return add(operand1, operand2);
  
    case '-':
      return subtract(operand1, operand2);
  
    case '*':
      return multiply(operand1, operand2);
  
    case '/':
      if (operand2 === 0) {
        alert('Error: divide by zero');
      }
      let temp = divide(operand1, operand2).toFixed(2);
      return Number.isSafeInteger(+temp) ? temp.slice(0, -3) : temp; 
  }
}

function updateDisplay() {
  if (operand2 !== '') {
    result = operate();
    currentExpression.textContent = result;
    updateCurrentDisplay(result);
    updatePrevDisplay();
    operand1 = result;
    operand2 = '';
  }
}


function updateCurrentDisplay(value) {
  currentExpression.textContent = value;
}

function updatePrevDisplay() {
  prevExpression.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
}

function addDigit() {
  
  if (operator === '') {
    if (isEqualButtonPressed) {
      operand1 = this.textContent;
      isEqualButtonPressed = false;
      updateCurrentDisplay(operand1);
    } else {
      operand1 += this.textContent;
      updateCurrentDisplay(operand1);

    }
  } else {
    operand2 += this.textContent;
    currentExpression.textContent += this.textContent;
  }
}

function addOperator() {
  updateDisplay();
  operator = this.textContent;
  currentExpression.textContent += operator;

}

function handleEqualButton() {
  updateDisplay();
  operator = '';
  isEqualButtonPressed = true;
}

function handleClearButton() {
  currentExpression.textContent = '';
  prevExpression.textContent = '';
  operator = '';
  operand1 = '';
  operand2 = '';
  result = '';
}
