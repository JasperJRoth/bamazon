const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'df5e349b2902dd7e14d0cff3f7afdb59',
    database : 'bamazon'
});

connection.connect();

connection.query("select * from products", function(err, res){
    if(err) throw err;
    connection.pause();

    res.forEach(row => {
        console.log(`id: ${row.item_id} - ${row.product_name} - price: ${row.price} - remaining: ${row.stock_quantity}`)
    });
    
    inquirer.prompt({
        type: "number",
        name: "id",
        message: "Enter the id of the item you would like to purchase (0 for no purchase)",
        default: 0
    }).then(function(ans){
        var id = ans.id;
        if(ans.id <= 0){
            console.log("Cancelling Transaction...");
            connection.end();
        }else{
            inquirer.prompt({
                type: "number",
                name: "quantity",
                message: "How many would you like to purchase? (0 for no purchase)",
                default: 0
            }).then(function(ans2){
                var quantity = ans2.quantity;
                if(quantity <= 0){
                    console.log("Cancelling Transaction...");
                    connection.end();
                }else{
                    confirmOrder(id, quantity);
                }
                
            });
        }
    });
});

function confirmOrder(id, quantity){
    connection.resume();

    connection.query("select * from products where item_id = ?", id, function(err, res){
        if(err) throw err;
        connection.pause();

        var item = res[0];
        
        if(item.stock_quantity < quantity){
            console.log("Insufficient quantity!");
            connection.end();
        }else{
            console.log(`${quantity}x ${item.product_name} - TOTAL: $${item.price * quantity}`);
            inquirer.prompt({
                type: "confirm",
                name: "conf",
                message: "Would you like to complete the transaction?"
            }).then(function(ans){
                if(!ans.conf){
                    console.log("Cancelling Transaction...");
                    connection.end();
                }else{
                    completeOrder(id, quantity, item.price * quantity);
                }
            });
        }
    });
}

function completeOrder(id, quantity, totalCost){
    connection.resume();

    connection.query("update products set stock_quantity = stock_quantity - ? where item_id = ?", [quantity, id], function(err){
        if(err) throw err;
        connection.end();

        console.log("Transaction completed.");
        console.log(`Total cost: $${totalCost}`);
    });
}