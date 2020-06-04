
**Register**
----
  
* **URL**

  /users/register

* **Method:**
  
  `POST` 

*  **URL Params**

   none

* **Data Params**

  {
      "email": "agus@gmail.com",
      "password": "123456"
  }

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `{
      "id":"1",
      "email":"agus@gmail.com"
    }`
 
* **Error Response:**

    * **Code:** 400 <br />
    **Content:** `{
      "code": "400",
      "type": "Bad Request",
      "errors": "email atau password salah"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Login**
----
  
* **URL**

  /users/login

* **Method:**
  
  `POST` 

*  **URL Params**

   none

* **Data Params**

  {
      "email": "agus@gmail.com",
      "password": "123456"
  }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
}`
 
* **Error Response:**

    * **Code:** 400 <br />
    **Content:** `{
      "code": "400",
      "type": "Bad Request",
      "errors": "email atau password salah"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Create Product**
----

* **URL**

  /products

* **Method:**
  
  `POST` 

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }
  
*  **URL Params**

   none

* **Data Params**

  {
    "name": "Sampo",
    "description": "Sampo wangi segar",
    "price": "5000",
    "stock": "200",
    "image_url": "http://www.google.co.id"
  }

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `
        {
            "id": 8,
            "name": "Sampo",
            "description": "Sampo wangi segar",
            "price": "5000",
            "stock": "200",
            "image_url": "http://www.google.co.id"
            "UserId": 11,
            "updatedAt": "2020-05-07T11:31:00.284Z",
            "createdAt": "2020-05-07T11:31:00.284Z"
        }
    `
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
      "code": "400",
      "type": "Bad Request",
      "errors": "semua data harus diisi"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---   

**Show Products**
----

* **URL**

  /products

* **Method:**
  
  `GET`

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }

*  **URL Params**

    none

* **Data Params**

    none

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `
        {
            "id": 8,
            "name": "Sampo",
            "description": "Sampo wangi segar",
            "price": "5000",
            "stock": "200",
            "image_url": "http://www.google.co.id"
            "UserId": 11,
            "updatedAt": "2020-05-07T11:31:00.284Z",
            "createdAt": "2020-05-07T11:31:00.284Z"
        }
    `
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Update Product**
----

* **URL**

  /products/:productid
* **Method:**
  
  `PATCH`

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }
  
*  **URL Params**

   **Required:**
 
   `productid=[integer]`

* **Data Params**

    {
        "name": "Sampo",
        "description": "Sampo wangi segar",
        "price": "5000",
        "stock": "200",
        "image_url": "http://www.google.co.id"
    }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `
        {
            "id": 8,
            "name": "Sampo",
            "description": "Sampo wangi segar",
            "price": "5000",
            "stock": "200",
            "image_url": "http://www.google.co.id"
            "UserId": 11,
            "updatedAt": "2020-05-07T11:31:00.284Z",
            "createdAt": "2020-05-07T11:31:00.284Z"
        }
    `
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{
      "code": "401",
      "type": "Unauthorized",
      "errors": "Please login first"
    }`
  * **Code:** 404 <br />
    **Content:** `{
      "code": "404",
      "type": "Not Found",
      "errors": "Id Not Found"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---
**Delete Product**
----

* **URL**

  /products/:productid

* **Method:**
  
  `DELETE`
  
    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }

*  **URL Params**

   **Required:**
 
   `productid=[integer]`

* **Data Params**

  none

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `Successfully delete`
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{
      "code": "401",
      "type": "Unauthorized",
      "errors": "Please login first"
    }`
  * **Code:** 404 <br />
    **Content:** `{
      "code": "404",
      "type": "Not Found",
      "errors": "Id not found"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Create Shopping Chart**
----

* **URL**

  /shoppingchart

* **Method:**
  
  `POST` 

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }
  
*  **URL Params**

   none

* **Data Params**

  {
    "quantity": "2"
  }

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `
      {
        "ShoppingChart": {
        "UserId": "1",
        "ProductId": "1",
        "quantity": "2",
        "updatedAt": "2020-05-31T12:26:07.499Z",
        "createdAt": "2020-05-31T12:26:07.499Z",
        "id": "4"
        }
      }
    `
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
      "code": 400,
      "type": "Bad Request",
      "message": [
        {
          "message": "Quantity can't be empty"
        }
      ]
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---   

**Show Shopping Chart**
----

* **URL**

  /shoppingchart

* **Method:**
  
  `GET`

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }

*  **URL Params**

    none

* **Data Params**

    none

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `
      "ShoppingCharts": [
        {
          "UserId": 1,
          "ProductId": 1,
          "quantity": 1,
          "isPaid": "false"
          "createdAt": "2020-05-31T12:22:36.808Z",
          "updatedAt": "2020-05-31T12:22:36.808Z",
          "Product": {
            "id": 1,
            "name": "Iphone 11",
            "price": 17500000,
            "stock": 117,
            "category": "Electronics",
            "image_url": "https://ecommerceimage.s3.amazonaws.com/Viviane%20Schimmel.jpeg",
            "createdAt": "2020-05-31T11:33:21.155Z",
            "updatedAt": "2020-05-31T12:29:10.001Z"
          }
        },
        {
          "UserId": 1,
          "ProductId": 1,
          "quantity": 1,
          "isPaid": "false"
          "createdAt": "2020-05-31T12:26:07.499Z",
          "updatedAt": "2020-05-31T12:26:07.499Z",
          "Product": {
            "id": 1,
            "name": "Iphone 11",
            "price": 17500000,
            "stock": 117,
            "category": "Electronics",
            "image_url": "https://ecommerceimage.s3.amazonaws.com/Viviane%20Schimmel.jpeg",
            "createdAt": "2020-05-31T11:33:21.155Z",
            "updatedAt": "2020-05-31T12:29:10.001Z"
          }
        }
      ]
    `
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Delete Shopping Chart**
----

* **URL**

  /shoppingchart/:id

* **Method:**
  
  `DELETE`
  
    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  none

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `Successfully delete`
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{
      "code": "401",
      "type": "Unauthorized",
      "errors": "Please login first"
    }`
  * **Code:** 404 <br />
    **Content:** `{
      "code": "404",
      "type": "Not Found",
      "errors": "Id not found"
    }`
  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---

