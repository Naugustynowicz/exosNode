const pug = require('pug');

//exemple de template PUG

const template = `
if user.isAdmin
    h1 Access granted
else
    h1 You must be logged as an administrator!
`;

// compile
const compileTemplate = pug.compile(template);    

compileTemplate({user: {isAdmin : true}});

// compileFile pour un fichier externe pug
const compileTemplate2 = pug.compileFile('template.pug');

compileTemplate2({user: {isAdmin : true}});

// Render

pug.render(template, {user: {isAdmin : true}}, (err, data) => {
    if (err) throw err;
    console.log(data);
})

// RenderFile pour un fichier externe pug

pug.renderFile('template.pug', {user: {isAdmin : true}}, (err, data) => {
        if (err) throw err;
        console.log(data);
    })

//gestion erreur compile

try {
    const compileTemplate = pug.compile(template);
    //......
}catch (err){
    res.writeHead(500, { 'Content-Type' : 'text/plain'});
    res.end(err.message);
}