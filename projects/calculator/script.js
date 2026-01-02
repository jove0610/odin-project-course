const ADDITION_OPERATOR = '+'
const SUBTRACTION_OPERATOR = '-'
const MULTIPLICATION_OPERATOR = 'x'
const DIVISION_OPERATOR = '/'
const ARITHMETIC_OPERATOR = [
    ADDITION_OPERATOR,
    SUBTRACTION_OPERATOR,
    MULTIPLICATION_OPERATOR,
    DIVISION_OPERATOR,
]

const displayEl = document.querySelector('.display')
const digitEls = document.querySelectorAll('.digit')
const operatorEls = document.querySelectorAll('.operator')

let operand1 = '0'
let operand2 = null
let operator = null
let display = operand1 // initial display is operand1

function add(num1, num2) {
    return Number(num1) + Number(num2)
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(operator, num1, num2) {
    let answer
    switch(operator) {
        case ADDITION_OPERATOR:
            answer = add(num1, num2)
            break
        case SUBTRACTION_OPERATOR:
            answer = subtract(num1, num2)
            break
        case MULTIPLICATION_OPERATOR:
            answer = multiply(num1, num2)
            break
        case DIVISION_OPERATOR:
            answer = divide(num1, num2)
            break
        default:
            break
    }
    return answer
}

function populateDisplay(number) {
    display = number
    displayEl.textContent = Number(display).toLocaleString()
}

document.addEventListener('DOMContentLoaded', () => {
    displayEl.textContent = operand1
})

digitEls.forEach(el => el.addEventListener('click', (e) => {
    const digit = e.target.textContent
    
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
    operator = e.target.textContent
    document.querySelector('.highlight')?.classList.remove('highlight')
    e.target.classList.add('highlight')
}))
