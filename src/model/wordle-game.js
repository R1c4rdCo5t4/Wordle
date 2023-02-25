

const colors = {
	green: '#338f28',
	yellow: '#cfcf00',
	gray: '##dcdcdc8f',
}


function wordHint(guessWord, correctWord) {

	if (guessWord.length != correctWord.length) {
		throw new Error("Words must be the same length.")
	}
	let pairs = []
	for (let i = 0; i < guessWord.length; i++) {
		const guessWLower = guessWord[i].toLowerCase()
		const guessWUpper = guessWord[i].toUpperCase() 
		let color
		switch(true) {
			case guessWLower == correctWord[i]: color = colors.green; break
			case correctWord.includes(guessWLower): color = colors.yellow; break
			default: color = colors.gray
		}
		pairs.push({letter: guessWUpper, color: color})

	}
	return pairs
}

export async function play(guess, game) {

	if (game.isOver) return game
	
	const hints = wordHint(guess, game.word)
	game.guesses--
	game.guessedWords.push(hints)

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


