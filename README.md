## **REST API DOCUMENTATION**
---------

**INTRODUCTION**

Rest api documentation of E-Commers CMS project from *Hacktiv8* 

----
## **Users**
----
Represents for register user data and for user login as a requirements before using cms.

### **Register User**

Create user data

* **Method:**

  `POST`

* **URL**

  /users/register

  
*  **URL Params**

   **Required:**
 
    None

* **Data Params**

    | Params       | Description                          |
    |--------------|--------------------------------------|
    | email        | E-mail of the user, must be unique   |
    | password     | Password of the user                 |

* **Success Response:**

  * **Code:** 201 Created <br />
  **Content:** 

        {
            "id": 1,
            "email": "example@gmail.com"
        }

* **Error Response:**

  * **Code:** 400 Bad Request <br />
  **Content:**

        {
          "name": "BadRequest",
          "errors": [
            {
                "message": "E-mail must be filled"
            },
            {
                "message": "E-mail must be in e-mail format <youremail@mail.com>"
            },
            {
                "message": "Password must be filled"
            },
            {
                "message": "Email already registered"
            }
          ]
        }

### **Login User**

Login using user data that already created/registerd

* **Method:**

  `POST`

* **URL**

  /users/login

*  **URL Params**

   **Required:**
 
    None

* **Data Params**

    | Params   | Description                                                      |
    |----------|------------------------------------------------------------------|
    | email    | E-mail of the user, must be already register                     |
    | password | Password of the user, must be already register, pair with e-mail |

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** 

        {
            "token": "---< your token code >---",
        }  

* **Error Response:**

  * **Code:** 400 Bad Request <br />
  **Content:**

        {
          "name": "BadRequest",
          "errors": [
            {
                "message": "Invalid E-Mail/Password"
            }
          ]
        }


----
## **Products**
----
Represents for products in CMS.

### **Create Product**

Create product data

* **Method:**

  `POST`

* **URL**

  /products

*  **URL Params**

   **Required:**
 
    headers = token

* **Data Params**

    | Params       | Description                                |
    |--------------|--------------------------------------------|
    | name         | product name, must be unique               |
    | description  | product description, have default value    |
    | imgae_url    | product url for image, have default value  |
    | price        | product price, have default value          |
    | stock        | product stock, have default value          |

* **Success Response:**

  * **Code:** 201 Created<br />
  **Content:** 

        {
            "product": {
                "id": 1,
                "name": "example 1",
                "description": "desc 1",
                "image_url": "url 1",
                "price": 10000,
                "stock": 1,
                "updatedAt": "2020-05-13T17:58:28.831Z",
                "createdAt": "2020-05-13T17:58:28.831Z"
            }
        }

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:**

        {
          "name": "Unauthorized",
          "errors": [
                {
                    "message": "Unauthorized. Please login first"
                },
          ]
        }

    OR

  * **Code:** 400 Bad Request <br />
  **Content:**

        {
          "name": "BadRequest",
          "errors": [
                {
                    "message": "Product.name cannot be null"
                },
                {
                    "message": "Product.description cannot be null"
                },
                {
                    "message": "Product.image_url cannot be null"
                },
                {
                    "message": "Name must be filled"
                },
                {
                    "message": "Name must be 1-60 characters long "
                },
                {
                    "message": "Product already exist"
                },
                {
                    "message": "Input to Database error"
                },
                {
                    "message": "Price must be equal to or more than 0"
                },
                {
                    "message": "Stock must be equal to or more than 0"
                }
          ]
        }

### **Read All Products**

Read all products data in products list

* **Method:**

  `GET`

* **URL**

  /products

*  **URL Params**

   **Required:**
 
    headers = token

* **Data Params**

    none

* **Success Response:**

  * **Code:** 200 Ok<br />
  **Content:** 

        {
            "products": [
                {
                    "id": 1,
                    "name": "example 1",
                    "description": "desc 1",
                    "image_url": "url 1",
                    "price": 10000,
                    "stock": 1,
                    "updatedAt": "2020-05-13T17:58:28.831Z",
                    "createdAt": "2020-05-13T17:58:28.831Z"
                },
                {
                    "id": 2,
                    "name": "example 2",
                    "description": "desc 2",
                    "image_url": "url 2",
                    "price": 20000,
                    "stock": 2,
                    "updatedAt": "2020-05-13T17:58:28.831Z",
                    "createdAt": "2020-05-13T17:58:28.831Z"
                }
            ]
        }

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
  **Content:**

        {
          "name": "Unauthorized",
          "errors": [
                {
                    "message": "Unauthorized. Please login first"
                },
          ]
        }

### **Update Product**

Update product data in products list

* **Method:**

  `PUT`

* **URL**

  /products/:productsId

*  **URL Params**

   **Required:**
 
    headers = token <br />
    productId = [integer]

* **Data Params**

    | Params       | Description                                              |
    |--------------|----------------------------------------------------------|
    | name         | product name by productsId,  must be unique              |
    | description  | product description by productsId, have default value    |
    | imgae_url    | product url for image by productsId, have default value  |
    | price        | product price by productsId, have default value          |
    | stock        | product stock by productsId, have default value          |

* **Success Response:**

    * **Code:** 200 Ok<br />
    **Content:** 

            {
                "product": {
                    "id": 1,
                    "name": "update 1",
                    "description": "desc update 1",
                    "image_url": "url update 1",
                    "price": 50000,
                    "stock": 5,
                    "updatedAt": "2020-05-13T17:58:28.831Z",
                    "createdAt": "2020-05-13T17:58:28.831Z"
                },
                "message": "Product id 1 update"
            }

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:**

            {
                "name": "Unauthorized",
                "errors": [
                        {
                            "message": "Unauthorized. Please login first"
                        },
                ]
            }

    OR

    * **Code:** 404 Not Found <br />
    **Content:**

            {
                "name": "NotFound",
                "errors": [
                        {
                            "message": "Product with id 9 not found"
                        },
                ]
            }

    OR

  * **Code:** 400 Bad Request <br />
  **Content:**

        {
          "name": "BadRequest",
          "errors": [
                {
                    "message": "Name must be filled"
                },
                {
                    "message": "Name must be 1-60 characters long "
                },
                {
                    "message": "Product already exist"
                },
                {
                    "message": "Input to Database error"
                },
                {
                    "message": "Price must be equal to or more than 0"
                },
                {
                    "message": "Stock must be equal to or more than 0"
                }
          ]
        }

### **Delete Product**

Delete product data in products list

* **Method:**

  `DELETE`

* **URL**

  /products/:productsId

*  **URL Params**

   **Required:**
 
    headers = token <br />
    productId = [integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 Ok<br />
  **Content:** 

            {
                "message": "Product id 9 delete"
            }

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:**

            {
                "name": "Unauthorized",
                "errors": [
                        {
                            "message": "Unauthorized. Please login first"
                        },
                ]
            }

    * **Code:** 404 Not Found <br />
    **Content:**

            {
                "name": "NotFound",
                "errors": [
                        {
                            "message": "Product with id 9 not found"
                        },
                ]
            }
