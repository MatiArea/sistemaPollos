import Sequelize from 'sequelize';
import { sequelize } from "../BaseDeDatos/database";
import Product from "../models/Product";
import ProductPurchase from "../models/ProductPurchase";


const Purchase = sequelize.define(
    "purchase",{
        id_purchase: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Purchase.belongsToMany(Product, { through: ProductPurchase });
Product.belongsToMany(Purchase, { through: ProductPurchase });

export default Purchase; 