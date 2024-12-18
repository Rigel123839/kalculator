class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateDisplay() {
    // vise tallene og passe på at operasjonen er med.
    this.currentOperandTextElement.textContent = this.currentOperand;
    this.previousOperandTextElement.textContent = this.previousOperand + (this.operation ? ` ${this.operation}` : '');
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    // passe på at ulike utregninger skjer når case er bestemt
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }
}

/* End of object declaration */
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const currentOperandTextElement = document.querySelector('[data-current-number]');
const previousOperandTextElement = document.querySelector('[data-previous-number]');

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
  
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
});


// Keyboard input handling
document.addEventListener('keydown', event => {
  if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
  }
  if (['+', '-', '*', '/'].includes(event.key)) {
      calculator.chooseOperation(event.key === '/' ? '/' : event.key);
      calculator.updateDisplay();
  }
  if (event.key === 'Enter' || event.key === '=') {
      calculator.compute();
  }
  if (event.key === 'Backspace') {
      calculator.delete();
      calculator.updateDisplay();
  }
  if (event.key === 'Escape') {
      calculator.clear();
      calculator.updateDisplay();
  }
});