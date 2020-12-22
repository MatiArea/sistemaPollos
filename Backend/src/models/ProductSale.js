import { Sequelize } from "sequelize";
import { sequelize } from "../BaseDeDatos/database";

const ProductSale = sequelize.define(
  "productsale",
  {
    id_product_sale: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cost_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    sale_price:{
      type: Sequelize.FLOAT,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ProductSale;
