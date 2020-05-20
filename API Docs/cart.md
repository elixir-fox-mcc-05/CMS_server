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
    UserId=[integer]
    quantity=[integer]

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
      url: 'http://localhost:3000/cart/add',
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
      url: 'http://localhost:3000/cart/checkout',
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