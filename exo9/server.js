const fs = require('fs'),
    http = require('http');

function update() {
    console.log("this is running!")
}


http.createServer(function(req, res) {

    if(req.url === '/all'){
        // __dirname donne le chemin absolu pour trouver le fichier
        const __dirname = "./Data/";
    // ici la politique des urls indiquera le chemin à suivre pour récupérer le fichier
        fs.readFile(__dirname + req.url + ".json", (err, data) => {
            // on gère les erreurs et surtout on retourne une page 404 si il y a un problème
            if(err){
                res.writeHead(404);
                res.end(JSON.stringify(err));
                // Il ne faut oublier de sortir de la fonction pour ne pas exécuter la suite du script
                return;
            }
            // si tout se passe bien on retourne les données
            res.writeHead(200);
            res.end(data);
        });
    }

    if(req.url.indexOf("search") > -1){
        // __dirname donne le chemin absolu pour trouver le fichier
        const __dirname = "./Data/";
        const url = req.url.replace('/search/','');
        // ici la politique des urls indiquera le chemin à suivre pour récupérer le fichier
        fs.readFile(__dirname + url + ".json", (err, data) => {
            // on gère les erreurs et surtout on retourne une page 404 si il y a un problème
            if(err){
                res.writeHead(404);
                res.end(JSON.stringify(err));
                // Il ne faut oublier de sortir de la fonction pour ne pas exécuter la suite du script
                return;
            }
            // si tout se passe bien on retourne les données
            res.writeHead(200);
            res.end(data);
        });
    }

    if(req.url === "/"){
        res.end(`
            <!DOCTYPE html>
            <html>

            <body>

            <div id="div1">
            <p id="p1">This is a static paragraph.</p>
            </div>

            <br>
            <input type="text" name="human_input" value="">
            <br>
            <input type="button" value="Submit" onclick="update()">

            </body>
            </html>
        `);
    }

}).listen(8000);