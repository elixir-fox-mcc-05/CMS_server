# CMS_server

## User Login

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  email=[string]<br>
  password=[string]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhbmdlbGluYUBtYWlsLmNvbSIsImlhdCI6MTU4OTA3NjM5OX0._UofwrSJrH3tSN0fuEIEr-8iIpmk_XpEi4bGraXH3LI" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/login

## User Register

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  email=[string]
  password=[string]

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "User": { "id": 1, "first_name": "Yosa", "last_name": "Alfiqie", "email": "yosa@mail.com", "password": "$2a$10$2Vc.Uwk9.Bar7cvJBC46vua7CotA3VE8uNVvZV856TG/24awOgiba", "updatedAt": "2020-05-05T10:24:51.180Z", "createdAt": "2020-05-05T10:24:51.180Z" } }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/register

## GET ALL PRODUCT

- **URL**

  /products

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "Products": [ { id: "1", name: 'Bimoli', image_url: 'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png', price: 25000, stock: 10 } ] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products

## GET PRODUCT By ID

- **URL**

  /products/:id

- **Method:**

  `GET`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "Product": [ { id: "1", name: 'Bimoli', image_url: 'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png', price: 25000, stock: 10 } ] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products

## ADD NEW PRODUCT

- **URL**

  /products

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  name=[string],
  image_url=[string],
  price=[integer],
  stock=[integer]

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "Product": [ { id: "1", name: 'Bimoli', image_url: 'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png', price: 25000, stock: 10 } ] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products

## UPDATE PRODUCT

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **URL Params**

  id=[integer]

- **Data Params**

  name=[string],
  image_url=[string],
  price=[integer],
  stock=[integer]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "Product": [ { id: "1", name: 'Bimoli', image_url: 'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png', price: 25000, stock: 10 } ] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/1

## DELETE PRODUCT

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "Product": [ { id: "1", name: 'Bimoli', image_url: 'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png', price: 25000, stock: 10 } ] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/1

## GET CATEGORIES

- **URL**

  /categories

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Categories": [
        {
            "id": 1,
            "name": "Sembako",
            "createdAt": "2020-05-13T17:36:12.322Z",
            "updatedAt": "2020-05-13T17:36:12.322Z",
            "Products": [
                {
                    "id": 6,
                    "name": "Redmi mi10",
                    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-10-5g.jpg",
                    "price": 10000000,
                    "stock": 200,
                    "UserId": 3,
                    "CategoryId": 1,
                    "createdAt": "2020-05-16T04:48:07.616Z",
                    "updatedAt": "2020-05-16T04:48:07.616Z"
                }
            ]
        }
    ]
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/categories

## GET CATEGORIES BY ID

- **URL**

  /categories

- **Method:**

  `GET`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Category": {
        "id": 4,
        "name": "Fashion",
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Products": []
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/categories/1

## ADD NEW CATEGORY

- **URL**

  /categories

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Category": {
        "id": 4,
        "name": "Fashion",
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Products": []
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/categories

## EDIT CATEGORIES

- **URL**

  /categories

- **Method:**

  `PUT`

- **URL Params**

  id=[integer]

- **Headers Params**

  token=[string]

- **Data Params**

  name=[string]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Category": {
        "id": 4,
        "name": "Fashion",
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Products": []
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/categories/1

## DELETE CATEGORIES

- **URL**

  /categories

- **Method:**

  `DELETE`

- **URL Params**

  id=[integer]

- **Headers Params**

  token=[string]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Category": {
        "id": 4,
        "name": "Fashion",
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Products": []
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/categories/1

## GET CARTS

- **URL**

  /carts

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Headers Params**

  token=[string]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Carts": {
        "id": 4,
        "UserId": 1,
        "ProductId": 6,
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Product": [
          {
              "id": 6,
              "name": "Redmi mi10",
              "image_url": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-10-5g.jpg",
              "price": 10000000,
              "stock": 200,
              "UserId": 3,
              "CategoryId": 1,
              "createdAt": "2020-05-16T04:48:07.616Z",
              "updatedAt": "2020-05-16T04:48:07.616Z"
          }
        ]
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/carts

