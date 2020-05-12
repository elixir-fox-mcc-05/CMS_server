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
