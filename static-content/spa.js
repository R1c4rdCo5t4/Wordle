import requests from "./requests.js"
import { a, div, span } from "./dom.js"

let game = null
let word = ""

const colors = {
	green: '#338f28',
	yellow: '#cfcf00',
	gray: '#dcdcdc8f',
}

export const renderPage = async () => {
    game = await requests.newGame()
    console.log(game)
    document.getElementById("main-content").replaceChildren(
        renderGame(game)
    )
    document.addEventListener('keydown', onKeyPress)
}

export const renderGame = (game) =>
    div({ class: "game" },
        ...game.guesses.map((word, idx) => renderWord(word, game.word, idx)),
        ...(Array(6 - game.guesses.length).fill().map((_, idx) => renderWord("_____", game.word, idx + game.guesses.length))),
        span({ class: "guess word" }),
        div({ id: "feedback"})
    )


export const renderWord = (word, correctWord, wordIdx) =>
    div({ class: "word", id: "word-" + wordIdx },
        ...Array.from(word).map((letter, idx) =>
            span({ class: "letter", style: `color: ${getTileColor(idx, word, correctWord)}; color: transparent;` }, letter)
        )
    )


function getTileColor(index, guessWord, correctWord) {
	if (guessWord.length !== correctWord.length) {
		throw new Error("Words must be the same length.")
	}

    const letter = guessWord[index].toLowerCase()
    const correct = []

    // search for correct letters indices
    for (let i = 0; i < guessWord.length; i++) {
        if (guessWord[i].toLowerCase() === correctWord[i]) {
            correct.push(i)
        }
    }
    if(letter === correctWord[index]) return colors.green
    if(correctWord.includes(letter) && !correct.includes(correctWord.indexOf(letter))) return colors.yellow
    return colors.gray
}

async function play(guess, game) {

    const attempt = game.guesses.length
    const word = document.getElementById(`word-${attempt}`)
    const feedback = document.getElementById(`feedback`)

    if (game.guesses === 6) return

    await requests.updateGame(game.id, guess)
    game.guesses.push(guess)

    if (guess === game.word) {
        ([...word.children]).forEach(letter => letter.style["background-color"] = colors.green)
        game.isOver = true
        feedback.textContent = "You win!"
        return
    }

    ([...word.children]).forEach((letter, idx) => letter.style["background-color"] = getTileColor(idx, guess, game.word))
    if (game.guesses.length === 6) {
        game.isOver = true
        feedback.textContent = "Game over!"
    } else {
        feedback.textContent = `You have ${6 - game.guesses.length} guesses.`
    }
}

async function onKeyPress(event) {
    if(game.isOver) return
    const typingWord = document.getElementById(`word-${game.guesses.length}`)
    const tile = typingWord.children[word.length]

    switch (event.key) {
        case 'Enter':
            if (word.length !== 5 || word.includes('_')) break
            await play(word, game)
            word = ""
            break

        case 'Backspace':
            if (word.length <= 0) break

            const prev = typingWord.children[word.length - 1]
            if (prev.textContent === '_') prev.style.background = 'transparent'
            else prev.textContent = '_'

            animate(prev, 500)
            prev.style.color = 'transparent'
            prev.style.border = '2px solid rgba(211, 211, 211, 0.4)';
            word = word.slice(0, word.length - 1)
            break

        case ' ':
            if (word.length >= 5) break
            word += '_'
            tile.textContent = '_'
            tile.style.border = '2px solid rgba(211, 211, 211, 1)';
            animate(tile, 500)
            break

        default:
            const letter = event.key.toLowerCase()
            if (letter.length === 1 && letter >= 'a' && letter <= 'z' && letter !== ' ' && word.length < 5 && !game.isOver) {
                word += letter
                tile.textContent = letter
                tile.style.color = 'white'
                animate(tile, 500)
            }
    }
}

function animate(tile, delay){
    tile.classList.add('scale-up-center');
    setTimeout(
        _=> tile.classList.remove('scale-up-center'),
        delay
    )
}

document.addEventListener('DOMContentLoaded', renderPage)