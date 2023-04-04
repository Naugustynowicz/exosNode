require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

if(process.env.APP_EN){
    console.log("Je suis en production");
}else{
    console.log("Je suis en développement");
}