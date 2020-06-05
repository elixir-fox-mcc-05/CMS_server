'use strict';
module.exports = (sequelize, DataTypes) => {

    const { Model } = sequelize.Sequelize

    class UserProduct extends Model {}

    UserProduct.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        checkout: DataTypes.BOOLEAN
    }, { 
        hooks:{
        beforeCreate (UserProduct,options) {
            UserProduct.checkout = false
        }
    }, sequelize });
    UserProduct.associate = function(models) {
        UserProduct.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" });
        UserProduct.belongsTo(models.Product, { foreignKey: "productId", targetKey: "id" });
    };
    return UserProduct;
};