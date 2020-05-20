# CMS_server
## User Login

- **URL**
```
http://localhost:3000/users/
```
- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  email=[string]<br>
  password=[string]

- **Success Response:**

  - **Code:** 200<br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrYWx5c0BnbWFpbC5jb20iLCJpYXQiOjE1ODkzNDk2NTF9.z0ECM5799LOY50dKMv2k9ykzaK3Ox_qcCiDMarhv6U0" }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/users

## User Register

- **URL**

  http://localhost:3000/users/register

- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  email=[string]
  password=[string]

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ "Users": { "id": 1, "email": "kalys@gmail.com", "password": "CI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrYWx5c0BnbWFpbC5jb20", "updatedAt": "2020-05-10T08:22:55.180Z", "createdAt": "2020-05-10T08:22:55.180Z" } }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/users/register

## GET ALL PRODUCT

- **URL**

  http://localhost:3000/products/

- **Method:**

  `GET`

- **URL Params**

  NONE

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{
    "products": [
        {
            "id": 2,
            "name": "adidas Pharrell NMD Hu China Pack Happy Gold (Friends and Family)",
            "price": 40800000,
            "stock": 15,
            "imageUrl": "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzEzNjkvNTA2YTlmN2MtMzQ3Zi00OTYyLWIyODQtYmZkZWFhZTY5MTMzLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
            "UserId": 1,
            "createdAt": "2020-05-13T06:08:32.061Z",
            "updatedAt": "2020-05-13T06:08:32.061Z"
        }
    }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ Message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ Message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/

## GET PRODUCT By ID

- **URL**

  http://localhost:3000/products/:id

- **Method:**

  `GET`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{
    "products": [
        {
            "id": 2,
            "name": "adidas Pharrell NMD Hu China Pack Happy Gold (Friends and Family)",
            "price": 40800000,
            "stock": 15,
            "imageUrl": "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzEzNjkvNTA2YTlmN2MtMzQ3Zi00OTYyLWIyODQtYmZkZWFhZTY5MTMzLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
            "UserId": 1,
            "createdAt": "2020-05-13T06:08:32.061Z",
            "updatedAt": "2020-05-13T06:08:32.061Z"
        }
    }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/2

## ADD NEW PRODUCT

- **URL**
```
  http://localhost:3000/products/
```
- **Method:**

  `POST`

- **URL Params**

  NONE

- **Data Params**

  name=[string],
  imageUrl=[string],
  price=[integer],
  stock=[integer]

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{
    "products": [
        {
            "id": 2,
            "name": "adidas Pharrell NMD Hu China Pack Happy Gold (Friends and Family)",
            "price": 40800000,
            "stock": 15,
            "imageUrl": "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzEzNjkvNTA2YTlmN2MtMzQ3Zi00OTYyLWIyODQtYmZkZWFhZTY5MTMzLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
            "UserId": 1,
            "createdAt": "2020-05-13T06:08:32.061Z",
            "updatedAt": "2020-05-13T06:08:32.061Z"
        }
    }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/

## UPDATE PRODUCT

- **URL**

  http://localhost:3000/products/:id

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
    **Content:** `{
    "products": [
        {
            "id": 2,
            "name": "adidas Pharrell NMD Hu China Pack Happy Gold (Friends and Family)",
            "price": 40800000,
            "stock": 15,
            "imageUrl": "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzEzNjkvNTA2YTlmN2MtMzQ3Zi00OTYyLWIyODQtYmZkZWFhZTY5MTMzLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
            "UserId": 1,
            "createdAt": "2020-05-13T06:08:32.061Z",
            "updatedAt": "2020-05-13T06:08:32.061Z"
        }
    }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/2

## DELETE PRODUCT

- **URL**

  http://localhost:3000/products/2

- **Method:**

  `DELETE`

- **URL Params**

  id=[integer]

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `{product 1 has been delete}`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ message : "Validate Error" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ message : "Internal Server Error" }`

- **Sample Call:**

  http://localhost:3000/products/1