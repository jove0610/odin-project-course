const DEFAULT_SIZE = 30
let opacity = 0

const gridContainer = document.querySelector('.grid-container')
const changeSizeBtn = document.querySelector('.change-size-btn')
const length = gridContainer.offsetWidth

function renderGrid(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const box = document.createElement('div')
            box.style.width = `${length / size}px`
            box.style.height = `${length / size}px`
            box.style.backgroundColor = '#1e2939'
            gridContainer.appendChild(box)
        }
    }
}

function getRandomColor() {
    Math.floor(Math.random() * 256)
}

document.addEventListener('DOMContentLoaded', () => {
    renderGrid(DEFAULT_SIZE)
})

gridContainer.addEventListener('mouseover', e => {
    const color1 = Math.floor(Math.random() * 256)
    const color2 = Math.floor(Math.random() * 256)
    const color3 = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, ${opacity})`
    opacity = Math.min(1, opacity + 0.1)
})

changeSizeBtn.addEventListener('click', () => {
    let newSize = prompt('Enter new size between 2 and 100', DEFAULT_SIZE)
    if (newSize === null) {
        return
    }
    newSize = +newSize
    if (Number.isInteger(newSize) && newSize >= 2) {
        gridContainer.textContent = ''
        renderGrid(Math.min(100, newSize))
    } else {
        alert('Error: Invalid input!')
    }
})
