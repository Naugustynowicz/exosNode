const http = require("http");
const u = require("./src/shuffle");
const hostname = "localhost";
const port = "8000";
const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

const server = http.createServer((req,res) => {
    const url = req.url.replace('/','');
    
    if(url === 'favicon.ico'){
        res.writeHead(200,{'Content-Type':'image/x-icon'});
        
        res.end();
        return;
    }

    if(url === 'shuffle'){
        let shuffledUsers = u.shuffle(users);
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <title>Hello World</title>
                </head>
                <body>
                    <p>` + shuffledUsers + `</p>
                </body>
            </html>
        `);
    }

    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Hello World</title>
            </head>
            <body>
                <p>` + users + `</p>
            </body>
        </html>
    `);
});

server.listen(port, hostname, () => {
    console.log(`Server running ate http://${hostname}:${port}/`);
});