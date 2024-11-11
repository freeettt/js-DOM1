const display = document.querySelector(".display");
const historyDisplay = document.querySelector("#history");
const buttons = document.querySelectorAll("button");
let currentInput = '';
let history = '';
let hasOperator = false;

const updateDisplay = (value) => {
  display.value = value;
};

const updateHistoryDisplay = (value) => {
  historyDisplay.textContent = value;
};

const resetCalculator = () => {
  currentInput = '';
  history = '';
  hasOperator = false;
  updateDisplay('');
  updateHistoryDisplay('');
};

const deleteLastChar = () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
};

const performCalculation = () => {
  try {
    let result = eval(history);
    result = result % 1 === 0 ? result : result.toFixed(2);
    updateDisplay(result);
    currentInput = result.toString();
    history = currentInput;
    hasOperator = false;
  } catch (error) {
    updateDisplay("Error!");
    resetCalculator();
  }
};

const handleOperator = (operator) => {
  if (currentInput === '' && operator !== '-') return;
  if (hasOperator) history = history.slice(0, -1);
  history += currentInput + operator;
  updateHistoryDisplay(history);
  currentInput = '';
  hasOperator = true;
};

const handleButtonClick = (value) => {
  if (value === "AC") {
    resetCalculator();
  } else if (value === "DEL") {
    deleteLastChar();
  } else if (value === "=") {
    if (!hasOperator || currentInput === '') return;
    history += currentInput;
    performCalculation();
    updateHistoryDisplay('');
  } else if (["+", "-", "*", "/"].includes(value)) {
    handleOperator(value);
  } else {
    currentInput += value;
    updateDisplay(currentInput);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => handleButtonClick(e.target.dataset.value));
});
