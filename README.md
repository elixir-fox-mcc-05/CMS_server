ENV {
SECRET = HACKTIV8

PORT = 3000
}

## **Login Admin**

* **URL:**

​			/user/login

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

  `None`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "id": 7,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTg2ODc4MjAwfQ.-g5qVzqb2ofEBiFg6xlvmC2XEfXiFaJ2ahyjolqcjaM"
    }
    ```
    

- **Error Response:**

  - **Code:** 401 Unauthorized
    **Content:** 

    ```json
    {
      "msg": "username/password not found"
    }
    ```
    
    
  
- **Sample Call:**

  ```
     axios({
        method:"POST",
        url:"https://g-kanban.herokuapp.com/user/login",
        data:{
            username:this.username,
            password:this.password
        }
    })
  ```



## **ADD PRODUCT**

* **URL:**

​			/product

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

  `token=[string]`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
    	"name": "Coki Coki",
    	"image_url": "dsadfdsfds",
    	"price": 5000,
    	"stock": 20
    }
    ```
    
    
  
  
  
- **Sample Call:**

  ```
  axios({
      method:"POST",
      url:"/product",
      data:{
  	"name": "Coki Coki",
  	"image_url": "dsadfdsfds",
  	"price": 5000,
  	"stock": 20
  	},
      headers:{
      	token:localStorage.token
      }
  })
  ```



## **Find All Product for Admin**

* **URL:**

​			/product

* **Method:**

​		`GET`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

   ` token : [string]
  
- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "silverqueen asik",
          "image_url": "dimana",
          "price": 5000,
          "stock": 50,
          "createdAt": "2020-04-18T12:07:10.795Z",
          "updatedAt": "2020-04-18T12:07:51.665Z"
        },
        {
          "id": 2,
          "name": "Coki Coki",
          "image_url": "dsadfdsfds",
          "price": 5000,
          "stock": 20,
          "createdAt": "2020-04-18T13:26:40.562Z",
          "updatedAt": "2020-04-18T13:26:40.562Z"
        }
      ]
    }
    ```
    
    
  
  
  
  
  
- **Sample Call:**

  ```
  axios({
      method:"GET",
      url:"/product",
      headers:{
      	token:localStorage.token
      }
  })
  ```





## **Edit Product**

* **URL:**

​			/product/:id

* **Method:**

​		`PUT`

- **URL Params**

  **Required:**

  `status:[string]`

  `id:[integer]`

- **Data Headers**

  **Required:**

   ` token:[string]`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "msg": "Update Success"
    }
    ```
    
    
  
- **Error Response:**

  - **Code:** 500
    **Content:** 

    ```json
    {
      "name": "JsonWebTokenError",
      "message": "invalid token"
    }
    ```

    

- **Sample Call:**

  ```
  axios({
      method:"PUT",
      url:"/product/:id,
      data:{	name: '',
              image_url: '',
              price: 0,
              stock: 0
          }
      headers:{
          token:localStorage.token
      }
  })
  
  ```



## **Delete  product**

* **URL:**

​			product/+id,

* **Method:**

​		`DELETE`

- **URL Params**

  **Required:**

  `id:[integer]`

- **Data Headers**

  **Required:**

   ` token:[string] `

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "message": "Delete Success"
    }
    ```
    

- **Error Response:**

  - **Code:**500
    **Content:** 

    ```json
    {
      "name": "JsonWebTokenError",
      "message": "invalid token"
    }
    ```

    

- **Sample Call:**

  ```
  axios({
      method:"DELETE",
      url:"product/"+id,
      headers:{
          token:localStorage.token
      }
  })
  ```



## **Find All Product for Customer**

* **URL:**

​			/product/customer/all

* **Method:**

