const {PRICE_RULE, PRODUCTS, VALID_PRODUCT_IDS} = require('./constants');

//setup command line input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//reading from console and invoking scan and total function
readline.question("Enter comma seperated productId: ", (product) => {
    readline.close();
    let productIds  = [];
    try{
        productIds = product.split(",");
        productIds = productIds.map(ele => Number(ele));
    }catch(error){
        console.log("Invalid input format");
        process.exit();
    }

    try{
        const checkoutObject = {}; //Contains an object having productId as key and its quantity as value
        for (let i = 0; i < productIds.length; i++) {
            validate(productIds[i]);
            scan(productIds[i], checkoutObject);
        }
        total(checkoutObject);
    }catch(error){
        console.log("Error in calculating checkout price", error);
        process.exit();
    }
});


function validate(product){
    try{
        if(isNaN(product)){
            throw new Error("product id should be number");
        } else if (!VALID_PRODUCT_IDS.includes(product)){
            throw new Error("Invalid product id");
        }

    }catch(error){
        console.log(error);
        process.exit();
    }
}


//Create an object having productId as key and its quantity as value
function scan(product, checkoutObject) {
  checkoutObject[product] ? checkoutObject[product]++ : (checkoutObject[product] = 1);
}

//takes checkout objects, calulates the total and prints total value in the console
function total(checkoutObject) {
    try{
        let total = 0;
        for (let [key, value] of Object.entries(checkoutObject)) {
            total += calculatePrice(key, value);
        }
        console.log("$", total);
    }catch(error){
        console.log("Error in calculating price of product", error);
    }
}

//calculates price sum of a product based on price rule
function calculatePrice(productId, productQuantity) {
    try{
        const currentProduct = PRODUCTS.find((ele) => ele.id == productId);
        const price = currentProduct.price * productQuantity;
        let discount = 0;
        const currentPriceRule = PRICE_RULE.find(
            (ele) => ele.id == currentProduct.priceRuleId
        );
    
        if (!currentPriceRule) {
            return price;
        }
    
        switch (currentPriceRule.id) {
            case 1:
            if (productQuantity >= currentPriceRule.thresholdQuantity) {
                const freeItem = Math.floor( productQuantity / currentPriceRule.thresholdQuantity );
                discount = freeItem * currentProduct.price;
            }
            break;
            case 2:
            if (productQuantity >= currentPriceRule.thresholdQuantity) {
                discount = currentPriceRule.discountAmount * productQuantity;
            }
            break;
        }
        return price - discount;
    }catch(error){
        console.log("Error in calculating price", error);
        process.exit();
    }
}