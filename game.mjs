//#region 
import * as readlinePromises from 'node:readline/promises';
import fs from "node:fs"
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });
//#endregion

import { HANGMAN_UI } from './graphics.mjs';
import { GREEN, RED, WHITE, RESET } from './colors.mjs';
import { SPLASH_SCREEN } from './splashscreen.mjs';
import GAME_DICTIONARY from './dictionary.mjs';

let dictionary = GAME_DICTIONARY.en; 
let difficulty = HANGMAN_UI.medium;

print(SPLASH_SCREEN);
//await rl.question("PRESS ENTER TO START");

setTimeout(ChooseLanguage, 3000);

async function ChooseLanguage (){
    let languageAnswer = await rl.question(dictionary.chooseYourLanguage);

    if(languageAnswer == "no"){
        dictionary = GAME_DICTIONARY.no;
    }

    ChooseDifficulty();

}

async function ChooseDifficulty (){
    let difficultyAnswer = await rl.question(dictionary.chooseYourDifficulty);

    if(difficultyAnswer == "E"){
        difficulty = HANGMAN_UI.easy
    } else if(difficultyAnswer == "H"){
        difficulty = HANGMAN_UI.hard
    } 

    playGame();
}

const word = getRandomWord();
let guessedWord = createGuessList(word.length);
let wrongGuesses = [];
let isGameOver = false;

async function playGame(){
    do {
    

        updateUI();
    
        // Gjette en bokstav || ord.  (|| betyr eller).
        let guess = (await rl.question(dictionary.guessPrompt)).toLowerCase();
    
        if (isWordGuessed(word, guess)) {
            print(dictionary.winCelebration, GREEN);
            isGameOver = true;
        }
        else if (word.includes(guess)) {
    
            uppdateGuessedWord(guess);
    
            if (isWordGuessed(word, guessedWord)) {
                print(dictionary.winCelebration, GREEN);
                isGameOver = true;
            }
        } else {
            print(dictionary.youGuessedWrong, RED);
            wrongGuesses.push(guess);
    
            if (wrongGuesses.length >= HANGMAN_UI.length - 1) {
                isGameOver = true;
                updateUI();
                print(dictionary.youLost, RED);
            }
    
        }
    
        // Har du lyst å spille igjen?
    
    } while (isGameOver == false)
    
    process.exit();
}



function uppdateGuessedWord(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] == guess) {
            guessedWord[i] = guess;
            // Banana og vi tipper a.
            // _ -> a
        }
    }
}

function createGuessList(length) {
    let output = [];
    for (let i = 0; i < length; i++) {
        output[i] = "_";
    }
    return output;
}

function isWordGuessed(correct, guess) {
    for (let i = 0; i < correct.length; i++) {
        if (correct[i] != guess[i]) {
            return false;
        }
    }

    return true;
}

function print(msg, color = WHITE) {
    console.log(color, msg, RESET);
}

function updateUI() {

    console.clear();
    print(guessedWord.join(""), GREEN);
    print(HANGMAN_UI[wrongGuesses.length]);
    if (wrongGuesses.length > 0) {
        print(dictionary.wrongGuesses + RED + wrongGuesses.join() + RESET);
    }
}

function getRandomWord() {

    const words = ["Kiwi", "Car", "Dog", "etwas"];
    let index = Math.floor(Math.random() * words.length);
    return words[index].toLowerCase();

}