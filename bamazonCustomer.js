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
      res.forEach(row => {
        console.log(`id: ${row.item_id} - ${row.product_name} - price: ${row.price} - remaining: ${row.stock_quantity}`)
      });
      connection.end();
      inquirer.prompt({
          type: "number",
          name: "id",
          message: "Enter the id of the item you would like to purchase (0 for no purchase)",
          default: 0
      }).then(function(ans){
        console.log(ans);
      });
  })