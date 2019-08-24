# bamazon
## A Student Project -Not a real, funcitonal application

### Features

Bamazon has a cli for both customers and managers.

The customer cli allows the user to view as well as purchase inventory.

The manager cli allows you to view inventory, update inventory quantity and add new items to inventory.

### Customer CLI

The customer cli is used by running the bamazonCustomer.js file in node. When run, the application logs current inventory, stored in a mysql database. You then have the option to enter the id of the product you wish to buy, or 0 for none. Once you have your item selected, enter the quantity of the item you wish to purchse, then confirm; The product will then be removed from stock.

![Customer CLI](/images/bamazonCustomer.png)

### Manager CLI

The manager cli has four main functions:
  * View Products On Sale
    - For viewing inventory
  * View Low Inventory
    - For viewing only inventory with low stock
  * Add to Inventory
    - For adding stock to an existing item
  * Add New Product
    - For adding a new item
    
![Manager CLI](/images/bamazonManager.png)
