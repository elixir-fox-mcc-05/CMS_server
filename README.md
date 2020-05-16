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
    "name": "Huey McMeow",
    "email": "hueyguey@mail.com"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        { "error" : "name can't be empty" }
        ```

        OR

        ```json
        { "error" : "email already exists" }
        ```

        OR

        ```json
        { "error" : "email can't be empty" }
        ```

        OR

        ```json
        { "error" : "invalid email format" }
        ```

        OR

        ```json
        { "error" : "password can't be empty" }
        ```

        OR

        ```json
        { "error" : "password must be at least 8 character long" }
        ```

        OR
 
        ```json
        { "error" : "password can't contain any whitespace character" }
        ```

    OR

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
        { "error" : "invalid email/password" }
        ``` 

**Add New Product**
----
  Add new Product to system

* **URL**

  /products

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_PRODUCT_NAME> | true |
  | image_url | <YOUR_IMAGE_URL> | true |
  | price | <YOUR_PRODUCT_PRICE> | true |
  | stock | <YOUR_PRODUCT_STOCK> | true |
  | categoryId | <YOUR_CATEGORY_ID> | true |

* **Success Response:**
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
        "product": {
            "id": 4,
            "name": "Dallas Cowboys Men's Blue Jersey",
            "image_url": "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2581000/altimages/ff_2581533alt1_full.jpg&w=900",
            "price": "1500000",
            "stock": 19,
            "UserId": 1,
            "CategoryId": 11,
            "updatedAt": "2020-05-16T05:34:35.358Z",
            "createdAt": "2020-05-16T05:34:35.358Z"
        }
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      { "error" : "Product name can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product already added to the system" }
      ```

      OR

      ```json
      { "error" : "Product image already added to the system" }
      ```

      OR

      ```json
      { "error" : "Product image can't be empty" }
      ```

      OR

      ```json
      { "error" : "Invalid image url format" }
      ```

      OR

      ```json
      { "error" : "Product price has to be greater than zero" }
      ```

      OR

      ```json
      { "error" : "Product price can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product price must be a numeric value" }
      ```

      OR

      ```json
      { "error" : "Product stock has to be greater than zero" }
      ```

      OR

      ```json
      { "error" : "Product stock can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product stock must be an integer value" }
      ```

      OR

      ```json
      { "error" : "Product Category can't be empty" }
      ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You do not have the authority to do this action" }
    ```

    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```

    OR

    ```json
    { "error" : "Only admin has the authority to do this action" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
  **Show All Products**
----
  Show all Products, can be filter by category and product name. this end point is paginated API.

* **URL**

  /products

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

  | query | value | required |
  | :---: | :---: | :---: |
  | per_page | integer | true |
  | search | string | false |
  | category | string | false |
  | page | integer | true |
  | sort | string | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "products": {
            "total": 10,
            "per_page": 5,
            "current_page": 1,
            "last_page": 2,
            "from": 1,
            "to": 5,
            "data": [
                {
                    "id": 8,
                    "name": "AS ROMA HOME VAPOR MATCH JERSEY 2019/20",
                    "image_url": "https://d29n1vi41wlgpp.cloudfront.net/media/catalog/product/cache/2/thumbnail/x640/040ec09b1e35df139433887a97daa66f/r/o/ro19004.jpg",
                    "price": "1000000",
                    "stock": 120,
                    "UserId": 1,
                    "CategoryId": 1,
                    "Category": {
                        "id": 1,
                        "name": "Football",
                        "total_product": 1
                    }
                },
                {
                    "id": 4,
                    "name": "Dallas Cowboys Men's Blue Jersey",
                    "image_url": "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2581000/altimages/ff_2581533alt1_full.jpg&w=900",
                    "price": "1500000",
                    "stock": 20,
                    "UserId": 1,
                    "CategoryId": 11,
                    "Category": {
                        "id": 11,
                        "name": "American Football",
                        "total_product": 2
                    }
                },
                {
                    "id": 12,
                    "name": "Giro Adult Verge Zoom Snow Goggles",
                    "image_url": "https://dks.scene7.com/is/image/GolfGalaxy/17GIRAVRGWHTZMSMRSSP_Black_Titanium_Zoom_Amber_Rose?qlt=70&wid=1100&fmt=webp",
                    "price": "460000",
                    "stock": 70,
                    "UserId": 1,
                    "CategoryId": 10,
                    "Category": {
                        "id": 10,
                        "name": "Winter Sports",
                        "total_product": 1
                    }
                },
                {
                    "id": 6,
                    "name": "Los Angeles Lakers 2008-09 Hardwood Classics Authentic Jersey - Purple",
                    "image_url": "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3419000/altimages/ff_3419566-045f0a3082941b1350bealt1_full.jpg&w=900",
                    "price": "4500000",
                    "stock": 10,
                    "UserId": 1,
                    "CategoryId": 2,
                    "Category": {
                        "id": 2,
                        "name": "Basketball",
                        "total_product": 3
                    }
                },
                {
                    "id": 5,
                    "name": "Men's Chicago Bulls  Black 1997-98 Hardwood Classics Swingman Jersey",
                    "image_url": "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2751000/altimages/ff_2751339alt1_full.jpg&w=900",
                    "price": "1800000",
                    "stock": 12,
                    "UserId": 1,
                    "CategoryId": 2,
                    "Category": {
                        "id": 2,
                        "name": "Basketball",
                        "total_product": 3
                    }
                }
            ]
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You do not have the authority to do this action" }
    ```
    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```


----
  **Update Product**
----
  Change existing product attribute

* **URL**

  /products/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_PRODUCT_NAME> | true |
  | image_url | <YOUR_IMAGE_URL> | true |
  | price | <YOUR_PRODUCT_PRICE> | true |
  | stock | <YOUR_PRODUCT_STOCK> | true |
  | categoryId | <YOUR_CATEGORY_ID> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "product": {
            "id": 4,
            "name": "Dallas Cowboys Men's Blue Jersey",
            "image_url": "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2581000/altimages/ff_2581533alt1_full.jpg&w=900",
            "price": "1500000",
            "stock": 22,
            "UserId": 1,
            "CategoryId": 11,
            "updatedAt": "2020-05-16T05:34:35.358Z",
            "createdAt": "2020-05-16T05:34:35.358Z"
        }
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      { "error" : "Product name can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product already added to the system" }
      ```

      OR

      ```json
      { "error" : "Product image already added to the system" }
      ```

      OR

      ```json
      { "error" : "Product image can't be empty" }
      ```

      OR

      ```json
      { "error" : "Invalid image url format" }
      ```

      OR

      ```json
      { "error" : "Product price has to be greater than zero" }
      ```

      OR

      ```json
      { "error" : "Product price can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product price must be a numeric value" }
      ```

      OR

      ```json
      { "error" : "Product stock has to be greater than zero" }
      ```

      OR

      ```json
      { "error" : "Product stock can't be empty" }
      ```

      OR

      ```json
      { "error" : "Product stock must be an integer value" }
      ```

      OR

      ```json
      { "error" : "Product Category can't be empty" }
      ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You do not have the authority to do this action" }
    ```

    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```

    OR

    ```json
    { "error" : "Only admin has the authority to do this action" }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "error" : "no product with id <id> found" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
  **Delete Product**
