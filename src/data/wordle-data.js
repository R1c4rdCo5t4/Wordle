import { readFileContents, writeFileContents, readlines } from "../utils/io.js"
import errors from "../utils/errors.js"
import { play } from "../model/wordle-game.js"

async function getNewWord() {
    const allWords = await readlines("./db/words.txt")
    const word = allWords[Math.floor(Math.random() * allWords.length)]
    return word
}


async function newPlay(guess, gameId) {
    const games = await loadAllGames()
    const game = games[gameId]
    if (!game) {
        throw errors.INVALID_PARAMETER('gameId')
    }
    const result = await play(guess)
    return result
}


async function newGame() {
    const games = await loadAllGames()

    const game = {
        id: games.length,
        word: await getNewWord(),
        guesses: 6,
        guessedWords: [],
        isOver: false
    }

    await storeGame(game)

    return game
}

async function storeGame(game, games) {
    if (!games) {
        games = await loadAllGames()
    }

    games.push(game)
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
    newPlay,
    getGame

}