​		`GET`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

    None

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "data": [
        {
          "id": 58,
          "name": "silverqueen",
          "image_url": "https://id-test-11.slatic.net/shop/ecd0e7c512129b8512d6a5c5d92fbe39.png",
          "price": 35000,
          "stock": 188,
          "createdAt": "2020-04-20T15:48:04.198Z",
          "updatedAt": "2020-04-22T23:35:18.098Z"
        },
        {
          "id": 59,
          "name": "KitKat",
          "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1492010712/erpfso1ydhmtubym133d.jpg",
          "price": 30000,
          "stock": 88,
          "createdAt": "2020-04-20T15:49:58.109Z",
          "updatedAt": "2020-04-22T23:35:18.102Z"
        },
        {
          "id": 57,
          "name": "Astor",
          "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//84/MTA-3111375/astor_astor-chocolate-addict-_full04.jpg",
          "price": 30000,
          "stock": 188,
          "createdAt": "2020-04-20T15:10:07.617Z",
          "updatedAt": "2020-04-22T23:35:18.125Z"
        },
        {
          "id": 61,
          "name": "chocolatos",
          "image_url": "https://cf.shopee.co.id/file/3de2a32e121a61e20becad18a9c5e350",
          "price": 20,
          "stock": 60000,
          "createdAt": "2020-04-22T23:55:19.277Z",
          "updatedAt": "2020-04-22T23:55:19.277Z"
        },
        {
          "id": 62,
          "name": "Catburry",
          "image_url": "https://admin.itsnicethat.com/images/R2rxuhiOfC9NDljL5FmciXDNhjE=/184009/format-webp%7Cwidth-1440/bulletproof_cadbury_dairy_milk_rebrand_graphic_design_itsnicethatGLO_Logo.jpg",
          "price": 40,
          "stock": 45000,
          "createdAt": "2020-04-22T23:56:06.754Z",
          "updatedAt": "2020-04-22T23:56:06.754Z"
        },
        {
          "id": 63,
          "name": "vanHouten",
          "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJIu_xvK1jyQLBazxogtXbUa5x3uIv4XxktTaWrvCh75aQy9J0&usqp=CAU",
          "price": 100,
          "stock": 125,
          "createdAt": "2020-04-22T23:58:18.486Z",
          "updatedAt": "2020-04-22T23:58:18.486Z"
        },
        {
          "id": 64,
          "name": "choki choki",
          "image_url": "https://s1.bukalapak.com/img/1801461962/w-1000/Choki_Choki_Chococashew_11g.png",
          "price": 100,
          "stock": 100,
          "createdAt": "2020-04-23T00:01:15.338Z",
          "updatedAt": "2020-04-23T00:01:15.338Z"
        }
      ]
    }
    ```

    

  

  

- **Sample Call:**

  ```
   axios({
            method: 'GET',
            url: 'http://localhost:3000/product/customer/all'
          })
  ```



## **Find All Transaction Pending**

* **URL:**

​			/trans/pending

* **Method:**

​		`GET`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

    token:string,

    idalamat:integer

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "data": [
        {
          "id": 47,
          "ProductId": 57,
          "CustomerDetailId": 1,
          "MasterTransactionId": 1,
          "price": 30000,
          "status": "Pending",
          "payment_method": "Pending",
          "createdAt": "2020-04-23T01:49:36.613Z",
          "updatedAt": "2020-04-23T01:49:36.613Z",
          "Product": {
            "id": 57,
            "name": "Astor",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//84/MTA-3111375/astor_astor-chocolate-addict-_full04.jpg",
            "price": 30000,
            "stock": 188,
            "createdAt": "2020-04-20T15:10:07.617Z",
            "updatedAt": "2020-04-22T23:35:18.125Z"
          }
        },
        {
          "id": 48,
          "ProductId": 62,
          "CustomerDetailId": 1,
          "MasterTransactionId": 1,
          "price": 40,
          "status": "Pending",
          "payment_method": "Pending",
          "createdAt": "2020-04-23T01:49:37.732Z",
          "updatedAt": "2020-04-23T01:49:37.732Z",
          "Product": {
            "id": 62,
            "name": "Catburry",
            "image_url": "https://admin.itsnicethat.com/images/R2rxuhiOfC9NDljL5FmciXDNhjE=/184009/format-webp%7Cwidth-1440/bulletproof_cadbury_dairy_milk_rebrand_graphic_design_itsnicethatGLO_Logo.jpg",
            "price": 40,
            "stock": 45000,
            "createdAt": "2020-04-22T23:56:06.754Z",
            "updatedAt": "2020-04-22T23:56:06.754Z"
          }
        },
        {
          "id": 49,
          "ProductId": 64,
          "CustomerDetailId": 1,
          "MasterTransactionId": 1,
          "price": 100,
          "status": "Pending",
          "payment_method": "Pending",
          "createdAt": "2020-04-23T01:49:38.529Z",
          "updatedAt": "2020-04-23T01:49:38.529Z",
          "Product": {
            "id": 64,
            "name": "choki choki",
            "image_url": "https://s1.bukalapak.com/img/1801461962/w-1000/Choki_Choki_Chococashew_11g.png",
            "price": 100,
            "stock": 100,
            "createdAt": "2020-04-23T00:01:15.338Z",
            "updatedAt": "2020-04-23T00:01:15.338Z"
          }
        }
      ]
    }
    ```

    

  

  

