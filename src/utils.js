import url from 'url'
import { readFileSync } from "fs"
import * as readline from "readline"



export async function input(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	return new Promise((resolve) => {
            rl.question(question, (answer) => {
            rl.close()
            resolve(answer)
		})
	})
}


export function readlines(path) {
    const __dirname = url.fileURLToPath(new URL(path, import.meta.url))
    return readFileSync(__dirname, "utf-8").split("\r\n")
}


export const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[93m',
    lightgrey: '\x1b[37m'
}

