# CMS-Server

**Login User**
----
   user Login

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**

  none

* **Data Params**

  **Required:**
 
   `username=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbWFpbDFAZW1haWwuY29tIiwiaWF0IjoxNTg4MDY5Nzg0fQ.0obIolFw130Zz-npEcXoNfFU0ze8lw_4tQcBWa3n3tU"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "wrong email/password" }`

* **Sample Call:**

 **end**
----

**Add Product**
----
  show add product

* **URL**

  /product

* **Method:**

  `post`
  
*  **URL Params**

  **Required:**

* **Data Params**

  `name=[string]`
  `desription=[string]`
  `imgUrl=[string]`
  `price=[integer]`
  `stock=[integer]`
  `category_id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "msg": "success adding Product"
                  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "name already exists" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "please input all the fields" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "price or stock cannot be minus number" }`


* **Sample Call:**

 **end**
----

**User Edit Product**
----
  edit Product that user selected

* **URL**

  /product/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

  none

* **Data Params**

  **Required:**
 
   `name=[string]`
  `desription=[string]`
  `imgUrl=[string]`
  `price=[integer]`
  `stock=[integer]`
  `category_id=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                    "msg": "Product Updated"
                 }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "name already exists" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "please input all the fields" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "price or stock cannot be minus number" }`


* **Sample Call:**

 **end**
----

**User Show Product**
----
  Show Product to user

* **URL**

  /product

* **Method:**

  `get`
  
*  **URL Params**

  none

* **Data Params**

  **Required:**
 
  none

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `[
  {
    "id": 1,
    "name": "new Product",
    "description": " ",
    "imgUrl": "vfdvfv",
    "price": 20,
    "stock": 22,
    "category_id": 1,
    "createdAt": "2020-05-13T05:23:55.703Z",
    "updatedAt": "2020-05-13T05:50:05.094Z"
  }
]`
 
* **Error Response:**


* **Sample Call:**

 **end**
----



**User Delete Product**
----
  deleting Product that user selected

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

  none

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                    "msg": "Product deleted"
                }`
 
* **Error Response:**


* **Sample Call:**

 **end**
----