const fs = require("fs");
const readline = require("readline");
const json = JSON.parse( fs.readFileSync("./students.json") );

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt("OHAI> ");
  rl.prompt();
  
  rl.on("line", (line) => {
    json.students.forEach(element => {
        if(element.name.toLowerCase() === line.trim().toLowerCase()){
            var sum = 0;
            element.notes.forEach(note => {
                sum += parseInt(note);
            })
            sum /= element.notes.length;
            console.log(element.name + " : " + sum);
        }
    });
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  });
  