import {randomNumber} from "./random.js"

// VÅRA SPEL-ELEMENT
const player = document.querySelector('.player')
const computer = document.querySelector('.computer')

const drawButton = document.querySelector('.draw')
const doneButton = document.querySelector('.done')
const restartButton = document.querySelector('.restart')

// EVENT LISTENERS
drawButton.addEventListener('click', () => drawCard(deck[randomNumber()]))
doneButton.addEventListener('click', () => computerTurn())
restartButton.addEventListener('click', () => restart())

let playerPoints = []
let computerPoints = []

let playerSum = 0
let computerSum = 0

// SKAPAR EN KORTLEK
const colors = ['hearts', 'spades', 'clubs', 'diamonds']
const deck = []

for(let j = 0 ; j < colors.length ; j++) {
    for(let i = 1 ; i <= 13 ; i++) {


        deck.push({
            value: i > 10 ? 10 : i,
            src: `./assets/cards/${colors[j]}_${i}.png`
        })
    }
}

drawCardComputer(deck[randomNumber()])
drawCardComputer(deck[randomNumber()])
drawCard(deck[randomNumber()])
drawCard(deck[randomNumber()])


// DRA KORT
function drawCard(card) {
    const cardElement = document.createElement('img')
    cardElement.src = card.src
    cardElement.classList.add('card')

    calculatePoints(card)

    if(playerSum > 21) {
        youLose('beppe')
    }

    player.appendChild(cardElement)
}

function drawCardComputer(card) {
    const cardElement = document.createElement('img')
    cardElement.src = card.src
    cardElement.classList.add('card')

    calculatePointsComputer(card)

    if(computerSum > 21) {
        youLose('computer')
    }

    computer.appendChild(cardElement)
}

function computerTurn() {
    while(computerSum < 18) {
        drawCardComputer(deck[randomNumber()])
    }

    if(computerSum <= 21) {
        console.log( comparePoints() )
    }
}

function calculatePoints(card) {
    playerSum = 0

    playerPoints.push(card.value)
    console.log("calculate points")


    for(let i = 0 ; i < playerPoints.length ; i++) {
        // OM kortet som dras är ett ess, gör det här
        if(playerPoints[i] === 1) {
            console.log("is ace")
            if(playerSum + 11 <= 21) {
                playerSum += 11
            } 
            else {
                playerSum++
            }
        }
        else {
            playerSum += playerPoints[i]
        }
    }

    console.log("player sum:", playerSum)
}

function calculatePointsComputer(card) {
    computerSum = 0

    computerPoints.push(card.value)
    console.log("calculate points")


    for(let i = 0 ; i < computerPoints.length ; i++) {
        // OM kortet som dras är ett ess, gör det här
        if(computerPoints[i] === 1) {
            console.log("is ace")
            if(computerSum + 11 <= 21) {
                computerSum += 11
            } 
            else {
                computerSum++
            }
        }
        else {
            computerSum += computerPoints[i]
        }
    }

    console.log("computer sum:", computerSum)
}

function comparePoints() {
    if(playerSum > computerSum) {
        return "player wins"
    }
    else if(playerSum < computerSum) {
        return "computer wins"
    }
    else {
        return "its a draw"
    }
}

function youLose(name) {
    console.log(name + " lost")
}

function restart() {
    computer.innerHTML = null
    player.innerHTML = null

    playerSum = 0
    computerSum = 0

    playerPoints = []
    computerPoints = []

    drawCardComputer(deck[randomNumber()])
    drawCardComputer(deck[randomNumber()])

    drawCard(deck[randomNumber()])
    drawCard(deck[randomNumber()])
}