const display = document.getElementById('display');
let firstValue = '';
let secondValue = '';
let currentOperation = null;
let shouldResetScreen = false;

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => handleButtonClick(button.id));
});

function handleButtonClick(buttonId) {
    if (buttonId === 'button-reset') {
      resetAll();
    } else if (buttonId === 'button-del') {
      deleteNumber();
    } else if (buttonId.includes('button-') && !isNaN(buttonId[buttonId.length - 1])) {
      // Check if the button is numeric and append the number
      appendNumber(buttonId[buttonId.length - 1]);
    } else if (buttonId === 'button-dot') {
      // Append a dot for decimal numbers
      appendDot();
    } else if (buttonId === 'button-equals') {
      if (currentOperation) evaluate();
    } else if (['button-plus', 'button-minus', 'button-multiply', 'button-divide'].includes(buttonId)) {
      // Set the operation based on the button ID
      setOperation(buttonId.replace('button-', ''));
    }
}

function appendDot() {
    if (shouldResetScreen) resetScreen();
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function resetAll() {
  display.textContent = '0';
  firstValue = '';
  secondValue = '';
  currentOperation = null;
}

function deleteNumber() {
  display.textContent = display.textContent.slice(0, -1);
}

function setOperation(operation) {
    if (currentOperation !== null) evaluate();
    firstValue = display.textContent;
    switch (operation) {
      case 'plus':
        currentOperation = '+';
        break;
      case 'minus':
        currentOperation = '-';
        break;
      case 'multiply':
        currentOperation = '*';
        break;
      case 'divide':
        currentOperation = '/';
        break;
    }
    shouldResetScreen = true;
  }  

  function evaluate() {
    secondValue = display.textContent;
    switch (currentOperation) {
      case '+':
        display.textContent = String(parseFloat(firstValue) + parseFloat(secondValue));
        break;
      case '-':
        display.textContent = String(parseFloat(firstValue) - parseFloat(secondValue));
        break;
      case '*':
        display.textContent = String(parseFloat(firstValue) * parseFloat(secondValue));
        break;
      case '/':
        if (secondValue === '0') {
          alert("You can't divide by 0!");
          return;
        }
        display.textContent = String(parseFloat(firstValue) / parseFloat(secondValue));
        break;
    }
    firstValue = display.textContent;
    currentOperation = null;
    shouldResetScreen = true;
  }
  
// JavaScript for moving the indicator in a theme switcher
const indicator = document.querySelector('.switch-indicator');
const positions = [20, 40, 60]; // Hardcoded pixel values for positions 1, 2, and 3

// Function to initialize indicator position
function initializeIndicator() {
  indicator.setAttribute('data-position', '1'); // Start at position 1
  moveIndicator(0); // Move to the first position
}

// Function to move the indicator to the next position
function moveToNextPosition() {
  // Get current position from the data-position attribute
  let currentPosition = parseInt(indicator.getAttribute('data-position'), 10);
  // Increment position or loop back to the first one
  currentPosition = (currentPosition % positions.length) + 1;
  moveIndicator(currentPosition - 1); // Array is 0-indexed so we subtract 1
}

// Event listener for the indicator click
indicator.addEventListener('click', moveToNextPosition);

// Function to move the indicator to a specific index
function moveIndicator(index) {
  // Set the left position using the hardcoded pixel values
  indicator.style.left = `${positions[index]}px`;
  // Update the position attribute
  indicator.setAttribute('data-position', index + 1);
}

// Call the initialize function to set the initial position of the indicator
initializeIndicator();

