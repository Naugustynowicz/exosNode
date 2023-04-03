const nombreADeviner = parseInt(Math.random()*100 + 1);
console.log(nombreADeviner);

process.stdin.setEncoding('utf8');
var chunk = null;

console.log("test1");

// Listen for the 'data' event, then call myCallback...


let myCallback = (userInput) => {        
    let input = parseInt(userInput);
    if(input !== nombreADeviner){
        process.stdin.on('data', myCallback);
    } else {
        console.log("gg");
    }
};

process.stdin.on('data', myCallback);


