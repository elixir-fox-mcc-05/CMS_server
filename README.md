# CMS_server API Documentation

# DIGI-STORE

Hello! Welcome to Digi-Store!<br>
Below are the list of URL that you can use<br>

|NO  | URL                               | Method        | Purpose                       |
|----| -------------                     |:-------------:|:-----------------------------:|
|1   | /user/register                    | POST          | Register a user               |
|2   | /user/login                       | POST          | Login a user                  |
|3   | /user/order                       | GET           | Get All order from customer   |
|4   | /user/order                       | PATCH         | Update order status           |
|5   | /product                          | GET           | Get all products              |
|6   | /product                          | POST          | Create a product              |
|7   | /product/:id                      | GET           | Find product based on id      |
|8   | /product/:id                      | PUT           | Edit a product detail         |
|9   | /product/:id                      | PATCH         | Update a product stock        |
|10  | /product/:id                      | DELETE        | delete a product              |
|11  | /customer/                        | GET           | Get customer detail           |
|12  | /customer/                        | PUT           | Update customer detail        |
|13  | /customer/register                | POST          | Register customer account     |
|14  | /customer/login                   | POST          | Login for customer            |
|15  | /customer/cart                    | GET           | Get all customer cart         |
|16  | /customer/cart                    | POST          | Create cart for customer      |
|17  | /customer/:CartId                 | GET           | Get customer cart by id       |
|18  | /customer/:CartId                 | POST          | Add product to cart           |
|19  | /customer/:CartId                 | PUT           | Update Order from cart        |
|20  | /customer/:CartId                 | PATCH         | Update order status           |
|21  | /customer/:CartId/:CartProductId  | DELETE        | Delete order                  |

<br><br>

-----
## 1. /user/register
-----
* method: POST
* purpose: Register account for new user
* req.body: <br>
    ```javascript
        {
            "name": "tina",
            "role": "administrator",
            "email": "tina@contoh.com",
            "password": "abcdef",
        }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
    ```javascript
        {
            "User": {
                "id": 16,
                "name": "tina",
                "role": "administator",
                "email": "tina@contoh.com",
            },
            "notif": "Register successful!"
        }
    ```
* error response: <br>
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
    {
        "err": {
            { "message": "Name is required"},
            { "message": "Role is required"},
            { "message": "Email is required"},
            { "message": "Password is required"}
        }
    }
    ```

    OR
    * code: 400 <br>
    * cause: attribute name has less than 3 characters
    * content: <br>
    ```javascript
    {
        "err": {
            { "message": "Name must include minimum 3 characters"}
        }
    }
    ```

    OR
    * code: 400 <br>
    * cause: email is registered before (not unique)
    * content: <br>
    ```javascript
    {
        "err": {
            { "message": "email must be unique"}
        }
    }
    ```

    OR
    * code: 400 <br>
    * cause: wrong email format
    * content: <br>
    ```javascript
    {
        "err": {
            { "message": "Please input email with correct format"}
        }
    }
    ```

    OR
    * code: 400 <br>
    * cause: attribute password has less than 6 characters
    * content: <br>
    ```javascript
    {
        "err": {
            { "message": "Password must include minimum 6 characters"}
        }
    }
    ```

    OR
    * code: 500 <br>
    * content: <br>
    ```javascript
    {
        "err": "internal server error"
    }
    ```

<br><br>

-----
## 2. /user/login
-----
* method: POST
* purpose: Login into user account
* req.body: <br>
    ```javascript
        {
            "username": "tono@contoh.com",
            "password": "xxxxxx"
        }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec",
            'user': {
                'id': 21,
                'name': 'tono',
                'email': 'tono@contoh.com'    
            },
            "notif": "Welcome back tono!"
        }
    ```
* error response: <br>
    * code: 401 <br>
    * cause: email is wrong or never registered before
    * content: <br>
    ```javascript
        {
            "err": "Please input registered email",
        }
    ```

    OR

    * code: 401 <br>
    * cause: password is wrong
    * content: <br>
    ```javascript
        {
            "err": "Please input correct password",
        }
    ```

    OR
    * code: 500 <br>
    * content: <br>
    ```javascript
    {
        "err": "internal server error"
    }
    ```

<br><br>

