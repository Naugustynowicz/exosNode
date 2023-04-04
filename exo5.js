var readline = require('readline');

const students = ["Alan", "Sonia", "Sophie"];
rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Aloha > ');
rl.prompt();

rl.on('line', function(line){
    students.forEach(element => {
        if(line.trim().toLowerCase() === element.toLowerCase()){
            console.log("Find!");
            process.exit(0);
        }
    })
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day !');
    process.exit(0);
})