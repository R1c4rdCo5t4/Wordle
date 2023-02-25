import { readFileContents, writeFileContents, readlines } from "../utils/io.js"
import errors from "../utils/errors.js"
import { play } from "../model/wordle-game.js"


async function getAllWords() {
    return await readlines("./db/words.txt")
}

async function getNewWord() {
    const allWords = await getAllWords()
    const word = allWords[Math.floor(Math.random() * allWords.length)]
    return word
}


async function playGame(guess, gameId) {

    const games = await loadAllGames()
    const game = games[gameId]
    const words = await getAllWords()

    if (!game || game.isOver) throw errors.INVALID_PARAMETER('gameId')
    if (!guess) throw errors.INVALID_PARAMETER('guess')

    const result = words.includes(guess) ? await play(guess, game) : game
    await storeGame(result, games, gameId)
    return result
}


async function newGame() {
    const games = await loadAllGames()

    const game = {
        id: games.length,
        word: await getNewWord(),
        guesses: 6,
        guessedWords: [],
        isOver: false,
        won: false
    }

    await storeGame(game)

    return game
}

async function storeGame(game, games, gameId) {
    if (!games) games = await loadAllGames()
    if (!gameId) games.push(game)
    else games[gameId] = game
    
    await writeFileContents("./db/games.json", JSON.stringify(games, null, 2))
}



async function loadAllGames() {
    const json = await readFileContents("./db/games.json")
    const games = await JSON.parse(json)
    return games
}

async function getGame(gameId) {
    const games = await loadAllGames()
    const game = games[gameId]
    if (!game) {
        throw errors.INVALID_PARAMETER('gameId')
    }
    return game
}


export default {
    newGame,
    playGame,
    getGame
}