const currentExpression = document.querySelector('#current-expression');
const digitButtons = Array.from(document.querySelectorAll('.button-digit'));


digitButtons.forEach(item => item.addEventListener('click', addDigits));



let operator = ''
  , operand1 = ''
  , operand2 = '';

function updateDisplay() {
  currentExpression.textContent = operand1;
}

function addDigits() {
  if (operator === '') {
    operand1 += this.textContent;
    updateDisplay();
  }
}