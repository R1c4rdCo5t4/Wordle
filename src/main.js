import { WordleGame } from './wordle-game.js'
import { input } from './utils.js'


let game = new WordleGame()

while (!game.isOver && game.guesses > 0) {
	
	let guess = ""
	do {
		guess = await input("Enter a word: ")
		if (!guess || guess.length != 5) {
			console.log("Please enter a five letter word.")
		}
		else break
	}
	while (true) 

	await game.play(guess)
}

console.log(`The word was: ${game.currentWord}`)


