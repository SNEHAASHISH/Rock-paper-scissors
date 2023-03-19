setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

//DOM
const btnRules = document.querySelector('#rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')
const CHOICES = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "rock",
        beats: "scissors"
    },
    {
        name: "scissors",
        beats: "paper"
    },
]
const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results__result')
const resultWinner = document.querySelector('.results__winner');
const resultText = document.querySelector('.results__text');
const playAgainBtn = document.querySelector('.play-again');
const yourScoreNumber = document.querySelector('.your__score__number');
const compScoreNumber = document.querySelector('.comp__score__number');
const nextBtn = document.querySelector('.next');
let compScore = 0;
let yourScore = 0;

//Game Logic
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice);
    });
})

function choose(choice) {
    const aichoice = aiChoose()
    displayResults([choice, aichoice])
    displayWinner([choice,aichoice])
}

function aiChoose() {
    const random = Math.floor(Math.random()*CHOICES.length)
    return CHOICES[random]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" /> 
                </div>
            `
        }, idx * 1000)
    });

    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());
        if (userWins) {
            resultText.innerHTML = "YOU WIN <br> AGAINST PC";
            playAgainBtn.innerText = "PLAY AGAIN";
            keepScore(1);
            resultDivs[0].classList.toggle('winner');
        } else if (aiWins) {
            resultText.innerHTML = "YOU LOST <br> AGAINST PC";
            resultDivs[1].classList.toggle('winner');
            playAgainBtn.innerText = "PLAY AGAIN";
            keepScore(-1);
        } else {
            resultText.innerHTML = "TIE UP"
            playAgainBtn.innerText = "REPLAY";
        }
        resultWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    if (point === 1) {
        yourScore += 1;
        yourScoreNumber.innerText = yourScore;
    } else if (point === -1) {
        compScore += 1;
        compScoreNumber.innerText = compScore;
    }
}


nextBtn.addEventListener('click', showCelebration);

function showCelebration() {
    if (yourScore > compScore) {
        const celebrationDiv = document.createElement('div');
        celebrationDiv.classList.add('celebration');
        document.body.appendChild(celebrationDiv);
    }
}


// Play Again
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden');
    resultDivs.forEach(resultDiv => {
        resultDiv.classList.toggle('winner');
    });

    resultDivs.forEach( resultDiv => {
        resultDiv.innerHTML = ""
        resultDiv.classList.remove('winner')
    })

    resultText.innerText = ""
    resultWinner.classList.toggle('hidden')
    resultText.innerText = ""

    //resultDivs.classList.toggle("show-winner");
    resultDivs.forEach(resultDiv => {
        resultDiv.classList.toggle('show-winner');
    });
    resultsDiv.classList.add('hidden');
})

// Show/Hide Rules
btnRules.addEventListener('click', () => {
    console.log('Rules clicked');
    modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
    console.log('X clicked');
    modalRules.classList.toggle('show-modal')
});