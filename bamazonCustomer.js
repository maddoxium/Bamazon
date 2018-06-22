

var mysql = require("mysql")

var inquirer = require("inquirer")
require ("console.table");
var connection= mysql.createConnection({
    host: "localhost",
    port: 3306,


    user : "root",

password: "shadow12",


database: "bamazon",
})


connection.connect(function(err){
    if (err){
        console.error("It messed up connecting"+ err.stack);
    }

        loadProducts();
    
});

function loadProducts(){
    connection.query ("Select * from products", function (err,res){
        if (err) throw err;

            console.table (res);
            promptForItems(res);
    })
}

function promptForItems(inventory){
    inquirer
    .prompt([
        {
            type: "input",
            name: "choice",
        message: "ID of product you'd like please [leave with Q]",
        validate: function(val){
            return !isNaN(val) || val.toLowerCase()=== "q";

        }
        }
    ])
    .then(function(val){
        checkIfLeave (val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory (choiceId, inventory);
        if (product){
            promptForQuantity(product);

        }
        else {
            console.log ("\n We don't carry that item");
            loadProducts();

        }
    });
}

function promptForQuantity(product){
    inquirer
    .prompt([
        {
            type:"input",
            
            message: "how many ya want? [quit with q]",
            name: "quantity",
            validate: function(val){
                return val > 0 || val.toLowerCase() === "q"
            }
        }
    ])
    .then(function (val){
        checkIfLeave(val.quantity);
        var quantity = parseInt (val.quantity);

        if (quantity > product.stock_quantity){
            console.log ("\ Not enough")
            loadProducts();
        }
        else{
            makePurchase(product,quantity);
        }
    });
}
function makePurchase(product, quantity){
    connection.query(
        "Update products set stock_quantity = stock_quantity - ? where item_id = ?",
        [quantity,product.item_id],
        function(err,res){
            console.log("\nSuccessfully bought" +quantity + "" +product.product_name);
            loadProducts();
        }

    );

}

function checkInventory (choiceId , inventory) {
    for (var i = 0; i < inventory.length; i++){
        if (inventory[i].item_id=== choiceId){
            return inventory[i];
        }
    }
    return null;
}

function checkIfLeave(choice) {
    if  (choice.toLowerCase()==="q"){
        console.log ("Later~");
        process.exit(0);
    }
}