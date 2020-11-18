import { Sequelize } from 'sequelize';
import { sequelize } from "../../BaseDeDatos/database";


const ProductSale = sequelize.define(
    "productosale",
    {
        id_product_sale : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        quantity : {
            type: Sequelize.INTEGER,
            allowNull: FALSE
        },
        price : {
            type : Sequelize.FLOAT,
            allowNull: false
        },
        id_sale : {
            type : Sequelize.INTEGER,
        },
        id_product : {
            type : Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default ProductSale;