-----
## 3. /user/order
-----
* method: GET
* purpose: get all order from customer
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
        "data": [
            {
            "id": 2,
            "quantity": 1,
            "status": "Created",
            "CartId": 1,
            "ProductId": 12,
            "createdAt": "2020-06-03T15:20:59.802Z",
            "updatedAt": "2020-06-03T15:20:59.802Z",
            "Product": {
                "id": 12,
                "name": "Samsung Galaxy Note 10+",
                "description": "The Samsung Galaxy Note 10 Plus has such an immersive 6.8-inch display that you'll sometimes forget you're not watching TV. And the back of the Galaxy Note 10 Plus is just as captivating as the front.",
                "image_url": "https://images.samsung.com/is/image/samsung/uk-galaxy-note10plus-sm-n975-sm-n975fzsdbtu-179669580?$PD_GALLERY_L_JPG$",
                "price": 18000000,
                "stock": 50,
                "category": "Smartphone",
                "createdAt": "2020-06-03T15:20:59.739Z",
                "updatedAt": "2020-06-03T15:20:59.739Z"
                },
            "Cart": {
                "id": 1,
                "CustomerId": 5,
                "createdAt": "2020-06-03T15:20:59.791Z",
                "updatedAt": "2020-06-03T15:20:59.791Z",
                "Customer": {
                "id": 5,
                "name": "Ibun Bagiya Kusumo",
                "address": "Ds. Abdul Muis No. 471, Administrasi Jakarta Timur 20751, DKI Jakarta",
                "email": "ibunkusumo@contoh.com",
                "phone": "097091135883",
                "createdAt": "2020-06-03T15:20:59.782Z",
                "updatedAt": "2020-06-03T15:20:59.782Z"
                }
            },
            .....
        ]
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not log in
    * content: <br>
        ```javascript
        {
            "err": "please login first"
        }
        ```
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 4. /user/order
-----
* method: PATCH
* purpose: update order status
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request body: <br>
```javascript
    {
        "status": "shipping",
        "id"    : 2
    }
```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
        "data": [1],
        "notif": 'Order status successfully updated!'
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not log in
    * content: <br>
        ```javascript
        {
            "err": "please login first"
        }
        ```
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 5. /product
-----
* method: GET
* purpose: Create new product
* request body: <br>
    ```javascript
        {
            "name": "New Smartphone",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "category": "Smartphone",
            "price": 10000000,
            "stock": 1000,
            "image_url": "http://contoh.com/img.jpg",
        }
    ```
* success response: <br>
    * code: 201 <br>
    * content: <br>
        ```javascript
        {
            "data": [
                {
                "id": 12,
                "name": "New Smartphone",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "category": "Smartphone",
                "price": 10000000,
                "stock": 1000,
                "image_url": "http://contoh.com/img.jpg",
                },
                .....
            ]
        }
        ```
* error response: <br>
    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 6. /product
-----
* method: POST
* purpose: Create new product
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request body: <br>
    ```javascript
        {
            "name": "New Smartphone",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "category": "Smartphone",
            "price": 10000000,
            "stock": 1000,
            "image_url": "http://contoh.com/img.jpg",
        }
    ```
* success response: <br>
    * code: 201 <br>
    * content: <br>
        ```javascript
        {
            "data": {
                "id": 12,
                "name": "New Smartphone",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "category": "Smartphone",
                "price": 10000000,
                "stock": 1000,
                "image_url": "http://contoh.com/img.jpg",
            },
            "notif": 'Product successfully created!'
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Name is required" },
                { "message": "Price is required" },
                { "message": "Stock is required" },
                { "message": "Category is required" }
            }
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute name has less than 3 characters
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Name must include minimum 3 characters" }
            }
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute image_url has wrong url format
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Please input correct url format for Image URL" }
            }
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute price and/or stock has negative value
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Price can not have value below zero" },
                { "message": "Stock can not have value below zero" }
            }
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 7. /product/:id
-----
* method: GET
* purpose: Show Product based on ID
* request params: id <br>
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "data": {
                {
                    "id": 12,
                    "name": "New Smartphone",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                    "category": "Smartphone",
                    "price": 10000000,
                    "stock": 1000,
                    "image_url": "http://contoh.com/img.jpg",
                },
            }
        }
        ```

* error response: <br>
    * code: 404 <br>
    * cause: product id is not found in database
    * content: <br>
        ```javascript
        {
            "err": "Product not found"
        }
        ```

    OR
    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 8. /product/:id
-----
* method: PUT
* purpose: Edit Product detail based on ID
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: id <br>
* request body: <br>
    ```javascript
        {
            "name": "New Smartphone",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "category": "Smartphone",
            "price": 10000000,
            "stock": 1000,
            "image_url": "http://contoh.com/img.jpg",
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "notif": "Product successfully updated"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Name is required" },
                { "message": "Price is required" },
                { "message": "Stock is required" },
                { "message": "Category is required" }
            }
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute name has less than 3 characters
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Name must include minimum 3 characters" }
            }
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute image_url has wrong url format
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Please input correct url format for Image URL" }
            }
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute price and/or stock has negative value
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Price can not have value below zero" },
                { "message": "Stock can not have value below zero" }
            }
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 9. /product/:id
-----
* method: PATCH
* purpose: Update Product stock based on ID
* request params: id <br>
* request body: <br>
    ```javascript
        {
            "stock": 12,
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "notif": "Product successfully updated"
        }
        ```
* error response: <br>
    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 10. /product/:id
-----
* method: DELETE
* purpose: Delete product based on ID
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: id <br>
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "notif": "Product successfully removed!"
        }
        ```
* error response: <br>
    * code: 404 <br>
    * cause: product id is not found in database
    * content: <br>
        ```javascript
        {
            "err": "Product not found"
        }
        ```

    OR

    * code: 401 <br>
    * cause: not login
    * content: <br>
        ```javascript
        {
            "err": "please login first"
        }
        ```

    OR
    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```
<br><br>

-----
## 11. /customer
-----
* method: GET
* purpose: Get customer detail
* request header: <br>
    ```javascript
        {
            "token": "ajsdnkjnfdkjwqdjfcmwjcmkwjdckwmrrmfjrmdcjdfjrngibvmew",
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
            {
                "data": {
                    "id": 1,
                    "name": "Narji Tarihoran S",
                    "address": "Jln. Zamrud No. 547, Cilegon 91197, Banten",
                    "email": "narjitarihoran@contoh.com",
                    "phone": "087960216678",
                    "createdAt": "2020-06-03T15:20:59.763Z",
                    "updatedAt": "2020-06-03T15:52:10.966Z"
                }
            }
        ```
* error response: <br>

    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
        "err": "Please login first"
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 12. /customer
-----
* method: PUT
* purpose: Update customer detail
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request body: <br>
    ```javascript
        {
            "name": "Narji Tarihoran S",
            "address": "Jln. Zamrud No. 547, Cilegon 91197, Banten",
            "email": "narjitarihoran@contoh.com",
            "phone": "087960216678",
        }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "notif": "Customer info successfully updated!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Name is required"},
                { "message": "Address is required"},
                { "message": "Email is required"},
                { "message": "Phone is required"}
            ]
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute name has less than 3 characters
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Name must include minimum 3 characters"}
            ]
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute email has wrong url format
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Please input email with correct format"}
            ]
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute phone has less characters
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Phone must include at least 7 digits and maximum 15 digits"}
            ]
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 13. /customer/register
-----
* method: POST
* purpose: Register new customer account
* request body: <br>
    ```javascript
        "data": {
            "name": "Narji Tarihoran S",
            "address": "Jln. Zamrud No. 547, Cilegon 91197, Banten",
            "email": "narjitarihoran2@contoh.com",
            "phone": 087960216678,
            "password": 123456
        }
    ```
