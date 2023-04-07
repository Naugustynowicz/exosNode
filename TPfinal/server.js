require('dotenv').config();
//console.log(process.env); // remove this after you've confirmed it is working
const pug = require('pug');
const http = require("http");
const dayjs =  require("dayjs");

const hostname = process.env.APP_LOCALHOST;
const port = process.env.APP_PORT;

let students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];

students.forEach(student => {
    student.birth = dayjs(student.birth).format("DD/MM/YYYY");
})

const server = http.createServer((req,res) => {
    const url = req.url.replace('/','');

    if (req.method === "POST") {
        let body = "";
        req.on("data", (data) => {
            body +=data;
        })

        req.on("end", () => {
            const replacer = new RegExp(/\+/, "g");
            console.log(body.toString().split(/[&=]/));
            const data = body.toString().split(/[&=]/);
            let name = data[1].trim();
            let birth = dayjs(data[3].trim()).format("DD/MM/YYYY")

            if (name && birth) students.push({name, birth});

            res.writeHead(301, { Location: `http://${hostname}:${port}`});
            res.end();
        });
    }

    switch(url){
        case '':
            try{
                const renderTemplate = pug.compileFile('./view/home.pug', { pretty: true});
                const result = renderTemplate({students});
                console.log(result);
                res.end(result);
            }catch (err){
                console.log('Erreur de compilation :\n');
                console.log(err.message);
            }
        break;
        case 'users':
            try{
                const renderTemplate = pug.compileFile('./view/users.pug', { pretty: true});
                const result = renderTemplate({students});
                console.log(result);
                res.end(result);
            }catch (err){
                console.log('Erreur de compilation :\n');
                console.log(err.message);
            }
        break;
    }

}).listen(8000);


