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

function getHumanChoice() {
    const choice = prompt('Select between "rock", "paper" or "scissors"')
    return choice.toLowerCase()
}

function playGame() {
    let humanScore = 0
    let computerScore = 0

    const playRound = function(humanChoice, computerChoice) {
        // handle draw scenario
        if (humanChoice === computerChoice) {
            console.log("It's a draw!")
            return
        }

        // IF human is rock AND computer is scissors
        // OR IF human is paper AND computer is rock
        // OR IF human is scissors and computer is paper
        if ((humanChoice === 'rock' && computerChoice === 'scissors') ||
            (humanChoice === 'paper' && computerChoice === 'rock') ||
            (humanChoice === 'scissors' && computerChoice === 'paper')
        ) {
            // handle win scenario
            humanScore++
            console.log(`You win! ${humanChoice} beats ${computerChoice}`)
            return
        }
        // ELSE handle lose scenario
        computerScore++
        console.log(`You lose! ${humanChoice} loses to ${computerChoice}`)
    }

    playRound(getHumanChoice(), getComputerChoice())
    playRound(getHumanChoice(), getComputerChoice())
    playRound(getHumanChoice(), getComputerChoice())
    playRound(getHumanChoice(), getComputerChoice())
    playRound(getHumanChoice(), getComputerChoice())

    console.log('==================')
    console.log('Final Score:')
    console.log('Player: ', humanScore)
    console.log('Computer: ', computerScore)

    alert('Game Over! Open devtools console to view results!')
}

playGame()
