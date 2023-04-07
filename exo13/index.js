const pug = require('pug');

// SYNTAXE de pug

const compileTemplate3 = pug.compileFile('template.pug');

const menuItems = {menuItem : [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false }
]};

compileTemplate3(menuItems);

pug.renderFile('template.pug', menuItems, (err, data) => {
    if (err) throw err;
    console.log(data);
})