- **Sample Call:**

  ```
    axios({
          method: 'GET',
          url: 'http://localhost:3000/trans/pending',
          headers: {
            token: localStorage.token,
            idalamat: localStorage.idalamat
          }
        })
  ```





## **Find Address  Customer**

* **URL:**

​			/customerdetail

* **Method:**

​		`GET`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

    token:string,

    idalamat:integer

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "default",
          "address": "default",
          "CustomerId": 5,
          "createdAt": "2020-04-22T09:55:26.316Z",
          "updatedAt": "2020-04-22T09:55:26.316Z"
        },
        {
          "id": 4,
          "name": "jelambar",
          "address": "Hemat 2 ",
          "CustomerId": 5,
          "createdAt": "2020-04-22T19:07:12.876Z",
          "updatedAt": "2020-04-22T19:07:12.876Z"
        },
        {
          "id": 5,
          "name": "Plumpang",
          "address": "jl pasar",
          "CustomerId": 5,
          "createdAt": "2020-04-22T19:10:53.495Z",
          "updatedAt": "2020-04-22T19:10:53.495Z"
        }
      ]
    }
    ```

    

  

  

- **Sample Call:**

  ```
    axios({
          method: 'GET',
          url: 'http://localhost:3000/customerdetail',
          headers: {
            token: localStorage.token,
            idalamat: localStorage.idalamat
          }
        })
  ```



## **Login Customer**

* **URL:**

​			/customer/login

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data**

  **Required:**

    email:string,

   password:string

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpZ3VudG9wQGdtYWlsLmNvbSIsImlhdCI6MTU4NzYwNzE5OX0.jeyX-ioKNmf241QhrviYVYEoMaTSJWHCwc6V6togvF4",
      "idalamat": 1
    }
    ```

    

  

  

- **Sample Call:**

  ```
   method: 'post',
          url: 'http://localhost:3000/customer/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
  ```



## **Customer Register**

* **URL:**

​			/customer/Register

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data**

  **Required:**

    email:string,

   password:string

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaWdAZ21haWwuY29tIiwiaWF0IjoxNTg3NjA3MzUxfQ.NcYMlobLFHukviCZFSAdA1tQLVUhKU0_gdgpxvfRTFA",
      "idalamat": 7
    }
    ```

    

  

  

- **Sample Call:**

  ```
   axios({
            method: 'post',
            url: 'http://localhost:3000/customer/Register',
            data: {
              email: this.email,
              password: this.password
            }
          })
  ```



## **Add to cart**

* **URL:**

​			''/trans'

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data Headers **

  **Required:**

     token:string,

    idalamat:integer

  **Data **

  **Required:**

     id : Integer,

    price : integer

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "result": {
        "id": 53,
        "ProductId": 58,
        "CustomerDetailId": 1,
        "MasterTransactionId": 1,
        "price": 50000,
        "status": "Pending",
        "payment_method": "Pending",
        "updatedAt": "2020-04-23T02:10:55.970Z",
        "createdAt": "2020-04-23T02:10:55.970Z"
      }
    }
    ```

    

  

  

- **Sample Call:**

  ```
   axios({
          method: 'post',
          url: 'http://localhost:3000/trans',
          headers: {
            token: localStorage.token,
            idalamat: localStorage.idalamat
          },
          data: {
            id: this.product.id,
            price: this.product.price
          }
        })
  ```



## **Delete cart**

* **URL:**

​			''/trans'

* **Method:**

​		`Delete`

- **URL Params**

  **Required:**

  `None`

- **Data Headers **

  **Required:**

     token:string,

    idalamat:integer

  **Data **

  **Required:**

     id : Integer

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "msg": "Delete Success"
    }
    ```

    

  

  

- **Sample Call:**

  ```
  axios({
          method: 'delete',
          url: 'http://localhost:3000/trans',
          headers: {
            token: localStorage.token,
            idalamat: localStorage.idalamat
          },
          data: {
            id: this.listpending.id
          }
        })
  ```

