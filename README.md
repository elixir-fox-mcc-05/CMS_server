# CMS_server

## URL SERVER : https://shielded-bastion-44955.herokuapp.com/

### NOTE : ADD DOTENV FILE and CONFIG IF YOU CLONE THIS API IN APP.JS

####    Create User

* Url

  /user/register

* Method

  'Post'

* Url Params

  None

* Data Params

  ```
    name  : string
    email : string
    password : string
    confirmPassword : string
  ```

* Succes Response

  ```
    Code : 201
    Content : "User" {
      id : User.id
      email : User.email
    }
  ```

* Error Response

  ```
    Code : 500
    Content : "Something Went Wrong"
  ```

* Sample Call

  ```
    axios({
      method : 'post'
      url : '/user/register'
      data : {
        name,
        email,
        password,
        confirmPassword
      }
    })
      .onSucces(function(result) {
        id : result.id
        email : result.email
      })
  ```

####    Login User

* Url

  /user/login

* Method

  'Post'

* Url Params

  None

* Data Params

  ```
    email : string
    password : string
  ```

* Succes Response

  ```
    Code : 202
    Content : {
      acces_token : some token
      Role : {
        id : id,
        name : Role name
      }
    }
  ```

* Error Response

  ```
    Code : 500
    Content : "Something Went Wrong"
  ```

* Sample Call

  ```
    axios({
      method : 'post'
      url : '/user/login'
      data : {
        email,
        password
      }
    })
      .onSucces(function(result) {
        token : some token
      })
  ```

#### Get all Products

* Url

  /product

* Method

  'get'

* Url Params

  'Token' : some token

* Data Params

  None

* Succes Response

  ```
    Code : 200
    Content : Products : [
      {
        id : 24
        name : "Kitchen Knifes"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 24
        CategoryId : 3
        Categories : {
          id : 3,
          name : House Items
        }
        createdAt : Some Date
        updatedAt : Some Date
      }
      ]
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/product'
      method : 'post'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Product : result
      })
  ```

####  Create Products

* Url

  /product

* Method

  "post"

* Url Params

  "Token" : Some Token

* Data Params

  ```
    name : String
    image_url : String
    price : Integer
    stock : integer
    CategoryId : Integer
  ```

* Succes Response

  ```
    Code : 201
    Content : Products : {
        id : 24
        name : "Kitchen Knifes"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 24
        CategoryId : 3
        Categories : {
          id : 3,
          name : House Items
        }
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : "Something Went Wrong"
  ```

* Sample Call

  ```
    axios({
      method : "post"
      url : "/product"
      headers : {
        token : some token
      }
      data : {
        name : "Kitchen Knives"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 24
        CategoryId : 3
      }
    })
      .onSucces(function(result){
          Product : result
      })
  ```

####  Products get by Id

* Url

  /product/:id

* Method

  'get'

* Url Params

  ```
  'Token' : some token
  id : Integer
  ```

* Data Params

  None

* Succes Response

  ```
    Code : 200
    Content : Products : {
        id : 24
        name : "Kitchen Knifes"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 24
        CategoryId : 3
        Categories : {
          id : 3,
          name : House Items
        }
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/product/24'
      method : 'get'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Product : result
      })
  ```

####  Edit Products by id

* Url

  /product/:id

* Method

  'PUT'

* Url Params

  ```
    'Token' : some token
    'id' : integer
  ```

* Data Params

  ```
    name : string,
    image_url : string,
    price : integer,
    stock : integer,
    CategoryId : integer
  ```

* Succes Response

  ```
    Code : 202
    Content : Products :{
        id : 24
        name : "Kitchen Knifes"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 100
        CategoryId : 3
        Categories : {
          id : 3,
          name : House Items
        }
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/product/24'
      method : 'PUT'
      headers : {
        token : some token
      }
      data : {
        name : "Kitchen Knives"
        image_url : www.2344.com/233123.jpg
        price : 250000
        stock : 100
        CategoryId : 3
      }
    })
      .onSucces(function(result) {
        Product : result
      })
  ```

####  Delete Products by id

* Url

  /product/:id

* Method

  'DELETE'

* Url Params

  ```
    'Token' : some token
    'id' : integer
  ```

* Data Params

  ```
    NONE
  ```

* Succes Response

  ```
    Code : 202
    Content : Message : {succes destroy content with id 25}
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/product/25'
      method : 'DELETE'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Message : succes destroy content with id 25
      })
  ```

#### Get all Category

* Url

  /category

* Method

  'get'

* Url Params

  'Token' : some token

* Data Params

  None

* Succes Response

  ```
    Code : 200
    Content : Category : [
      {
        id : 1
        name : "House Items"
        createdAt : Some Date
        updatedAt : Some Date
      }
      ]
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/category'
      method : 'post'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Category : result
      })
  ```

####  Create Category

* Url

  /category

* Method

  "post"

* Url Params

  "Token" : Some Token

* Data Params

  ```
    name : String
  ```

* Succes Response

  ```
    Code : 201
    Content : Category : {
        id : 24
        name : "Tablet"
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : "Something Went Wrong"
  ```

* Sample Call

  ```
    axios({
      method : "post"
      url : "/category"
      headers : {
        token : some token
      }
      data : {
        name : "Tablet"
      }
    })
      .onSucces(function(result){
          Category : result
      })
  ```

####  Category get by Id

* Url

  /category/:id

* Method

  'get'