**Checkout**
----

* **URL**

  /shoppingcharts/checkout

* **Method:**
  
  `POST` 

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }
  
*  **URL Params**

   none

* **Data Params**

  {
    "customerData": { amount: 15000, token: 1123afafaere}
    "listProductId": [2,3,4]
  }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `
      {
        "Message": "Successfully Checkout"
      }
    `
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---   

**Show Transaction History**
----

* **URL**

  /users/transactions

* **Method:**
  
  `GET`

    **Required:**
 
    Headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJlbmUiLCJlbWFpbCI6ImlyZW5lQGdtYWlsLmNvbSIsImlhdCI6MTU4Nzk5Mzk3Nn0.IKagkwozRHj7Y-otxgk60HiE98EL78-R5Llssjoa3AQ"
    }

*  **URL Params**

    none

* **Data Params**

    none

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `
      "ShoppingCharts": [
        {
          "UserId": 1,
          "ProductId": 1,
          "quantity": 1,
          "createdAt": "2020-05-31T12:22:36.808Z",
          "updatedAt": "2020-05-31T12:22:36.808Z",
          "isPaid": "true"
          "Product": {
            "id": 1,
            "name": "Iphone 11",
            "price": 17500000,
            "stock": 117,
            "category": "Electronics",
            "image_url": "https://ecommerceimage.s3.amazonaws.com/Viviane%20Schimmel.jpeg",
            "createdAt": "2020-05-31T11:33:21.155Z",
            "updatedAt": "2020-05-31T12:29:10.001Z"
          }
        },
        {
          "UserId": 1,
          "ProductId": 1,
          "quantity": 1,
          "isPaid": "true"
          "createdAt": "2020-05-31T12:26:07.499Z",
          "updatedAt": "2020-05-31T12:26:07.499Z",
          "Product": {
            "id": 1,
            "name": "Iphone 11",
            "price": 17500000,
            "stock": 117,
            "category": "Electronics",
            "image_url": "https://ecommerceimage.s3.amazonaws.com/Viviane%20Schimmel.jpeg",
            "createdAt": "2020-05-31T11:33:21.155Z",
            "updatedAt": "2020-05-31T12:29:10.001Z"
          }
        }
      ]
    `
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      "code": "500",
      "type": "Internal Server Error"
    }`

---