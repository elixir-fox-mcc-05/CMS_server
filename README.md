**Title**
----
  Login

* **URL**

  /login

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 


   **Optional:**
 
   

* **Data Params**

  email=[string]
  password=[string]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxLCJlbWFpbCI6ImJvbHVAYm9sdS5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCQ0dUpuNzdsQWZXVUsvTTZsNVR1S3N1dEFmSTVKUHhPUU9CU3owT3E4T01aM3FRalFadGJXYSIsImlhdCI6MTU4OTk1MDQ3MX0.mOwhK_UbLrUEK2Eay_ud_LTiZVRRxGSWrAd4_aDe9lQ",
                    "first_name": "bolu",
                    "last_name": "",
                    "roles": null
                }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid email" }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/login',
      data: {
          email:'asd@asd.com',
          password:'asdasd'
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Register

* **URL**

  /register

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 


   **Optional:**
 
   

* **Data Params**

    first_name=[string]
    last_name=[string]
    email=[string]
    password=[string]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                      "id": 123,
                      "first_name": "bolu",
                      "last_name": "bolu",
                      "email": "bolu12@bolu.com",
                      "roles": "admin"
                  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'Price is required field' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/login',
      data: {
          first_name:'asdasd',
          last_name:'asdasd',
          email:'asd@asd.com',
          password:'asdasd'
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Banner List

* **URL**

  /banner/list

* **Method:**
  
  GET
  

* **Data Params**

  email=[string]
  password=[string]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "data": [
                                {
                                    "id": 1,
                                    "name": "asd",
                                    "image_url": "https://www.w3schools.com/w3css/img_lights.jpg",
                                    "createdAt": "2020-05-20T05:23:33.872Z",
                                    "updatedAt": "2020-05-20T05:23:33.872Z"
                                }
                            ]
                        }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'internal server error' }`


* **Sample Call:**

  $.ajax{
      method:'get',
      url: 'http://localhost:3000/banner/list',
      headers: {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Add Banner

* **URL**

  /banner/add

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 
    token=[string]


* **Data Params**

    name=[string]
    image_url=[string]


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                        "id": 1,
                        "name": "asd",
                        "image_url": "https://www.w3schools.com/w3css/img_lights.jpg"
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/banner/add',
      headers : {
          token : localStorage.token
      }
      data: {
          id: 1,
        name: 'buah',
        image_url: 'https://buefy.org/static/img/buefy.1d65c18.png',
        stock: 12,
        price: 120000,
        CategoryId: 12 
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Select banner

* **URL**

  /banner/:id

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
                        "id": 1,
                        "name": "asd",
                        "image_url": "https://www.w3schools.com/w3css/img_lights.jpg"
                    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/banner/1',
      headers : {
          token : localStorage.token
      }
      params : {
          id : 1
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Edit Banner

* **URL**

  /banner/:id

* **Method:**
  
  PUT
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**

    name=[string]
    image_url=[string]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                        "id": 1,
                        "name": "boluzzz",
                        "image_url": "https://www.w3schools.com/w3css/img_lights.jpg"
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'put',
      url: 'http://localhost:3000/products/edit/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      },
      data: {
            name: this.name,
            image_url: this.image_url,
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Delete Banner

* **URL**

  /banner/delete/:id

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
                    "name": "boluzzz",
                    "image_url": "https://www.w3schools.com/w3css/img_lights.jpg"
                }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : 'not found' }`


* **Sample Call:**

  $.ajax{
      method:'delete',
      url: 'http://localhost:3000/banner/delete/1',
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

**Title**
----
  category List

* **URL**

  /category

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
                            "name": "test",
                            "createdAt": "2020-05-20T07:30:07.360Z",
                            "updatedAt": "2020-05-20T07:30:07.360Z"
                        }
                    ]
                }`
                
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : 'internal server error' }`


