const currentExpression = document.querySelector('#current-expression');
const digitButtons = Array.from(document.querySelectorAll('.button-digit'));
const operatorButtons = Array.from(document.querySelectorAll('.button-operator'));


digitButtons.forEach(item => item.addEventListener('click', addDigit));
operatorButtons.forEach(item => item.addEventListener('click', addOperator));



let operator = ''
  , operand1 = ''
  , operand2 = '';

function updateDisplay() {
  currentExpression.textContent = operand1;
}

function addDigit() {
  if (operator === '') {
    operand1 += this.textContent;
    updateDisplay();
  } else {
    operand2 += this.textContent;
    currentExpression.textContent += operand2;
  }
}

function addOperator() {
  operator = this.textContent;
  currentExpression.textContent += operator;

}