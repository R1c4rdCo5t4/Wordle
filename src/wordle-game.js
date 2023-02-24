import { input, readlines, colors } from './utils.js'



function wordHint(guessWord, correctWord) {

	if (guessWord.length != correctWord.length) {
		throw "Words must be the same length."
	}
	let output = ""
	for (let i = 0; i < guessWord.length; i++) {
		if (guessWord[i] == correctWord[i]) {
			output += colors.green + guessWord[i]
		}
		else if (correctWord.includes(guessWord[i])) {
			output += colors.yellow + guessWord[i]
		}
		else {
			output += colors.red + guessWord[i] 
		}
	}
	output += colors.lightgrey

	console.log(output)

	
}


export class WordleGame {
	constructor() {
		this.allWords = readlines("../words.txt")
		this.currentWord = this.allWords[Math.floor(Math.random() * this.allWords.length)]
		this.guessedWords = []
        this.guesses = 6
        this.isOver = false
	}

	guess(word) {
		this.guesses--
		return word == this.currentWord
	}
    
    async play(guess) {
 
        if (this.guess(guess)) {
            console.log("You guessed the word!")
            this.isOver = true
        }
        else {
            wordHint(guess, this.currentWord)
            console.log("Incorrect guess.")
            this.guessedWords.push(guess)
		}
		
		console.log(`You have ${this.guesses} guesses left.`)
    }
}