----
  Delete existing product, selected by id

* **URL**

  /products/:id

* **Method:**
  
  `DELETE`
  
* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  none

* **Success Response:**
    
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    { "msg": "Success delete product with id 2" }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You do not have the authority to do this action" }
    ```

    OR
  
    ```json
    { "error" : "you need to login to access this page" }
    ```

    OR
  
    ```json
    { "error" : "Only admin has the authority to do this action" }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "error" : "no product with id <id> found" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
**Create New Category**
----
  Create new Category for product

* **URL**

  /categories

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_CATEGORY_NAME> | true |

* **Success Response:**
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "category": {
            "total_product": 0,
            "id": 13,
            "name": " Winter Sport",
            "updatedAt": "2020-05-16T06:42:42.878Z",
            "createdAt": "2020-05-16T06:42:42.878Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "error" : "category name can't be empty" }
    ```

    OR

    ```json
    { "error" : "Category already created" }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You dont have the authority to do this action" }
    ```

    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
  **Show All Category**
----
  Show all existing product category

* **URL**

  /categories

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   | query | value | required |
  | :---: | :---: | :---: |
  | sort | string | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "categories": [
            {
                "id": 1,
                "name": "Football",
                "total_product": 1
            },
            {
                "id": 2,
                "name": "Basketball",
                "total_product": 3
            },
            {
                "id": 4,
                "name": "Baseball",
                "total_product": 0
            },
            {
                "id": 5,
                "name": "Ice Hockey",
                "total_product": 2
            },
            {
                "id": 6,
                "name": "Cycling",
                "total_product": 1
            },
            {
                "id": 7,
                "name": "Water Sports",
                "total_product": 0
            },
            {
                "id": 8,
                "name": "Outdoor Sport",
                    "total_product": 0
            },
            {
                "id": 9,
                "name": "Martial Art",
                "total_product": 0
            },
            {
                "id": 10,
                "name": "Winter Sports",
                "total_product": 1
            },
            {
                "id": 11,
                "name": "American Football",
                "total_product": 3
            }
        ]
    } 
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You dont have the authority to do this action" }
    ```

    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
**Update New Category**
----
  Update Category name

* **URL**

  /categories/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_CATEGORY_NAME> | true |

* **Success Response:**
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "category": {
            "total_product": 0,
            "id": 13,
            "name": " Winter Sports",
            "updatedAt": "2020-05-16T06:42:42.878Z",
            "createdAt": "2020-05-16T06:42:42.878Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    { "error" : "category name can't be empty" }
    ```

    OR

    ```json
    { "error" : "Category already created" }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You dont have the authority to do this action" }
    ```

    OR

    ```json
    { "error" : "you need to login to access this page" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```

----
  **Delete Category**
----
  Delete existing category, selected by id

* **URL**

  /categories/:id

* **Method:**
  
  `DELETE`
  
* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <YOUR_TOKEN_HERE> | true |
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  none

* **Success Response:**
    
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    { "msg": "Success delete category with id 2" }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "error" : "You do not have the authority to do this action" }
    ```

    OR
  
    ```json
    { "error" : "you need to login to access this page" }
    ```

    OR
  
    ```json
    { "error" : "Only admin has the authority to do this action" }
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "error" : "internal server error" }
    ```