import { colors } from '../utils/colors.js'



function wordHint(guessWord, correctWord) {

	if (guessWord.length != correctWord.length) {
		throw new Error("Words must be the same length.")
	}
	let pairs = {}
	for (let i = 0; i < guessWord.length; i++) {
		const guessWLower = guessWord[i].toLowerCase()
		const guessWUpper = guessWLower.toUpperCase() 
		let color = null
		switch(true) {
			case guessWLower == correctWord[i]: 
				color = colors.green; 
				break;
			case correctWord.includes(guessWLower): 
				color = colors.yellow; 
				break;
			default: 
				color = colors.red;
		}
		pairs[guessWUpper] = color
		//if (guessWord[i] == correctWord[i]) output += colors.green + guessWord[i]
		//else if (correctWord.includes(guessWord[i])) output += colors.yellow + guessWord[i]
		//else output += colors.red + guessWord[i] 
	}
	console.log(pairs)
	return pairs
}

export async function play(guess, game) {

	if(game.isOver) return game
	const hints = wordHint(guess, game.word)
	if (guess == game.word) {
		console.log("You guessed the word!")
		game.isOver = true
		return game
	}
	
	console.log("Incorrect guess.")
	game.guesses--
	game.guessedWords.push(hints)
	
	if (game.guesses == 0) {
		console.log("You are out of guesses.")
		game.isOver = true
	}
	else {
		console.log(`You have ${game.guesses} guesses left.`)
	}
	return game

}


