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
    **Content:** `{ token:'asdasdasdasdasdasdasdasd',
                    first_name: 'asdasd',
                    last_name: 'asdasd,
                    roles: 'admin'}`
 
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
    **Content:** `{ id: 1,
                    first_name: 'asdasd',
                    last_name: 'asdasd,
                    email: 'asd@asd.com,
                    roles: 'admin'}`
 
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
    **Content:** `{ id: 121,
                    name: 'asdasd'
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