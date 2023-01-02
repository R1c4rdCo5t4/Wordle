import { readFileSync } from "fs"
import * as readline from "readline"



class WordleGame {
    constructor() {
        this.allWords = readFileSync("words.txt", "utf-8").split("\n")
        this.currentWord = this.allWords[Math.floor(Math.random() * this.allWords.length)]
        this.guessedWords = []
        this.guesses = 6
    }

    // checks if guess is correct
    guess(word) {
        this.guesses--
        if (this.guessedWords.includes(word)) return false
        return word === this.currentWord
    }

    // checks if game is over
    isOver() {
        return this.guesses === 0 || this.guessedWords.includes(this.currentWord)
    }
}


async function input(question) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  })
  return new Promise((resolve) => {
      rl.question(question, answer => {
          rl.close()
          resolve(answer)
      })
  })
}

async function newGame() {
  const game = new WordleGame()

  while (!game.isOver()) {
    console.log(`You have ${game.guesses} guesses left.`)
    let guess = await input("Enter a word: ")

    while (!guess || guess.length != 5) {
      console.log("Please enter a five letter word.")
      guess = await input("Enter a word: ")
    }

    const isCorrect = game.guess(guess)

    if (isCorrect) {
      console.log("Congratulations, you won!")
    } else {

      console.log("Sorry, that was incorrect.")
    }
  }

  console.log(`The word was: ${game.currentWord}`)

}


newGame()

