



export async function play(guess, game) {

	if (game.isOver) return game
	
	game.guesses--
	game.guessedWords.push(guess)

	if (guess == game.word) {
		console.log("You guessed the word!")
		game.isOver = true
		game.won = true
		return game
	}
	
	console.log("Incorrect guess.")

	if (game.guesses == 0) {
		console.log("You are out of guesses.")
		game.isOver = true
	}
	else {
		console.log(`You have ${game.guesses} guesses left.`)
	}
	return game

}