* success response: <br>
    * code: 201 <br>
    * content: <br>
        ```javascript
        {
            "data": {
                "id": 3
                "name": "Narji Tarihoran S",
                "address": "Jln. Zamrud No. 547, Cilegon 91197, Banten",
                "email": "narjitarihoran2@contoh.com",
                "phone": 087960216678,
            }
            "notif": "Register successful!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Name is required"},
                { "message": "Address is required"},
                { "message": "Email is required"},
                { "message": "Phone is required"},
                { "message": "Password is required"}
            ]
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute name has less than 3 characters
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Name must include minimum 3 characters"}
            ]
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute email has wrong url format
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Please input email with correct format"}
            ]
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute phone has less characters
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Phone must include at least 7 digits and maximum 15 digits"}
            ]
        }
    ```

    OR
    * code: 400 <br>
    * cause: attribute password has less than 6 characters
    * content: <br>
    ```javascript
        {
            "err": [
                { "message": "Password must include minimum 6 characters"}
            ]
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 14. /customer/login
-----
* method: POST
* purpose: Login for customer
* request body: <br>
    ```javascript
        {
            "email": "narjitarihoran@contoh.com",
            "password": 123456,
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
            {        
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5hcmppIFRhcmlob3JhbiBTIiwiZW1haWwiOiJuYXJqaXRhcmlob3JhbkBjb250b2guY29tIiwiaWF0IjoxNTkxMjMyOTAzfQ.brsGF4TtDdm9a_F6Hsa-TnlEgUQrKvbii-z6x7Mxyyg",
            "data": {
                "id": 1,
                "name": "Narji Tarihoran S",
                "email": "narjitarihoran@contoh.com"
                },
            "notif": "Welcome Back Narji Tarihoran S!"
            }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: wrong email
    * content: <br>
    ```javascript
        {
        "err": "Please input registered email"
        }
    ```
    OR

    * code: 401 <br>
    * cause: wrong password
    * content: <br>
    ```javascript
        {
        "err": "Please input correct password"
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```
<br><br>

-----
## 15. /customer/cart
-----
* method: GET
* purpose: Get all customer order
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
                    {
            "data": [
                {
                "id": 5,
                "quantity": 1,
                "status": "Paid",
                "CartId": 3,
                "ProductId": 10,
                "createdAt": "2020-06-03T15:20:59.802Z",
                "updatedAt": "2020-06-03T15:20:59.802Z",
                "Product": {
                    "id": 10,
                    "name": "Mac Pro 2020",
                    "description": "The new Mac Pro starts for the 8-core model with 32 GB of RAM and a 256-GB solid-state drive. That can be configured up to a 28-core model with 1.5 terabytes of RAM.",
                    "image_url": "https://images-na.ssl-images-amazon.com/images/I/71crxsLhDxL.jpg",
                    "price": 75000000,
                    "stock": 10,
                    "category": "PC",
                    "createdAt": "2020-06-03T15:20:59.739Z",
                    "updatedAt": "2020-06-03T15:20:59.739Z"
                },
                "Cart": {
                    "id": 3,
                    "CustomerId": 1,
                    "createdAt": "2020-06-03T15:20:59.791Z",
                    "updatedAt": "2020-06-03T15:20:59.791Z"
                }
            },
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 16. /customer/cart
-----
* method: POST
* purpose: Create cart for customer
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request body: <br>
    ```javascript
        {
            "CustomerId": 2
        },
    ```
* success response: <br>
    * code: 201 <br>
    * content: <br>
        ```javascript
        {
            "data": {
                "id": 16,
                "CustomerId": 2,
                "updatedAt": "2020-06-04T01:33:08.251Z",
                "createdAt": "2020-06-04T01:33:08.251Z"
            },
            "notif": "Cart successfully created!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 17. /customer/:CartId
-----
* method: GET
* purpose: find all customer cart based on CartId
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: CartId <br>
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "data": [
                {
                "id": 1,
                "quantity": 1,
                "status": "Created",
                "CartId": 1,
                "ProductId": 2,
                "createdAt": "2020-06-03T15:20:59.802Z",
                "updatedAt": "2020-06-03T15:20:59.802Z"
                },
                {
                "id": 2,
                "quantity": 1,
                "status": "Created",
                "CartId": 1,
                "ProductId": 12,
                "createdAt": "2020-06-03T15:20:59.802Z",
                "updatedAt": "2020-06-04T00:46:45.450Z"
                }
            ]
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 18. /customer/:CartId
-----
* method: POST
* purpose: add product to cart (create order)
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: CartId <br>
* request body: <br>
    ```javascript
        {
            "ProductId": 5,
            "quantity": 1,
            "status": "Created"
        },
    ```
* success response: <br>
    * code: 201 <br>
    * content: <br>
        ```javascript
        {
            "data": {
                "id": 24,
                "quantity": 1,
                "status": "Created",
                "CartId": 2,
                "ProductId": 5,
                "updatedAt": "2020-06-04T01:40:40.669Z",
                "createdAt": "2020-06-04T01:40:40.669Z"
            },
            "notif": "Product successfully added to Cart!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute quantity is empty
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Quantity is required" },
            }
        }
    ```
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 19. /customer/:CartId
-----
* method: PUT
* purpose: Update order based on CartId
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: CartId <br>
* request body: <br>
    ```javascript
        {
            "id": 2,
            "ProductId": 3,
            "quantity": 2,
            "status": 'Paid',
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "data": [1],
            "notif": "Cart successfully updated!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 400 <br>
    * cause: attribute(s) are empty
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Status is required" },
                { "message": "CartId is required" },
                { "message": "ProductId is required" },
                { "message": "Quantity is required" }
            }
        }
    ```

    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 20. /customer/:CartId
-----
* method: PATCH
* purpose: Update order status based on CartId
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: CartId <br>
* request body: <br>
    ```javascript
        {
            "status": "Shipping"
        },
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "data": [1]
            "notif": "Cart status successfully updated!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```

    OR

    * code: 400 <br>
    * cause: attribute status is empty
    * content: <br>
    ```javascript
        {
            "err": {
                { "message": "Status is required" }
            }
        }
    ```
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>

-----
## 21. /customer/:CartId/:CartProductId
-----
* method: DELETE
* purpose: Edit Product detail based on ID
* request headers: <br>
    ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
        }
    ```
* request params: CartId and CartProductId <br>
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```javascript
        {
            "notif": "Product successfully removed from cart!"
        }
        ```
* error response: <br>
    * code: 401 <br>
    * cause: not login
    * content: <br>
    ```javascript
        {
            "err": "Please login first",
        }
    ```
    OR
    * code: 404 <br>
    * cause: cart not found
    * content: <br>
    ```javascript
        {
            "err": "Cart not found"
        }
    ```
    
    OR

    * code: 500 <br>
    * content: <br>
        ```javascript
        {
            "err": "internal server error"
        }
        ```

<br><br>
