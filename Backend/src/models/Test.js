import Sequelize from 'sequelize';
import { sequelize } from "../../BaseDeDatos/database";

const Test = sequelize.define(
    "test",
    {
        id:{ type: Sequelize.INTEGER},
        data: {
            type: Sequelize.JSON,
            primaryKey:true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
   
) 

export default Test;