import { div, span } from "./dom.js"

let typingWord = ""
const totalGuesses = 6
const wordLength = 5
const colors = {
    green: '#338f28',
    yellow: '#cfcf00',
    gray: '#dcdcdc8f',
}

export const renderPage = async () => {
    const game = {
        word: await getNewWord(),
        guesses: []
    }
    document.getElementById("main-content").replaceChildren(renderGame(game))
    document.addEventListener('keydown', (e) => onKeyPress(e, game))
}

export const renderGame = (game) =>
    div({ class: "game" },
        ...game.guesses.map((word, idx) => renderWord(word, game.word, idx)),
        ...(Array(totalGuesses - game.guesses.length).fill().map((_, idx) => renderWord("_____", game.word, idx + game.guesses.length))),
        div({ id: "feedback" }, "You have 6 guesses")
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
    const allWords = await getAllWords()
    const attempt = game.guesses.length
    const word = document.getElementById(`word-${attempt}`)
    const feedback = document.getElementById(`feedback`)

    if (game.guesses === totalGuesses || !allWords.includes(guess)) return
    typingWord = ""
    game.guesses.push(guess)

    if (guess === game.word) {
        ([...word.children]).forEach(letter => letter.style["background-color"] = colors.green)
        game.isOver = true
        feedback.textContent = "You won!"
        return
    }

    ([...word.children]).forEach((letter, idx) => letter.style["background-color"] = getTileColor(idx, guess, game.word))
    if (game.guesses.length === totalGuesses) {
        game.isOver = true
        feedback.textContent = "Game over!"
        feedback.appendChild(span({}, `The word was '${game.word}'`))
    } else {
        feedback.textContent = `You have ${totalGuesses - game.guesses.length} guesses`
    }
}

async function onKeyPress(event, game) {
    if(game.isOver) return
    const wordDiv = document.getElementById(`word-${game.guesses.length}`)
    const tile = wordDiv.children[typingWord.length]

    switch (event.key) {
        case 'Enter':
            if (typingWord.length !== wordLength || typingWord.includes('_')) break
            await play(typingWord, game)
            break

        case 'Backspace':
            if (typingWord.length <= 0) break

            const prev = wordDiv.children[typingWord.length - 1]
            if (prev.textContent === '_') prev.style.background = 'transparent'
            else prev.textContent = '_'
            animate(prev)
            prev.style.color = 'transparent'
            prev.style.border = '2px solid rgba(211, 211, 211, 0.4)';
            typingWord = typingWord.slice(0, typingWord.length - 1)
            break

        case ' ':
            if (typingWord.length >= wordLength) break
            typingWord += '_'
            tile.textContent = '_'
            tile.style.border = '2px solid rgba(211, 211, 211, 1)';
            animate(tile)
            break

        default:
            const letter = event.key.toLowerCase()
            if (letter.length === 1 && letter >= 'a' && letter <= 'z' && letter !== ' ' && typingWord.length < wordLength && !game.isOver) {
                typingWord += letter
                tile.textContent = letter
                tile.style.color = 'white'
                animate(tile)
            }
    }
}

function animate(tile){
    const delay = 500
    tile.classList.add('scale-up-center');
    setTimeout(
        _ => tile.classList.remove('scale-up-center'),
        delay
    )
}

async function getAllWords() {
    const response = await fetch("words.txt")
    const words = await response.text()
    return words.toString().split("\n")
}

async function getNewWord() {
    const allWords = await getAllWords()
    return allWords[Math.floor(Math.random() * allWords.length)]
}

document.addEventListener('DOMContentLoaded', renderPage)
