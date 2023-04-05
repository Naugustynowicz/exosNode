exports.shuffle = function(array) {
    var newArray = [];
    while(array.length > 0){
        newArray.push(array.splice(Math.floor(Math.random()*array.length)));
    }
    return newArray;
};