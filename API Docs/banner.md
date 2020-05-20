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