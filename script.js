const prevExpression = document.querySelector('#prev-expression');
const currentExpression = document.querySelector('#current-expression');
const equalButton = document.querySelector('#equal-button');
const clearButton = document.querySelector('#clear-button');
const pointButton = document.querySelector('#point-button');
const deleteButton = document.querySelector('#delete-button');

equalButton.addEventListener('click', handleEqualButton);
clearButton.addEventListener('click', handleClearButton);
pointButton.addEventListener('click', handlePointButton);
deleteButton.addEventListener('click', handleDeleteButton);

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
  let res;
  switch (operator) {
    case '+':
      res = add(operand1, operand2).toFixed(2);
      return Number.isSafeInteger(+res) ? res.slice(0, -3) : res; 
  
    case '-':
      res = subtract(operand1, operand2).toFixed(2);
      return Number.isSafeInteger(+res) ? res.slice(0, -3) : res; 
  
    case '*':
      res = multiply(operand1, operand2).toFixed(2);
      return Number.isSafeInteger(+res) ? res.slice(0, -3) : res; 
      
  
    case '/':
      if (operand2 === 0) {
        alert('Error: divide by zero');
      }
      res = divide(operand1, operand2).toFixed(2);
      return Number.isSafeInteger(+res) ? res.slice(0, -3) : res; 
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
  if (currentExpression.textContent !== '' && !currentExpression.textContent.slice(-1).match(/[+/*-]/)) {
    
    updateDisplay();
    operator = this.textContent;
    currentExpression.textContent += operator;
  }
}

function handlePointButton() {
  if (operator === '' && !operand1.includes('.')) {
      operand1 += this.textContent;
      updateCurrentDisplay(operand1);
  } else if(operator !== '' && !operand2.includes('.')){
    operand2 += this.textContent;
    currentExpression.textContent += this.textContent;
  }
}

function handleEqualButton() {
  if (currentExpression.textContent !== '' && !currentExpression.textContent.slice(-1).match(/[+/*-]/)) {
    updateDisplay();
    operator = '';
    isEqualButtonPressed = true;
  }
}

function handleClearButton() {
  currentExpression.textContent = '';
  prevExpression.textContent = '';
  operator = '';
  operand1 = '';
  operand2 = '';
  result = '';
}

function handleDeleteButton() {
  let del = currentExpression.textContent.slice(-1);
  if (del === '') return;
  
  else if (del.match(/[0-9]/)) {
    if (operand2 === '') {
      operand1 = operand1.slice(0, -1);

    } else {
      operand2 = operand2.slice(0, -1);
    }
  }
  else if (del.match(/[+/*-]/)) {
    operator = '';
  }
  else if (del.match(/[.]/)) {
    if (operand2 === '') {
      operand1 = operand1.slice(0, -1);
    } else {
      operand2 = operand2.slice(0, -1);
    }
  }
  currentExpression.textContent = currentExpression.textContent.slice(0,-1);
}
