import { colors } from '../utils/colors.js'



function wordHint(guessWord, correctWord) {

	if (guessWord.length != correctWord.length) {
		throw new Error("Words must be the same length.")
	}
	let output = ""
	for (let i = 0; i < guessWord.length; i++) {
		if (guessWord[i] == correctWord[i]) output += colors.green + guessWord[i]
		else if (correctWord.includes(guessWord[i])) output += colors.yellow + guessWord[i]
		else output += colors.red + guessWord[i] 
	}
	output += colors.lightgrey
	console.log(output)
}

export async function play(guess, game) {

	wordHint(guess, game.word)
	if (guess == game.word) {
		console.log("You guessed the word!")
		game.isOver = true
		return game
	}
	
	console.log("Incorrect guess.")
	game.guesses--
	game.guessedWords.push(guess)
	
	if (game.guesses == 0) {
		console.log("You are out of guesses.")
		game.isOver = true
	}
	else {
		console.log(`You have ${game.guesses} guesses left.`)
	}
	return game

}


