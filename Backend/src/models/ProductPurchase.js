import { Sequelize } from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";


const ProductPurchase = sequelize.define(
    "productopurchase",
    {
        id_product_purchase : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        quantity : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price : {
            type : Sequelize.FLOAT,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default ProductPurchase;