* Url Params

  ```
  'Token' : some token
  id : Integer
  ```

* Data Params

  None

* Succes Response

  ```
    Code : 200
    Content : Category : {
        id : 24
        name : "Item House"
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/category/24'
      method : 'get'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Category : result
      })
  ```

####  Edit Category by id

* Url

  /category/:id

* Method

  'PUT'

* Url Params

  ```
    'Token' : some token
    'id' : integer
  ```

* Data Params

  ```
    name : string,
  ```

* Succes Response

  ```
    Code : 202
    Content : Category :
      {
        id : 24
        name : "Electronics"
        createdAt : Some Date
        updatedAt : Some Date
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/category/24'
      method : 'PUT'
      headers : {
        token : some token
      }
      data : {
        name : "Electronics"
      }
    })
      .onSucces(function(result) {
        Category : result
      })
  ```

####  Delete Category by id

* Url

  /category/:id

* Method

  'DELETE'

* Url Params

  ```
    'Token' : some token
    'id' : integer
  ```

* Data Params

  ```
    NONE
  ```

* Succes Response

  ```
    Code : 202
    Content : Message : {succes destroy content with id 25}
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/category/25'
      method : 'DELETE'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Message : succes destroy content with id 25
      })
  ```
####  Find All Wishlist

* Url

  /transaction

* Method

  'GET'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    NONE
  ```

* Succes Response

  ```
    Code : 200
    Content : {
            "Wishlist": [
              {
                "id": 74,
                "UserId": 2,
                "ProductId": 25,
                "status": false,
                "quantity": 1,
                "price": null,
                "createdAt": "2020-06-04T01:45:32.901Z",
                "updatedAt": "2020-06-04T01:45:32.901Z",
                "Product": {
                  "id": 25,
                  "name": "Asus G240UJ",
                  "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/01/image004-640x425.png",
                  "price": 23000000,
                  "stock": 8,
                  "CategoryId": 3,
                  "createdAt": "2020-05-26T07:25:39.798Z",
                  "updatedAt": "2020-06-04T01:19:07.829Z"
                }
              }
            ]
          }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/transaction'
      method : 'GET'
      headers : {
        token : some token
      },
      data: {
        ProductId: INTEGER
      }
    })
      .onSucces(function(result) {
        Wishtlist : result
      })
  ```

####  CheckOut Wishlist

* Url

  /transaction/checkout

* Method

  'PUT'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    ListCheckOut: Array(Wishlist)
  ```

* Succes Response

  ```
    Code : 200
    Content : {Message: Your transaction will processed}
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/transaction/checkout'
      method : 'POST'
      headers : {
        token : some token
      }
    })
      .onFinal(function(result) {
        Message : 'Your transaction will processed'
      })
  ```
  CategoryId": 3,
                  "createdAt": "2020-05-26T07:25:39.798Z",
                  "updatedAt": "2020-06-04T01:19:07.829Z"
                }
              }
            ]
          }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/transaction'
      method : 'POST'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Wishtlist : result
      })
  ```

####  CheckOut History

* Url

  /transaction/history

* Method

  'GET'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    NONE
  ```

* Succes Response

  ```
    Code : 200
    Content : {
              "Wishlist": [
                {
                  "id": 74,
                  "UserId": 2,
                  "ProductId": 25,
                  "status": true,
                  "quantity": 1,
                  "price": null,
                  "createdAt": "2020-06-04T01:45:32.901Z",
                  "updatedAt": "2020-06-04T01:45:32.901Z",
                  "Product": {
                    "id": 25,
                    "name": "Asus G240UJ",
                    "image_url": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/01/image004-640x425.png",
                    "price": 23000000,
                    "stock": 8,
                    "CategoryId": 3,
                    "createdAt": "2020-05-26T07:25:39.798Z",
                    "updatedAt": "2020-06-04T01:19:07.829Z"
                  }
                }
              ]
            }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/transaction/history'
      method : 'GET'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        Wishlist : result
      })
  ```

####  Delete WishList

* Url

  /transaction/:id

* Method

  'DELETE'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    NONE
  ```

* Succes Response

  ```
    Code : 200
    Content : {message: 'Succes delete wishlist'}
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/transaction/:23'
      method : 'DELETE'
      headers : {
        token : some token
      }
    })
      .onSucces(function(result) {
        message: 'Succes delete wishlist'
      })
  ```

#### TOPUP User Money

* Url

  /user/topup

* Method

  'PUT'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    money: INTEGER
  ```

* Succes Response

  ```
    Code : 200
    Content : {
      Money: 2000000,
      message: "Your balanced has been increased"
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/user/topup'
      method : 'PUT'
      headers : {
        token : some token
      },
      data: {
        money: INTEGER
      }
    })
      .onSucces(function(result) {
          Money: result.money,
          message: "Your balanced has been increased"
      })
  ```

#### update User Money After Payment

* Url

  /user/transaction

* Method

  'PUT'

* Url Params

  ```
    'Token' : some token
  ```

* Data Params

  ```
    money: INTEGER
  ```

* Succes Response

  ```
    Code : 200
    Content : {
      money: 19640000
      }
  ```

* Error Response

  ```
  Code : 500
  Content : Something Went Wrong
  ```

* Sample Call

  ```
    axios({
      url : '/user/transaction'
      method : 'PUT'
      headers : {
        token : some token
      },
      data: {
        money: INTEGER
      }
    })
      .onSucces(function(result) {
          Money: result.money,
      })
  ```