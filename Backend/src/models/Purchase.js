import Sequelize from 'sequelize';
import { sequelize } from "../../BaseDeDatos/database";


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

export default Purchase; 