//data
const questions = [
    {
        id: 1,
        text: "Which keyword declares a block-scoped variable that can be reassigned?",
        choices: ["var", "let", "const"],
        correct: "let"
    },
    {
        id: 2,
        text: "What does Array.prototype.map() return?",
        choices: [
            "A filtered array",
            "A transformed array of the same length",
            "A single aggregated value"
        ],
        correct: "A transformed array of the same length"
    },
    {
        id: 3,
        text: "Which operator is strict equality?",
        choices: ["==", "===", "="],
        correct: "==="
    },
    {
        id: 4,
        text: "What does reduce() typically compute?",
        choices: [
            "Transforms each item individually",
            "Finds the first match",
            "Aggregates to a single value"
        ],
        correct: "Aggregates to a single value"
    }
];
//input
const readline = require("readline");

const rl = readline.createInterface({
    input : process.stdin, // read from standard input (keyboard)
    output : process.stdout // write to standard output (console)
});
function ask(promptText) {
    return new Promise(resolve => {
        rl.question(promptText, answer => resolve(answer.trim()));
    });

}
//helpers
function formatQuestion(q,idx) {
    const header = `\nQ${idx + 1}. ${q.text}\n`;
    const body = q.choices
        .map((choice,i) => `${i + 1}) ${choice}`)
        .join("\n");
    return header + body + "\nYour answer (1-" + q.choices.length + "): ";
}

function isCorrect(q, SelectedIdx) {
    const userChoice = q.choices[SelectedIdx];
    return userChoice === q.correct;
}
function getCorrectChoice(q) {
    return q.choices.find(c => c === q.correct);
}

//main quiz loop
async function runquiz() {
    console.log("=== javascript Quiz ===");
    console.log("Type the number of your choice and press Enter.\n");
    const results = [];
    for (let i = 0;i < questions.length; i++){
        const q = questions[i];
        const raw = await ask(formatQuestion(q,i))
        //convert to 0 base index
        const selectedIdx = Number(raw) - 1;
        if(
            Number.isNaN(selectedIdx) || selectedIdx < 0 || selectedIdx >= q.choices.length
        ){
            consle.log("invalid input, Marked as incorrect.");
            results.push({
                id: q.id,
                correct: false,
                userChoice: null,
                correctChoice: getCorrectChoice(q)
            });
            continue;
        }
        const correctNow = isCorrect(q,selectedIdx);
        if(correctNow){
            console.log("Correct!\n");
        }else{
            console.log(`Incorrect. correct answer: ${getCorrectChoice(q)} `);
        }
        results.push({
            id: q.id,
            correct: correctNow,
            userChoice: q.choices[selectedIdx],
            correctChoice: getCorrectChoice(q)
        });
    }
    summarize(results);
    rl.close();

}
//summary
function summarize(results) {
    const score = results.reduce((acc, r) => acc + (r.correct ? 1 : 0), 0);
    const total = results.length;
    const percent = Math.round((score / total) * 100);
    console.log("\n=== Results ===");
    console.log(`Score: ${score}/${total} (${percent}%)`);
    const wrongOnes = results.filter(r => !r.correct);
    if(wrongOnes.length > 0 ) {
        console.log("\nReview the questions you missed:");
        wrongOnes
            .map((r,i) =>{
                const q = questions.find(q => q.id === r.id);
                return `${i + 1}) ${q.text}\n
                -your answer: ${r.userChoice ?? "invalid / none"}
                -correct : ${r.correctChoice}`;
            })
            .forEach(line => console.log(line));
    }
}

runquiz();