'use strict';

/* 
sequelize model:create --name PaymentAdrress --attributes user_id:integer,first_name:string,last_name:string,username:string,email:string,address1:string,address2:string,city:string,province:string,ZIP:integer,payment_method:string,name_on_card:string,card_number:integer,card_expiration:string,card_CVV:string
*/

module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.Sequelize.Model

  class PaymentAdrress extends Model {}

  PaymentAdrress.init({
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    ZIP: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    name_on_card: DataTypes.STRING,
    card_number: DataTypes.STRING,
    card_expiration: DataTypes.STRING,
    card_CVV: DataTypes.STRING
  }, {
    sequelize
  })

  PaymentAdrress.associate = function(models) {
    // associations can be defined here
  };
  return PaymentAdrress;
};