import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'
import * as readline from "readline"
import url from 'url'

export const readFileContents = async (filePath) => {
    return readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
    })
}

export const writeFileContents = async (filePath, contents) => {
    return writeFile(filePath, contents, (err) => {
        if (err) throw err
    }) 
}


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

export async function readlines(path) {
    const __dirname = url.fileURLToPath(new URL(path, import.meta.url))
    return await readFileContents(__dirname, "utf-8").split("\r\n")
}
