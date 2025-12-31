const btnContainer = document.querySelector('.btn-container')
const gameResultText = document.querySelector('.game-result-text')
const playerScoreText = document.querySelector('.player-score')
const computerScoreText = document.querySelector('.computer-score')

function getComputerChoice() {
    // Create variable choice
    let choice
    // Generate random number between 0 and 2
    const random = Math.floor(Math.random() * 3)

    // IF random number is 0
    if (random === 0) {
        // choice will be "rock"
        choice = 'rock'
    // ELSE IF random number is 1
    } else if (random === 1) {
        // choice will be "paper"
        choice = 'paper'
    // ELSE IF random number is 2
    } else if (random === 2) {
        // choice will be "scissors"
        choice = 'scissors'
    // END IF
    }

    // Return choice
    return choice
}

function getHumanChoice(buttonClass) {
    if (buttonClass === 'rock-btn') {
         return 'rock'
    } else if (buttonClass === 'paper-btn') {
         return 'paper'
    } if (buttonClass === 'scissors-btn') {
         return 'scissors'
    }
}

function playRound(humanChoice, computerChoice) {
    // handle draw scenario
    if (humanChoice === computerChoice) {
        gameResultText.textContent = "It's a draw!"
    // IF human is rock AND computer is scissors
    // OR IF human is paper AND computer is rock
    // OR IF human is scissors and computer is paper
    } else if ((humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        // handle win scenario
        let humanScore = playerScoreText.textContent
        humanScore++
        playerScoreText.textContent = humanScore
        gameResultText.textContent = `You win! ${humanChoice} beats ${computerChoice}`
    // ELSE handle lose scenario
    } else {
        let computerScore = computerScoreText.textContent
        computerScore++
        computerScoreText.textContent = computerScore
        gameResultText.textContent = `You lose! ${humanChoice} loses to ${computerChoice}`
    }
}

btnContainer.addEventListener('click', (e) => {
    const clickedBtnClass = e.target.classList[0]
    if (!['rock-btn', 'paper-btn', 'scissors-btn'].includes(clickedBtnClass)) {
        return
    }
    
    const humanChoice = getHumanChoice(clickedBtnClass);
    playRound(humanChoice, getComputerChoice())

    const humanScore = +playerScoreText.textContent
    const computerScore = +computerScoreText.textContent
    if (humanScore === 5 || computerScore === 5) {
        const result = humanScore === 5 ? 'win' : 'lose'
        const gameOver = document.createElement('h3')
        gameOver.textContent = `Game Over! You ${result}...`
        gameResultText.parentNode.appendChild(gameOver)

        document.querySelector('.rock-btn').setAttribute('disabled', '')
        document.querySelector('.paper-btn').setAttribute('disabled', '')
        document.querySelector('.scissors-btn').setAttribute('disabled', '')
    }
})
