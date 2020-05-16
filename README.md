# CMS_server

[CMS Server](https://secret-tundra-12625.herokuapp.com/)

## API Documentation

----
  **User Register**
----
  New user registration in CMS app

* **URL**

  /users/register

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_NAME> | true |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD_HERE> | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "name": "Duwey McMeow",
    "email": "dadaduy@mail.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
  **User Login**
----
  Login to user account to access CMS dashboard (if user already register)

* **URL**

  /users/login

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD_HERE> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "accessToken": "<YOUR_TOKEN_HERE>"
    }
    ```
 
* **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        { "error" : "internal server error" }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        { "error" : "email not registered" }
        ``` 

        OR

        ```json
        { "error" : "wrong password" }
        ```