## ADD TO CARTS

- **URL**

  /carts

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Headers Params**

  token=[string]

- **Data Params**

  ProductId=[string],
  total=[integer],
  notes=[string]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Cart": {
        "id": 4,
        "UserId": 1,
        "ProductId": 6,
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Product": [
          {
              "id": 6,
              "name": "Redmi mi10",
              "image_url": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-10-5g.jpg",
              "price": 10000000,
              "stock": 200,
              "UserId": 3,
              "CategoryId": 1,
              "createdAt": "2020-05-16T04:48:07.616Z",
              "updatedAt": "2020-05-16T04:48:07.616Z"
          }
        ]
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/carts

## DELETE FROM CARTS

- **URL**

  /carts

- **Method:**

  `DELETE`

- **URL Params**

  NONE

- **Headers Params**

  token=[string]

- **Data Params**

  ProductId=[integer]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "Carts": {
        "id": 4,
        "UserId": 1,
        "ProductId": 6,
        "createdAt": "2020-05-13T17:36:12.322Z",
        "updatedAt": "2020-05-13T17:36:12.322Z",
        "Product": [
          {
              "id": 6,
              "name": "Redmi mi10",
              "image_url": "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-10-5g.jpg",
              "price": 10000000,
              "stock": 200,
              "UserId": 3,
              "CategoryId": 1,
              "createdAt": "2020-05-16T04:48:07.616Z",
              "updatedAt": "2020-05-16T04:48:07.616Z"
          }
        ]
    }
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/carts

## GET PAYMENT CHANNELS

- **URL**

  /payments

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Headers Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "PaymentChannel": [
        {
            "id": 1,
            "bank_name": "bca",
            "account_number": "2334567893",
            "createdAt": "2020-06-03T10:56:44.354Z",
            "updatedAt": "2020-06-03T10:56:44.354Z"
        }
    ]
}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/payments

## GET USER ORDERS

- **URL**

  /orders

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Headers Params**

  token=[string]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{"Orders":
        [
          {
            "id":3,
            "first_name":"Yosa",
            "last_name":"Alfiqie",
            "address":"jl.arjuna 6 no 19","items":"[{\"id\":14,\"ProductId\":3,\"Product\":{\"id\":3,\"name\":\"Gula Pasir\",\"image_url\":\"https://cf.shopee.co.id/file/7202e472eb52588e73d6490bb7621cee\"}}]","PaymentChannelId":2,
            "UserId":2,
            "grandtotal":20000,
            "createdAt":"2020-06-03T19:08:33.235Z","updatedAt":"2020-06-03T19:08:33.235Z","PaymentChannel": {
              "id":2,
              "bank_name":"bni",
              "account_number":"3312328645","createdAt":"2020-06-03T10:56:44.354Z","updatedAt":"2020-06-03T10:56:44.354Z"
            }
          }
        ]
      }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/orders

  ## ADD USER ORDERS

- **URL**

  /orders

- **Method:**

  `GET`

- **URL Params**

  first_name=[string],
  last_name=[string],
  address=[string],
  grandtotal=[integer],
  payments=[integer]

- **Headers Params**

  token=[string]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{"Order":
        [
          {
            "id":3,
            "first_name":"Yosa",
            "last_name":"Alfiqie",
            "address":"jl.arjuna 6 no 19",
            "items":"[{\"id\":14,\"ProductId\":3,\"Product\":{\"id\":3,\"name\":\"Gula Pasir\",\"image_url\":\"https://cf.shopee.co.id/file/7202e472eb52588e73d6490bb7621cee\"}}]","PaymentChannelId":2,
            "UserId":2,
            "grandtotal":20000,
            "createdAt":"2020-06-03T19:08:33.235Z","updatedAt":"2020-06-03T19:08:33.235Z","PaymentChannel": {
              "id":2,
              "bank_name":"bni",
              "account_number":"3312328645","createdAt":"2020-06-03T10:56:44.354Z","updatedAt":"2020-06-03T10:56:44.354Z"
            }
          }
        ]
      }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/orders