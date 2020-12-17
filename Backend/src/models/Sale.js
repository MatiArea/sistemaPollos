import Sequelize from 'sequelize';
import Client from '../models/Client';
import Product from '../models/Product';
import ProductSale from '../models/ProductSale'
import { sequelize } from "../BaseDeDatos/database";


const Sale = sequelize.define(
    "sale",{
        id_sale: {
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
        },
        id_client : {
            type : Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);


//Relations

Client.hasMany(Sale,{ foreignKey: "id_client"});
Sale.belongsTo(Client, { foreignKey: "id_client"});

Sale.belongsToMany(Product,{ through: ProductSale })
Product.belongsToMany(Sale,{ through: ProductSale })

export default Sale; 