const sum = function sum(x, y) {
    return x + y;
}

const subtract = function subtract(x, y) {
    return x - y;
}

const multiply = function multiply(x, y) {
    return x * y;
}

const divide = function division(x, y) {
    if (y === 0) {
        return "Cannot divide by zero";
    } else {
        return x / y;
    }    
}

const firstNum = [];
const secondNum = [];
let operator = "";


//Input display
const inputDisplay = document.querySelector('#input-display');
const currentInput = document.querySelector('#current-input');
const savedInput = document.querySelector('#saved-input');

//Buttons
const buttons = document.querySelectorAll('.button');
buttons.forEach(eventDisplayButton);

//Events
function eventDisplayButton(event) {
    const eventClass = event.className;
    event.addEventListener('click', displayButton);
    
    if (eventClass === "button clear") {
        event.addEventListener('click', clearInput);
    } else if (event.classList.contains("operator")) {
        event.addEventListener('click', setOperator);
    } 
    // console.log(event.className);
}

function displayButton(element) {
    const clickedBtnTxt = element.currentTarget.textContent;
    const clickedBtnClass = element.currentTarget.className;
    const stringOfSavedInput = savedInput.textContent;
    const stringOfCurrentInput = currentInput.textContent;

    if (clickedBtnTxt >= 0 || clickedBtnTxt <= 9) {
        if (savedInput.textContent.includes("=")) {
            currentInput.textContent = "";
            savedInput.textContent = "";
            operator = "";
            currentInput.textContent += clickedBtnTxt;
        } else {
            currentInput.textContent += clickedBtnTxt;
        }
    } else if (element.currentTarget.classList.contains("operator")) {
        if (currentInput.textContent === "") {
            return;
        } else if (stringOfSavedInput.includes("+") || stringOfSavedInput.includes("-") || stringOfSavedInput.includes("x") || stringOfSavedInput.includes("÷")) {
            if (stringOfSavedInput.includes("=")) {
                let itemInput = currentInput.textContent;
                firstNum.push(itemInput);
                savedInput.textContent = `${currentInput.textContent}${clickedBtnTxt}`;
                currentInput.textContent = "";
                console.log(firstNum, secondNum);
            } else {
                let itemInput = currentInput.textContent;
                secondNum.push(itemInput);
                savedInput.textContent = `${operate()}${clickedBtnTxt}`;
                currentInput.textContent = "";
                let savedItem = savedInput.textContent;
                let result = savedItem.slice(0, -1)
                firstNum.push(result);
                console.log(result, firstNum, secondNum);
                }            
        } else {
            let itemInput = currentInput.textContent;
            firstNum.push(itemInput);
            savedInput.textContent = `${currentInput.textContent}${clickedBtnTxt}`;
            currentInput.textContent = "";
            console.log(firstNum);
        }
    } else if (clickedBtnClass === "button equal") {
        if (currentInput.textContent === "") {
            return;
        } else {
            let itemInput = currentInput.textContent;
            secondNum.push(itemInput);
            savedInput.textContent += `${currentInput.textContent}${clickedBtnTxt}`;
            currentInput.textContent = `${operate()}`;

            console.log('botao =', firstNum, secondNum);
        }        
    } else if (clickedBtnClass === "button backspace") {
        eraseInput();
        currentInput.textContent = `${eraseInput()}`;
    } else if (clickedBtnClass === "button dot") {
        if (stringOfCurrentInput.includes(".")) {
            return;
        }
        currentInput.textContent += clickedBtnTxt;
    }
        console.log(element.currentTarget.className);
}

function clearInput() {
    currentInput.textContent = "";
    savedInput.textContent = "";
    firstNum.length = 0;
    secondNum.length = 0;
    operator = "";
}

function eraseInput() {
    if (currentInput.textContent === "") {
        return;
    } else {
        let textInput = currentInput.textContent;
        let newTextInput = textInput.slice(0, -1);
        console.log(newTextInput);
        return newTextInput;
    }
}



function setOperator(){
    if (this.className === "button addition operator") {
        return operator = "+";
    } else if (this.className === "button subtraction operator") {
        return operator = "-";
    } else if (this.className === "button multiplication operator") {
        return operator = "x";
    } else if (this.className === "button division operator") {
        return operator = "÷";
    }
}

function operate() {
    if (firstNum.length === 0) {
        return;
    }
    let xNum = Number(firstNum.pop());
    let yNum = Number(secondNum.pop());
    let result = "";
    setOperator();
    operator;
    console.log(xNum, yNum);

    switch (operator) {
        case "+":
            result = Math.round((sum(xNum, yNum)) * 100) / 100;
            break;
        case "-":
            result = Math.round((subtract(xNum, yNum)) * 100) / 100;
            break;
        case "x":
            result = Math.round((multiply(xNum, yNum)) * 100) / 100;
            break;
        case "÷":
            result = Math.round((divide(xNum, yNum)) * 100) / 100;
            break;
        default:
            return "OOPS";
    }
    return result;
}