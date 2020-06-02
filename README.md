# CMS_server

## User Controller

> `REGISTER`

Requests : 

method: `POST`

url: `http://localhost:3000/register`

Request body: 

- first_name: `irwan`,
- last_name: `syafani`,
- email: `irwan@gmail.com`,
- password: `1234`,
- role: `admin`

Responds : 

## `Success`

Status : `CREATED`

Code : `201`

~~~
{
    id: 1,
    email: irwan@gmail.com
}
~~~

## `Error`

Status: `Bad Request`

Code: `400`

if you password length is less than 4, then error with show you


Request : 
- password : `12`

Responds :
~~~
{
    "name": "Sequelize validation error :",
    "data": [
        "invalid length password"
    ]
}
~~~

> Login

Requests : 

method: `POST`

url: `http://localhost:3000/login`

Request body: 

- email: `irwan@gmail.com`,
- password: `1234`

## `SUCCESS`

Responds :

Status : `OK`

Code : `200`

~~~
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiaW5nZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTU4OTY5NzgxNn0.xf2tIcphG2MjAnaQwJZOGZQuFCv1XFutQwhndAyn0co",
    "isAdmin": false
}
~~~

## `Error`

Request : 

- email : `tegar@gmail.com` ( this email not resgistered yet )

Responds :

~~~
{
    "err": "NOT FOUND"
}
~~~

> Get All Products

Requests : 


method: `GET`

url: `http://localhost:3000/products`

- access_token : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiaW5nZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTU4OTY5NzgxNn0.xf2tIcphG2MjAnaQwJZOGZQuFCv1XFutQwhndAyn0c`

## `Success`

Responds :

Status : `OK`

Code : `200`

~~~
{
    "products": [
        {
            "id": 23,
            "name": "ZARA",
            "image_url": "https://static.zara.net/photos//mkt/worldwide/02_WORLDWIDE.jpg?imwidth=1024&ts=01589584211000",
            "price": 2000,
            "stock": 91,
            "category": "upper",
            "createdAt": "2020-05-16T05:53:24.046Z",
            "updatedAt": "2020-05-16T11:29:26.520Z"
        },
        {
            "id": 24,
            "name": "ZARA socks",
            "image_url": "https://static.zara.net/photos///2020/V/0/3/p/6389/600/423/2/w/500/6389600423_1_1_1.jpg?ts=1586890197011",
            "price": 15000,
            "stock": 19,
            "category": "socks",
            "createdAt": "2020-05-16T08:11:08.399Z",
            "updatedAt": "2020-05-16T11:29:32.712Z"
        },
        ...
    ]
}
~~~

> Get One Products


Requests : 


method: `GET`

url: `http://localhost:3000/products/24`


Remember when we access t `login` then server will give `access_token`? access_token as `prerequisite` before you get data

- access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpcndhbkBnbWFpbC5jb20iLCJpYXQiOjE1ODk0MTkzMjd9.xt-JHUNKIC9oVEP7vBNWfbv8gZ0bB-zvC-ntPDSLwEI`

## `Success`

Responds :

Status: `200`

Code : `OK`

~~~
        {
            "id": 24,
            "name": "ZARA socks",
            "image_url": "https://static.zara.net/photos///2020/V/0/3/p/6389/600/423/2/w/500/6389600423_1_1_1.jpg?ts=1586890197011",
            "price": 15000,
            "stock": 19,
            "category": "socks",
            "createdAt": "2020-05-16T08:11:08.399Z",
            "updatedAt": "2020-05-16T11:29:32.712Z"
        }
~~~

## `Error`

Responds: ( `when you try to not send access_token` )

Status : `Bad Request`

Code : `400`

~~~
{
    "name": "Indentify your status error",
    "data": "you're not logged in yet"
}
~~~

> Add Item to Cart

Requests: 

method: `POST`

url: `http://localhost:3000/carts`

Request Body:

- UserId: `14`
- ProductId : `23`
- quantity: `1`

Request Header :

- access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiaHVtZWRAZ21haWwuY29tIiwiaWF0IjoxNTg5NjExODIyfQ.c5_brfywFj4VDRCNgf7s2PqHtrWSoPYPtBVJhWGKJIE`

 ## `Success`

 Responds : 

 Status: `Created`

 Code: `201`

~~~
{
    "new_cart": {
        "id": 4,
        "UserId": 14,
        "ProductId": 23,
        "quantity": 1,
        "updatedAt": "2020-05-17T07:08:20.750Z",
        "createdAt": "2020-05-17T07:08:20.750Z"
    }
}
~~~

## `Error`

Responds :

Status: `Bad Request`

Code: `400`

~~~
{
    "name": "Indentify your status error",
    "data": "you're not logged in yet"
}
~~~

> Get All Cart

Requests: 

method: `GET`

url: `http://localhost:3000/carts`

- access_token : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiaHVtZWRAZ21haWwuY29tIiwiaWF0IjoxNTg5NjExODIyfQ.c5_brfywFj4VDRCNgf7s2PqHtrWSoPYPtBVJhWGKJIE`

## `Success`

Responds :

Status: `OK`

Code: `200`

~~~
{
    "carts": [
        {
            "id": 4,
            "UserId": 14,
            "ProductId": 23,
            "quantity": 2,
            "createdAt": "2020-05-17T07:08:20.750Z",
            "updatedAt": "2020-05-17T07:13:49.948Z",
            "User": {
                "id": 14,
                "first_name": "humed",
                "last_name": "humed",
                "email": "humed@gmail.com",
                "password": "$2a$04$Mhjjod4VYcHGXYOSHx7yZ.hcvNdveqQun0HoFEMLc7aeyZb3UY06.",
                "role": "customer",
                "createdAt": "2020-05-16T02:29:30.459Z",
                "updatedAt": "2020-05-16T02:29:30.459Z"
            },
            "Product": {
                "id": 23,
                "name": "ZARA",
                "image_url": "https://static.zara.net/photos//mkt/worldwide/02_WORLDWIDE.jpg?imwidth=1024&ts=01589584211000",
                "price": 2000,
                "stock": 91,
                "category": "upper",
                "createdAt": "2020-05-16T05:53:24.046Z",
                "updatedAt": "2020-05-16T11:29:26.520Z"
            }
        }
    ]
}
~~~

## Error

access_token doesn't exist

Responds: 

Status: `Bad request`

Code : `400`

~~~
{
    "name": "Indentify your status error",
    "data": "you're not logged in yet"
}
~~~

> Delete Cart ( In case:  user paid for the product )

Requests:

method: `DELETE`

url: `http://localhost:3000/carts/4`

access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiaHVtZWRAZ21haWwuY29tIiwiaWF0IjoxNTg5NjExODIyfQ.c5_brfywFj4VDRCNgf7s2PqHtrWSoPYPtBVJhWGKJIE`

## `Success`

Responds:

Status: `No Content`

Code: `204`

~~~
    server will respond blank code
~~~

## `Error`

if the product has paid by user, server will give respond

Responds:

Status: `Bad Request`

Code: `404`

~~~
{
    "err": "NOT FOUND"
}
~~~

let's we try it on cloud: 

`https://cms-client-52ec6.web.app/`