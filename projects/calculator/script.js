const ADDITION_OPERATOR = '+'
const SUBTRACTION_OPERATOR = '-'
const MULTIPLICATION_OPERATOR = 'x'
const DIVISION_OPERATOR = '/'
const EQUALS_OPERATOR = '='
const MATH_ERROR = 'Math error...'
const ARITHMETIC_OPERATOR = [
    ADDITION_OPERATOR,
    SUBTRACTION_OPERATOR,
    MULTIPLICATION_OPERATOR,
    DIVISION_OPERATOR,
]

const allClearEl = document.querySelector('.allclear')
const displayEl = document.querySelector('.display')
const equalsEl = document.querySelector('.equals')
const digitEls = document.querySelectorAll('.digit')
const operatorEls = document.querySelectorAll('.operator')

let operand1 = '0'
let operand2 = null
let operator = null
let display = operand1 // initial display is operand1

function operate(operator, num1, num2) {
    let answer
    switch(operator) {
        case ADDITION_OPERATOR:
            answer = Number(num1) + Number(num2)
            break
        case SUBTRACTION_OPERATOR:
            answer = num1 - num2
            break
        case MULTIPLICATION_OPERATOR:
            answer = num1 * num2
            break
        case DIVISION_OPERATOR:
            if (Number(num2) === 0) {
                return MATH_ERROR
            }
            answer = num1 / num2
            break
    }

    return `${Math.round(answer * 100) / 100}`
}

function populateDisplay(number) {
    display = number
    displayEl.textContent = display === MATH_ERROR
        ? MATH_ERROR
        : Number(display).toLocaleString()
}

function allClear() {
    operand1 = '0'
    operand2 = null
    operator = null
    populateDisplay(operand1)
    document.querySelector('.highlight')?.classList.remove('highlight')
}

document.addEventListener('DOMContentLoaded', () => {
    populateDisplay(operand1)
})

digitEls.forEach(el => el.addEventListener('click', (e) => {
    if (display === MATH_ERROR) {
        return
    }

    const digit = e.target.textContent

    // after calculating with "equals" operator
    // if next button clicked is a digit
    // clear the result and start a new calculation
    if (operand1 &&
        operator === EQUALS_OPERATOR &&
        operand2 === null
    ) {
        allClear()
    }
    
    if (operator === null) {
        operand1 = operand1 === '0'
            ? digit
            : operand1 + digit
        populateDisplay(operand1)
    } else if (ARITHMETIC_OPERATOR.includes(operator)) {
        operand2 = ['0', null].includes(operand2)
            ? digit
            : operand2 + digit
        populateDisplay(operand2)
    }
}))

operatorEls.forEach(el => el.addEventListener('click', (e) => {
    if (display === MATH_ERROR) {
        return
    }

    if (ARITHMETIC_OPERATOR.includes(operator) &&
        operand2 !== null
    ) {
        operand1 = operate(operator, operand1, operand2)
        operand2 = null
        populateDisplay(operand1)  
    }

    operator = e.target.textContent
    document.querySelector('.highlight')?.classList.remove('highlight')
    e.target.classList.add('highlight')
}))

equalsEl.addEventListener('click', (e) => {
    if (display === MATH_ERROR ||
        operator === null ||
        operand2 === null
    ) {
        return
    }

    document.querySelector('.highlight')?.classList.remove('highlight')
    e.target.classList.add('highlight')

    operand1 = operate(operator, operand1, operand2)
    operand2 = null
    operator = EQUALS_OPERATOR
    populateDisplay(operand1)
})

allClearEl.addEventListener('click', allClear)
