//Q1
const fs = require("fs");

//fs.readFile('students.txt', "utf8", (err, data) => {
//    if(err){
//        console.error(err);
//        return;
//    }
//    console.log(data);
//})

//Q1.bis
//try{
//    const data = fs.readFileSync("students.txt","utf8");
//    console.log(data);
//}catch{
//    console.err(err);
//}

//Q2
console.log("Q2");
try{
    const data = fs.readFileSync("students.txt","utf8");
    console.log(data);
    const regexLine = /[0-9]+.*/g;
    const regexNumber = /([0-9]+).*/;
    var datasNotes = data.match(regexLine);
    console.log(datasNotes);
    datasNotes.forEach(element => {
        var buffer = null;
        buffer = regexNumber.exec(element);
        //console.log(buffer);
        if(parseInt(buffer[1]) > 17){
            console.log("réponse : " + element);
        }
    })
}catch(err){
    console.log(err);
}

//Q3
console.log("Q2");
var studient = "";
var bestNote = 0;
try{
    const data = fs.readFileSync("students.txt","utf8");
    console.log(data);
    const regexLine = /[0-9]+.*/g;
    const regexNumber = /([0-9]+).*/;
    var datasNotes = data.match(regexLine);
    console.log(datasNotes);
    datasNotes.forEach(element => {
        var buffer = null;
        buffer = regexNumber.exec(element);
        //console.log(buffer);
        if(parseInt(buffer[1]) > bestNote){
            studient = element;
            bestNote = parseInt(buffer[1]);
        }
    })
}catch(err){
    console.log(err);
}
console.log("réponse : " + studient);

//Q4
console.log("Q4");
var students = [];
try{
    const data = fs.readFileSync("students.txt","utf8");
    console.log(data);
    const regexLine = /[0-9]+.*/g;
    students = data.match(regexLine);
}catch(err){
    console.log(err);
}
console.log("students : " + students);
console.log("student : " + students[1]);

//Q5
students.sort();
console.log(students);

//Q6
