import { platform } from "os";

const GAME_DICTIONARY = {
    no : {
    wrongGuesses: "Feil gjetninger: ",
    guessPrompt: "Gjett bokstav eller ord: ",
    winCelebration: "GGs, du gjettet riktig ord!",
    chooseYourLanguage: "Velg ditt språk (no/en): ",
    chooseYourDifficulty: "Velg ønsket vanskelighetsgrad (l(E)tt, (M)edium eller (H)ard: ",
    youGuessedWrong: "Du gjettet feil. Prøv igjen! ",
    youLost: "Du tapte.",
    playAgain: "Prøve igjen? (O)kay/(N)ei: "
    },

    en: {
        wrongGuesses: "Wrong guesses: ",
        guessPrompt: "Guess a letter or a word: ",
        winCelebration: "GGs, you guessed the correct word!",
        chooseYourLanguage: "Choose your language (no/en): ",
        chooseYourDifficulty: "Choose difficulty level - (E)asy, (M)edium or (H)ard: ",
        youGuessedWrong: "You guessed wrong. Try again! ",
        youLost: "You lost!",
        playAgain: "Try again? (O)kay/(N)o: "
    }
}


let no = GAME_DICTIONARY.no;
let en = GAME_DICTIONARY.en;

export default GAME_DICTIONARY