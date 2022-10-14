let buttonPressed;
let firstNumber = '';
let secondNumber = '';
let currentSessionString = '';
let oprationSelected;
let result;

let buttonsActive = true;
let pointActive = false;

function resetAllValues() {
     firstNumber = '';
     secondNumber = '';
     currentSessionString = '';
     buttonPressed = '';
     oprationSelected = '';
     result = '';

     buttonsActive = true;
     pointActive = false;
}

function addition(a, b) {
    return (a + b);
}
function subtraction(a, b) {
    return (a-b);
}
function multiplication(a, b) {
    return (a*b);
}
function division(a, b) {
    if (b !== 0) {
        return (a/b);
    } else {
        return("You know you can't do that.");
    };
}

const buttons = document.querySelectorAll('button');
if (buttonsActive) {
    buttons.forEach(button => button.addEventListener('click', eventChecker));
};

const upperDisplay = document.getElementById('upper-display');
const lowerDisplay = document.getElementById('lower-display');

function eventChecker(e) {
    buttonPressed = e.target.textContent;
    if (buttonPressed == '.') {
        if (!pointActive) {
            addDotToTheNumber();
        };
    } else if (Number(buttonPressed) || buttonPressed == '0') {
        assignNumberValues(buttonPressed);
    } else {
        assingOperatorValues(buttonPressed);
    };
    checkForMultipleDotsIsString();
}

function assignNumberValues(a) {
    if (!oprationSelected) {
        if (result) {
            firstNumber = 0;
            result = 0;
        }
            firstNumber += a;
    } else {
        secondNumber += a;
    };
};

function assingOperatorValues(a) {
    if (a == '='){
        checkIfPossible();
        currentSessionString += ` = ${result}`;
        upperDisplay.textContent = (currentSessionString);
        firstNumber = '';
        oprationSelected = '';
        currentSessionString = '';
        pointActive = false;
    } else {
        if (result) {
            firstNumber = result;
        }
        checkIfPossible();
        oprationSelected = a;
    };
}

function performCalculation(a, b, c) {
    if (c == '+') {
        result = (addition(a, b));
    } else if (c == '-') {
        result = (subtraction(a, b));
    } else if (c == '*') {
        result = (multiplication(a, b));
    } else if (c == '/') {
        result = (division(a, b));
    } else {
        result = ('None')
    };
    firstNumber = 0;
    secondNumber = 0; 
}

function checkIfPossible() {
    if (firstNumber && secondNumber && oprationSelected) {
        performCalculation(Number(firstNumber), Number(secondNumber), oprationSelected);
        firstNumber = result;
    };
};

function addDotToTheNumber() {
    if (!oprationSelected) {
        firstNumber += '.';
    } else {
        secondNumber += '.';
    };
}
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    resetAllValues();
    upperDisplay.textContent = '';
})

function checkForMultipleDotsIsString() {
    if (buttonPressed !== '=' && buttonPressed !== 'Clear') {
        if (buttonPressed == '.'  && !pointActive) {
            currentSessionString += ` ${buttonPressed}`;
            pointActive = true;
        } else if (buttonPressed == '.'  && pointActive) {
            currentSessionString = currentSessionString;
        } else {
            currentSessionString += ` ${buttonPressed}`;
        };

    lowerDisplay.textContent = currentSessionString;
    } else {
        lowerDisplay.textContent = '';
    };
    if (!Number(buttonPressed) && buttonPressed !== '.' && pointActive ) {
        pointActive = false;
    }
}