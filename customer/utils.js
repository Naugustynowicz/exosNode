exports.name = "Johns";

exports.fillPriceTTC = function(priceHT) {
    priceHT.forEach(element => {
        const tva = 1.2;
        element["priceTTC"] = element["priceHT"] * tva; 
    });
};

//exports multiples
exports.Utils = {
   product : function (name, price){},
   count : 0,
   model : {
       name : null,
       email : null,
   }
}