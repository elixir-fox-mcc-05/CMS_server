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