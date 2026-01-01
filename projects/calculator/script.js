const ADDITION_OPERATOR = '+'
const SUBTRACTION_OPERATOR = '-'
const MULTIPLICATION_OPERATOR = 'x'
const DIVISION_OPERATOR = '/'

const displayEl = document.querySelector('.display')

let operand1 = '0'
let operand2 = null
let operator = null

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

document.addEventListener('DOMContentLoaded', () => {
    displayEl.textContent = operand1
})
