import { readFile, writeFile } from 'node:fs/promises'
import errors from "./errors.js"


async function getAllWords() {
    const words = await readFile("./db/words.txt")
    return words.toString().split("\r\n")
}

async function getNewWord() {
    const allWords = await getAllWords()
    return allWords[Math.floor(Math.random() * allWords.length)]
}

async function newGame() {
    const games = await getAllGames()
    const game = {
        id: games.length,
        word: await getNewWord(),
        guesses: []
    }
    await storeGame(game)
    return game
}

async function getGame(gameId) {
    if(!gameId) throw errors.INVALID_PARAMETER('gameId')
    const games = await getAllGames()
    const game = games[gameId]
    if (!game) throw errors.NOT_FOUND(gameId)
    return game
}

async function getGames() {
    return await getAllGames()
}

async function updateGame(id, guess) {
    const words = await getAllWords()
    if (!words.includes(guess)) throw errors.INVALID_PARAMETER('guess')
    const game = await getGame(id)
    game.guesses.push(guess)
    await storeGame(game, id)
}

async function storeGame(game, id) {
    const games = await getAllGames()
    if (!id) games.push(game)
    else games[id] = game
    await writeFile("./db/games.json", JSON.stringify(games, null, 2))
}

async function getAllGames() {
    const json = await readFile("./db/games.json")
    return await JSON.parse(json)
}

export default { newGame, updateGame, getGame, getGames }
