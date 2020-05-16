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