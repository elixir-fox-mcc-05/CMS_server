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
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwibmFtZSI6IkFtaXIgRmFpc2FsIFoiLCJlbWFpbCI6ImFtaXJAZ21haWwuY29tIiwiaWF0IjoxNTkxMDAyNTAyfQ.3sG_VyV9tshmqC2EmBuia7nrGxlgRMIexoTj72x4fFE", "data": { "name": "Amir Faisal Z", "role": "Super-admin", "image_url": "https://i.imgur.com/cFKKgd2.jpg" }, "msg": "Login success" }`

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

  email=[string] <br />
  password=[string]

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "data": { "id": 1, "name": "Shakira Jihan", "email": "jihan@gmail.com", "role": "Member", "image_url": "https://i.imgur.com/cFKKgd2.jpg" }, "msg": "Register success, go to login page" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/register

## Get All User

- **URL**

  /user-list

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Data Params**

NONE

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "users": [ { "id": 8, "name": "Amir Faisal Z", "email": "amir@gmail.com", "role": "Super-admin", "password": "$2a$10$Z65XWlCxpoFSNf0NwmYGdu6KBg7wmP8jLfOyw2kGK.8DD91d0yQkq", "image_url": "https://i.imgur.com/cFKKgd2.jpg", "createdAt": "2020-05-20T20:42:32.931Z", "updatedAt": "2020-05-20T20:42:32.931Z" } ] }}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/user-list

## Get User By Id

- **URL**

  /user/:id

- **Method:**

  `GET`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200<br />
    **Content:** `{ "users": [ { "id": 8, "name": "Amir Faisal Z", "email": "amir@gmail.com", "role": "Super-admin", "password": "$2a$10$Z65XWlCxpoFSNf0NwmYGdu6KBg7wmP8jLfOyw2kGK.8DD91d0yQkq", "image_url": "https://i.imgur.com/cFKKgd2.jpg", "createdAt": "2020-05-20T20:42:32.931Z", "updatedAt": "2020-05-20T20:42:32.931Z" } ] }}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/user/1

## Update Role User

- **URL**

  /user/:id

- **Method:**

  `PATCH`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200<br />
    **Content:** `{ "msg": "user role has been updated" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/user/1

## GET ALL PRODUCT

- **URL**

  /product

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "products": [ { "id": 10, "name": "imac", "image_url": "https://images-na.ssl-images-amazon.com/images/I/61iT5SdUHBL._AC_SY355_.jpg", "price": 777777, "stock": 12, "UserId": 8, "createdAt": "2020-06-01T12:47:47.609Z", "updatedAt": "2020-06-03T08:47:09.354Z" }]},`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/product

## GET PRODUCT By ID

- **URL**

  /product/:id

- **Method:**

  `GET`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "product": { "id": 8, "name": "Nuklir", "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBEhkmYXpKSnpvCdGQX0jUVY1pbMoVHaOETgrYBoVf06vZcXj&usqp=CAU", "price": 2000000, "stock": 12, "UserId": 8, "createdAt": "2020-05-31T21:41:49.743Z", "updatedAt": "2020-05-31T21:41:49.743Z" } }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/product/8

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
    **Content:** `{ "product": { "id": 19, "name": "Mobilan", "image_url": "https://id-live-01.slatic.net/original/57366fd665c63b5345036cb40d41a418.jpg", "price": 18000, "stock": 12, "UserId": 8, "updatedAt": "2020-06-04T04:55:54.730Z", "createdAt": "2020-06-04T04:55:54.730Z" }, "msg": "Product succesfully created" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Wrong Password" }`

    OR

  - **Code:** 404 <br />
    **Content:** `{ error : "User Doesn't exist" }`

- **Sample Call:**

  http://localhost:3000/product

## UPDATE PRODUCT

- **URL**

  /product/:id

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
    **Content:** `{ "msg": "Product succesfully updated" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/product/1

## DELETE PRODUCT

- **URL**

  /product/:id

- **Method:**

  `DELETE`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{ "msg": "Product succesfully deleted" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/product/1
