require('dotenv').config();

exports.fillMention = function(array) {
    array.forEach(element => {
        if(parseInt(element.note) >= 12){
            if(parseInt(element.note) >= 14){
                if(parseInt(element.note) >= 16){
                    element.mention = process.env.TRES_BIEN;
                } else{
                    element.mention = process.env.BIEN;
                }
            }else {
                element.mention = process.env.ASSEZ_BIEN;
            }
        } else{
            element.mention = process.env.PASSABLE;
        }
    });
};