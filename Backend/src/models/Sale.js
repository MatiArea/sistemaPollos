import Sequelize from 'sequelize';
import { sequelize } from "../../BaseDeDatos/database";


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

export default Sale; 