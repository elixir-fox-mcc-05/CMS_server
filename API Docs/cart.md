**Title**
----
  Cart List

* **URL**

  /cart/list

* **Method:**
  
  GET
  
*  **URL Params**

  

   **Required:**
 
    token=[string]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "data": [
                        {
                            "id": 1,
                            "quantity": null,
                            "isPaid": false,
                            "UserId": null,
                            "ProductId": 1,
                            "createdAt": "2020-05-20T08:24:26.029Z",
                            "updatedAt": "2020-05-20T08:24:26.029Z",
                            "Product": {
                                "id": 1,
                                "name": "water",
                                "image_url": "https://www.w3schools.com/w3css/img_lights.jpg",
                                "price": 15000,
                                "stock": 12,
                                "CategoryId": 1,
                                "createdAt": "2020-05-20T07:48:50.894Z",
                                "updatedAt": "2020-05-20T07:48:50.894Z"
                            },
                            "User": null
                        },
                        {
                            "id": 2,
                            "quantity": 2,
                            "isPaid": false,
                            "UserId": 1,
                            "ProductId": 1,
                            "createdAt": "2020-05-20T08:27:23.985Z",
                            "updatedAt": "2020-05-20T08:27:23.985Z",
                            "Product": {
                                "id": 1,
                                "name": "water",
                                "image_url": "https://www.w3schools.com/w3css/img_lights.jpg",
                                "price": 15000,
                                "stock": 12,
                                "CategoryId": 1,
                                "createdAt": "2020-05-20T07:48:50.894Z",
                                "updatedAt": "2020-05-20T07:48:50.894Z"
                            },
                            "User": {
                                "id": 1,
                                "first_name": "bolu",
                                "last_name": "bolu",
                                "email": "bolu12@bolu.com",
                                "password": "$2b$04$fQ.LJm63bscPbzDVKzspjuPLSZI1FFqqsCuXkUZr5g.ZqLRb9exlu",
                                "roles": "admin",
                                "createdAt": "2020-05-20T07:25:49.329Z",
                                "updatedAt": "2020-05-20T07:25:49.329Z"
                            }
                        }
                    ]
                }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'internal server error' }`


* **Sample Call:**

  $.ajax{
      method:'get',
      url: 'http://localhost:3000/cart',
      headers: {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Add Cart

* **URL**

  /products/add

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 
    token=[string]

   **Optional:**
 
   

* **Data Params**

    ProductId=[integer]
    quantity=[integer]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                    "id": 2,
                    "ProductId": 1,
                    "UserId": 1
                }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/cart/add',
      headers : {
          token : localStorage.token
      }
      data: {
          ProductId : 1,
          quantity: 2 
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Checkout Cart

* **URL**

  /cart/checkout

* **Method:**
  
  Get
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                        "data": [
                            {
                                "id": 2,
                                "quantity": 2,
                                "isPaid": false,
                                "UserId": 1,
                                "ProductId": 1,
                                "createdAt": "2020-05-20T08:27:23.985Z",
                                "updatedAt": "2020-05-20T08:27:23.985Z"
                            }
                        ]
                    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/cart/checkout',
      headers : {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Confirm Cart

* **URL**

  /carts/confirm/:id

* **Method:**
  
  PUT
  
*  **URL Params**


   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                        "id": 2,
                        "ProductId": 1,
                        "quantity": 2,
                        "isPaid": true
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'put',
      url: 'http://localhost:3000/cart/confirm/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      },
      data: {
            id: 2,
            ProductId: 1,
            quantity: 2,
            isPaid: true
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Edit Cart

* **URL**

  /carts/edit/:id

* **Method:**
  
  PUT
  
*  **URL Params**


   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**

    quantity=[integer]
    isPaid=[boolean]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                        "id": 2,
                        "ProductId": 1,
                        "quantity": 2,
                        "isPaid": false
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'put',
      url: 'http://localhost:3000/cart/edit/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      },
      data: {
            id: 2,
            ProductId: 1,
            quantity: 2,
            isPaid: true
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Delete Cart

* **URL**

  /cart/delete/:id

* **Method:**
  
  DELETE
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "id": 1,
                    "ProductId": 1,
                    "UserId": null,
                    "isPaid": true
                }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : 'not found' }`


* **Sample Call:**

  $.ajax{
      method:'delete',
      url: 'http://localhost:3000/cart/delete/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Select Cart

* **URL**

  /cart/:id

* **Method:**
  
  GET
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[integer]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                      "data": {
                          "id": 1,
                          "quantity": 2,
                          "isPaid": false,
                          "UserId": 1,
                          "ProductId": 1,
                          "createdAt": "2020-05-20T14:00:51.550Z",
                          "updatedAt": "2020-05-20T14:00:51.550Z"
                      }
                  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'internal server error' }`


* **Sample Call:**

  $.ajax{
      method:'get',
      url: 'http://localhost:3000/cart/1',
      headers: {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------