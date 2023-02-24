import { WordleGame } from './wordle.js'


let game = new WordleGame()

while (!game.isOver && game.guesses > 0) {
	await game.play()
}

console.log(`The word was: ${game.currentWord}`)


