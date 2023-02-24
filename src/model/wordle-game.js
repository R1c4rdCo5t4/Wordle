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

function newGuess(word, game) {
	game.guesses--
	return word == game.correctWord
}

export async function play(guess, game) {

	if (newGuess(guess)) {
		console.log("You guessed the word!")
		game.isOver = true
	}

	wordHint(guess, game.correctWord)
	console.log("Incorrect guess.")
	game.guessedWords.push(guess)
	console.log(`You have ${game.guesses} guesses left.`)
	return game

}


