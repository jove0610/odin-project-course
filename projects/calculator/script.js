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
const backspaceEl = document.querySelector('.bspace')
const decimalEl = document.querySelector('.decimal')
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
    if (number === MATH_ERROR) {
        display = number
        displayEl.textContent = display
        return
    }

    let [integer, decimal] = number.split('.')
    integer = Number(integer).toLocaleString()

    display = number.includes('.')
        ? `${integer}.${decimal}`
        : number
    displayEl.textContent = display
}

function handleAllClear() {
    operand1 = '0'
    operand2 = null
    operator = null
    populateDisplay(operand1)
    document.querySelector('.highlight')?.classList.remove('highlight')
}

function handleBackSpace() {
    if (operand2 !== null) {
        operand2 = operand2.slice(0, -1) || '0'
        populateDisplay(operand2)
    } else if (ARITHMETIC_OPERATOR.includes(operator)) {
        operator = null
        document.querySelector('.highlight').classList.remove('highlight')
    } else if (operator === null) {
        operand1 = operand1.slice(0, -1) || '0'
        populateDisplay(operand1)
    } else if (operator === EQUALS_OPERATOR) {
        handleAllClear()
    }
}

function handleDecimal() {
    if (operator === null && !operand1.includes('.')) {
        operand1 += '.'
        populateDisplay(operand1)
    } else if (ARITHMETIC_OPERATOR.includes(operator) &&
        (operand2 === null || !operand2.includes('.'))
    ) {
        operand2 = operand2 === null
            ? '0.'
            : operand2 + '.'
        populateDisplay(operand2)
    } else if (operator === EQUALS_OPERATOR) {
        handleAllClear()
        operand1 = '0.'
        populateDisplay(operand1)
    }
}

function handleEquals() {
    if (display === MATH_ERROR ||
        operator === null ||
        operand2 === null
    ) {
        return
    }

    document.querySelector('.highlight')?.classList.remove('highlight')
    equalsEl.classList.add('highlight')

    operand1 = operate(operator, operand1, operand2)
    operand2 = null
    operator = EQUALS_OPERATOR
    populateDisplay(operand1)
}

function handleDigits(digit) {
    if (display === MATH_ERROR) {
        return
    }

    // after calculating with "equals" operator
    // if next button clicked is a digit
    // clear the result and start a new calculation
    if (operand1 &&
        operator === EQUALS_OPERATOR &&
        operand2 === null
    ) {
        handleAllClear()
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
}

function handleOperators(operatorElement) {
    if (display === MATH_ERROR) {
        return
    }

    const previousOperator = operator
    if (ARITHMETIC_OPERATOR.includes(previousOperator) &&
        operand2 !== null
    ) {
        operand1 = operate(previousOperator, operand1, operand2)
        operand2 = null
        populateDisplay(operand1)  
    }

    operator = operatorElement.textContent
    document.querySelector('.highlight')?.classList.remove('highlight')
    operatorElement.classList.add('highlight')
}

document.addEventListener('DOMContentLoaded', () => {
    populateDisplay(operand1)
})

allClearEl.addEventListener('click', handleAllClear)
backspaceEl.addEventListener('click', handleBackSpace)
decimalEl.addEventListener('click', handleDecimal)
equalsEl.addEventListener('click', handleEquals)

digitEls.forEach(el => el.addEventListener('click', (e) => {
    handleDigits(e.target.textContent)
}))
operatorEls.forEach(el => el.addEventListener('click', (e) => {
    handleOperators(e.target)
}))

document.addEventListener('keyup', (e) => {
    if (['0','1','2','3','4','5','6','7','8','9'].includes(e.key)) {
        handleDigits(e.key)
        return
    }

    switch (e.key) {
        case 'Escape':
            handleAllClear()
            break
        case 'Backspace':
            handleBackSpace()
            break
        case '.':
            handleDecimal()
            break
        case '=':
        case 'Enter':
            handleEquals()
            break
        case '+':
            handleOperators(document.querySelector('.add'))
            break
        case '-':
            handleOperators(document.querySelector('.minus'))
            break
        case '*':
            handleOperators(document.querySelector('.multiply'))
            break
        case '/':
            handleOperators(document.querySelector('.divide'))
            break
    }
})
