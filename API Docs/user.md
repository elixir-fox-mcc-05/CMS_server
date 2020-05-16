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