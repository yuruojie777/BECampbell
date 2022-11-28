# BECampbell
A capstone project
## Development Evironment
<ul>
<li>react 17.0.2</li>
<li>antd 4.19.3</li>
<li>axios 0.26.1</li>
<li>react-dom 17.0.2</li>
<li>react-router-dom 5.3.0</li>
<li>react-scripts 5.0.0</li>
<li>umi-request 1.4.0</li>
</ul>

## Start
Go to root direction and 
```npm start```

## Product display

<div style="display:grid; grid-template-columns:1fr 1fr;">
  <img src="https://user-images.githubusercontent.com/57779340/204307018-269ae11f-31ab-4b4d-903d-9c10ea333d34.png" style="width:500px">
  <img src="https://user-images.githubusercontent.com/57779340/204306817-92351abe-1eb8-46aa-8d46-6958672404e9.png" style="width:500px">
  <img src="https://user-images.githubusercontent.com/57779340/204307316-5099e0d2-5c9f-44a6-a377-2ffd8a7c42a1.png" style="width:500px">
  <img src="https://user-images.githubusercontent.com/57779340/204307082-e803556b-7ee2-44fa-ae08-9a5f4b7608d1.png" style="width:500px">
  <img src="https://user-images.githubusercontent.com/57779340/204307112-0b64ba20-5ccf-4edf-9531-6ebcd14143c0.png" style="width:500px">
  <img src="https://user-images.githubusercontent.com/57779340/204307169-29c69aa0-11a4-4891-8c6c-4aa42104fa75.png" style="width:500px">
</div>

## Function introduction
This webapp aims to help BECampbell have a better management for their orders.

### Input an order into system
The staff has a role in the system to control the access of orders.(e.g. an administrator will be able to check all the orders while other roles may see part of them).
They are required to input necessary information into the system so that the order number can be generated or it will give an error message on the screen.

### Check orders
System provide a filter to allow all the users to group orders by some conditions like date, id etc. They are also able to see the detail of the order.

### Update orders
When an order got something wrong, role with writable access can update the order.

### Invoice
The system will generate a invoice with given template as long as the user select the orders they need.

### Master Data Upload
The system allows the users to upload one or more excel files to system and it will automatically read the information and generate them into structured data in database.
