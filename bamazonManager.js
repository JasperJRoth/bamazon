const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'df5e349b2902dd7e14d0cff3f7afdb59',
    database : 'bamazon'
});

connection.connect();

inquirer.prompt({
    type: "list",
    name: "action",
    message: "What action would you like to take?",
    choices: [{
        name: "View Products for Sale",
        value: viewProducts
    },
    {
        name: "View Low Inventory",
        value: viewLowInventory
    },
    {
        name: "Add to Inventory",
        value: addToInventory
    },
    {
        name: "Add New Product",
        value: addNewProduct
    },
    {
        name: "Cancel",
        value: endProgram
    }]
}).then(function(ans){
    ans.action();
});

function viewProducts(){
    console.log("viewing products...");

    connection.query("select * from products", function(err, res){
        if(err) throw err;

        res.forEach(row => {
            console.log(`id: ${row.item_id} - ${row.product_name} - price: ${row.price} - remaining: ${row.stock_quantity}`);
        });

        connection.end();
    })
}

function viewLowInventory(){
    console.log("viewing low inventory...");

    connection.query("select * from products", function(err, res){
        if(err) throw err;

        res.forEach(row => {
            if(row.stock_quantity < 25){
                console.log(`id: ${row.item_id} - ${row.product_name} - price: ${row.price} - remaining: ${row.stock_quantity}`);
            }
            
        });

        connection.end();
    })
}

function addToInventory(){
    console.log("adding to inventory...");

    inquirer.prompt([{
        type: "number",
        name: "id",
        message: "Enter the id of the item you would like to increase the stock of"
    },
    {
        type: "number",
        name: "quantity",
        message: "Enter the amount you would like to increase the stock by"
    }]).then(function(ans){
        connection.query("update products set stock_quantity = stock_quantity + ? where item_id = ?", [ans.quantity, ans.id], function(err, res){
            if(err) throw err;

            console.log(`Successfully added stock to item`)

            connection.end();
        });
    });
}

function addNewProduct(){
    console.log("adding new product...");

    inquirer.prompt([{
        type: "input",
        name: "product_name",
        message: "Enter the name of the new product"
    },
    {
        type: "number",
        name: "department_id",
        message: "Enter the department id of the new product (0 for none)"
    },
    {
        type: "number",
        name: "price",
        message: "Enter the price of the new product"
    },
    {
        type: "number",
        name: "stock_quantity",
        message: "Enter the amount of the new product in stock"
    }]).then(function(ans){
        if(ans.department_id === 0){
            connection.query("insert into products (product_name, price, stock_quantity) values (?, ?, ?)", [ans.product_name, ans.price, ans.stock_quantity], function(err, res){
                if(err) throw err;

                console.log("Added new item");

                connection.end();
            });
        }else{
            connection.query("insert into products (product_name, department_id, price, stock_quantity) values (?, ?, ?)", [ans.product_name, ans.department_id, ans.price, ans.stock_quantity], function(err, res){
                if(err) throw err;

                console.log("Added new item");

                connection.end();
            });
        }
    });
}

function endProgram(){
    connection.end();
}