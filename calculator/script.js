const ADDITION_OPERATOR = '+'
const SUBTRACT_OPERATOR = '-'
const MULTIPLY_OPERATOR = 'x'
const DIVISION_OPERATOR = '/'
const EQUALS_OPERATOR = '='
const MATH_ERROR = 'Math error...'
const ARITMETIC_OPERATIONS = [
    ADDITION_OPERATOR,
    SUBTRACT_OPERATOR,
    MULTIPLY_OPERATOR,
    DIVISION_OPERATOR,
]

const displayEl = document.querySelector('.display')

let display = '0'
let operand1 = '0'
let operand2 = ''
let operator = null

function operate(operator, num1, num2) {
    let answer
    switch(operator) {
        case ADDITION_OPERATOR:
            answer = num1 + num2
            break;
        case SUBTRACT_OPERATOR:
            answer = num1 - num2
            break;
        case MULTIPLY_OPERATOR:
            answer = num1 * num2
            break;
        case DIVISION_OPERATOR:
            answer = num1 / num2
            break;
    }
    return `${Math.round(answer * 100) / 100}`
}

function highlightOperator(element) {
    const currentHighlight = document.querySelector('.highlight')
    if (currentHighlight) {
        currentHighlight.classList.remove('highlight')
        operator = null
    }
    if (element) {
        element.classList.add('highlight')
        operator = element.textContent
    }
}

function displayNumber(number) {
    let [integer, decimal = ''] = number.split('.')
    integer = Number(integer).toLocaleString()

    if (number.includes('.')) {
        display = `${integer}.${decimal}`
    } else {
        display = integer
    }
    displayEl.textContent = display
}

function appendDigit(operand, digit) {
    const isDecimal = digit === '.'

    if (operand === '0' && digit === '0') {
        return '0'
    } else if (isDecimal && operand.includes('.')) {
        return operand
    } else if (isDecimal && operand === '') {
        return '0.'
    } 
    return operand += digit
}

function handleClickDigit(element) {
    const digit = element.textContent

    if (operator === null) {
        operand1 = appendDigit(operand1, digit)
        displayNumber(operand1)
    } else if (operator === EQUALS_OPERATOR) {
        operand1 = digit === '.' ? '0.' : digit
        displayEl.textContent = operand1
        highlightOperator()
    } else if (ARITMETIC_OPERATIONS.includes(operator)) {
        operand2 = appendDigit(operand2, digit)
        displayNumber(operand2)
    }
}

function handleClickOperator(element) {
    if (element.textContent === EQUALS_OPERATOR && operand2 === '') {
        return
    } else if (operator === DIVISION_OPERATOR &&
        operand2 !== '' &&
        Number(operand2) === 0
    ) {
        display = MATH_ERROR
        displayEl.textContent = display
    } else if (operand2 !== '') {
        const result = operate(operator, +operand1, +operand2)
        operand1 = result
        displayNumber(operand1)
        operand2 = ''
    }

    highlightOperator(element)
}

function handleClickAllClear() {
    display = '0'
    operand1 = '0'
    operand2 = ''
    highlightOperator()
    displayEl.textContent = display
}

document.addEventListener('DOMContentLoaded', () => {
    displayEl.textContent = display
})

document.querySelector('.container').addEventListener('click', (e) => {
    const elementClass = e.target.classList.value || ''

    if (elementClass.includes('clear')) {
        handleClickAllClear()
    } else if (display === MATH_ERROR) {
        return
    } else if (elementClass.includes('digit')
        || elementClass.includes('decimal')
    ) {
        handleClickDigit(e.target)
    } else if (elementClass.includes('operator')) {
        handleClickOperator(e.target)
    } 
})
