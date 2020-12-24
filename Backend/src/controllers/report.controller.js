import Purchase from "../models/Purchase";
import ProductSale from "../models/ProductSale";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
import Movement from "../models/Movement";
import Product from "../models/Product";
const jwt = require("jsonwebtoken");

export async function dayReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    var date = new Date().toLocaleDateString();
    await Sale.findAll({
      where: {
        date: date,
      },
      attributes: ["payment", "total"],
      include: [{ model: Product }],
      through: {
        model: ProductSale,
      },
    }).then(async (sales) => {
      await Movement.findAll({
        where: {
          date: date,
        },
        attributes: ["amount"],
      }).then(async (movements) => {
        await Expense.findAll({
          where: {
            date: date,
          },
          attributes: ["amount"],
        }).then(async (expenses) => {
          await Purchase.findAll({
            where: {
              date: date,
            },
            attributes: ["quantity", "price"],
          }).then(async (purchases) => {
            res.status(200).json({
              sales,
              movements,
              expenses,
              purchases,
            });
          });
        });
      });
    });
  });
}

export async function monthReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
  });
}

export async function yearReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
  });
}