* **Sample Call:**

  $.ajax{
      method:'get',
      url: 'http://localhost:3000/category',
      headers: {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Add Category

* **URL**

  /category/add

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 
    token=[string]

   **Optional:**
 
   

* **Data Params**

    name=[string]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id: 121,
                    name: 'asdasd'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'Name is required field' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/category/add',
      headers : {
          token : localStorage.token
      }
      data: {
          name: 'baba'
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Select Category
  
* **URL**

  /category/:id

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
    **Content:** `{ id: 1,
                    name: 'asd'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'not found' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/category/1',
      headers : {
          token : localStorage.token
      }
      params : {
          id : 1
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Edit Category

* **URL**

  /products/edit/:id

* **Method:**
  
  PUT
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**

    name=[string]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id: 1,
                    name: 'buah'
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'Name is required field' }`


* **Sample Call:**

  $.ajax{
      method:'put',
      url: 'http://localhost:3000/category/edit/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      },
      data: {
          name: this.name
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Delete Category

* **URL**

  /Category/delete/:id

* **Method:**
  
  DELETE
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**


* **Success Response:**

  * **Code:** 200 SUCCESS <br />
    **Content:** `{  error: 'delete completed' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : 'not found' }`


* **Sample Call:**

  $.ajax{
      method:'delete',
      url: 'http://localhost:3000/category/delete/1',
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
  Product List

* **URL**

  /products

* **Method:**
  
  GET
  
*  **URL Params**

  

   **Required:**
 
    token=[string]

   **Optional:**
 
   

* **Data Params**

  email=[string]
  password=[string]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id:12,
                    name: 'asdasd',
                    image_url: 'http://localhost:3000/pic/asd.jpg',
                    stock: 2000,
                    price: 1000,
                    CategoryId: 1
                    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'internal server error' }`


* **Sample Call:**

  $.ajax{
      method:'get',
      url: 'http://localhost:3000/product',
      headers: {
          token : localStorage.token
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Add Product

* **URL**

  /products/add

* **Method:**
  
  POST
  
*  **URL Params**

  

   **Required:**
 
    token=[string]

   **Optional:**
 
   

* **Data Params**

    name=[string]
    image_url=[string]
    stock=[integer]
    price=[integer]
    CategoryId=[integer]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
                    "id": 1,
                    "name": "water",
                    "image_url": "https://www.w3schools.com/w3css/img_lights.jpg",
                    "price": 15000,
                    "stock": 12,
                    "CategoryId": 1
                }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/products/add',
      headers : {
          token : localStorage.token
      }
      data: {
          id: 1,
        name: 'buah',
        image_url: 'https://buefy.org/static/img/buefy.1d65c18.png',
        stock: 12,
        price: 120000,
        CategoryId: 12 
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Select Product

* **URL**

  /products/:id

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
    **Content:** `{ id: 1,
                    name: 'buah',
                    image_url: 'https://buefy.org/static/img/buefy.1d65c18.png',
                    stock: 12,
                    price: 120000,
                    CategoryId: 12}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`


* **Sample Call:**

  $.ajax{
      method:'post',
      url: 'http://localhost:3000/products/1',
      headers : {
          token : localStorage.token
      }
      params : {
          id : 1
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Edit Product

* **URL**

  /products/edit/:id

* **Method:**
  
  PUT
  
*  **URL Params**

  

   **Required:**
 
    token=[string]
    id=[number]

   **Optional:**
 
   

* **Data Params**

    name=[string]
    image_url=[string]
    stock=[integer]
    price=[integer]
    CategoryId=[integer]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id: 1,
                    name: 'buah',
                    image_url: 'https://buefy.org/static/img/buefy.1d65c18.png',
                    stock: 12,
                    price: 120000,
                    CategoryId: 12}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : 'image_url is required field' }`


* **Sample Call:**

  $.ajax{
      method:'put',
      url: 'http://localhost:3000/products/edit/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      },
      data: {
          id: this.id,
            name: this.name,
            image_url: this.image_url,
            stock: this.stock,
            price: this.price,
            CategoryId: this.selectId
      }
  }

-------------------------------------------------------------------------------------------------------

**Title**
----
  Delete Product

* **URL**

  /products/delete/:id

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
    **Content:** `{ id: 1,
                    name: 'buah',
                    image_url: 'https://buefy.org/static/img/buefy.1d65c18.png',
                    stock: 12,
                    price: 120000,
                    CategoryId: 12}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : 'not found' }`


* **Sample Call:**

  $.ajax{
      method:'delete',
      url: 'http://localhost:3000/products/delete/1',
      headers : {
          token : localStorage.token
      },
      params : {
          id : 1
      }
  }

-------------------------------------------------------------------------------------------------------