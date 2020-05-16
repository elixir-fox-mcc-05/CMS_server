# CMS_server API Documentation

# DIGI-STORE

Hello! Welcome to Digi-Store!<br>
Below are the list of URL that you can use<br>

| URL                   | Method        | Purpose                   |
| -------------         |:-------------:|:-------------------------:|
| /user/register        | POST          | Register a user           |
| /user/login           | POST          | Login a user              |
| /product              | GET           | Get all products          |
| /product              | POST          | Create a product          |
| /product/:id          | GET           | Find product based on id  |
| /product/:id          | PUT           | Edit a product detail     |
| /product/:id          | DELETE        | Delete a product          |
<br><br>

-----
## /user/register
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
## /user/login
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
## /product
-----
* method: GET
* purpose: get all products
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
                "id": 15,
                "name": "Asus ROG",
                "description": "new ROG laptop",
                "category": "notebook",
                "price": 10000000,
                "stock": 30,
                "image_url": "http://contoh.img/com/img.jpg"
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
## /product
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
## /product/:id
-----
* method: GET
* purpose: Show Product based on ID
* request params: id <br>
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
## /product/:id
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
## /product/:id
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