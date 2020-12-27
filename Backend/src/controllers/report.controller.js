import Purchase from "../models/Purchase";
import ProductSale from "../models/ProductSale";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
import Movement from "../models/Movement";
import Product from "../models/Product";
import { sequelize } from "../BaseDeDatos/database";
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const jwt = require("jsonwebtoken");

export async function dayReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    var date = req.params.date;
    await Sale.findAll({
      where: {
        date: date,
      },
      attributes: ["payment", "total"],
      include: [{ model: ProductSale }],
    })
      .then(async (sales) => {
        await Movement.findAll({
          where: {
            date: date,
          },
          attributes: ["amount"],
        })
          .then(async (movements) => {
            await Expense.findAll({
              where: {
                date: date,
              },
              attributes: ["amount"],
            })
              .then(async (expenses) => {
                await Purchase.findAll({
                  where: {
                    date: date,
                  },
                  attributes: ["quantity", "price"],
                })
                  .then(async (purchases) => {
                    res.status(200).json({
                      sales,
                      movements,
                      expenses,
                      purchases,
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Error not information",
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Error not information",
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error not information",
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error not information",
        });
      });
  });
}

export async function weekReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    var dateInit = req.params.init;
    var dateFinish = req.params.finish;

    await Sale.findAll({
      where: {
        date: { [op.between]: [dateInit, dateFinish] },
      },
      attributes: ["payment", "total"],
      include: [{ model: ProductSale }],
    })
      .then(async (sales) => {
        await Movement.findAll({
          where: {
            date: { [op.between]: [dateInit, dateFinish] },
          },
          attributes: ["amount"],
        })
          .then(async (movements) => {
            await Expense.findAll({
              where: {
                date: { [op.between]: [dateInit, dateFinish] },
              },
              attributes: ["amount"],
            })
              .then(async (expenses) => {
                await Purchase.findAll({
                  where: {
                    date: { [op.between]: [dateInit, dateFinish] },
                  },
                  attributes: ["quantity", "price"],
                })
                  .then(async (purchases) => {
                    res.status(200).json({
                      sales,
                      movements,
                      expenses,
                      purchases,
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Error not information",
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Error not information",
                });
              });
          })
          .catch((error) => {
            console.log(error);

            return res.status(500).json({
              message: "Error not information",
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error not information",
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
    var month = req.params.month;
    await Sale.findAll({
      where: {
        andOp: sequelize.where(
          sequelize.fn("date_part", "month", sequelize.col("date")),
          month
        ),
      },
      attributes: ["payment", "total"],
      include: [{ model: ProductSale }],
    })
      .then(async (sales) => {
        await Movement.findAll({
          where: {
            andOp: sequelize.where(
              sequelize.fn("date_part", "month", sequelize.col("date")),
              month
            ),
          },
          attributes: ["amount"],
        })
          .then(async (movements) => {
            await Expense.findAll({
              where: {
                andOp: sequelize.where(
                  sequelize.fn("date_part", "month", sequelize.col("date")),
                  month
                ),
              },
              attributes: ["amount"],
            })
              .then(async (expenses) => {
                await Purchase.findAll({
                  where: {
                    andOp: sequelize.where(
                      sequelize.fn("date_part", "month", sequelize.col("date")),
                      month
                    ),
                  },
                  attributes: ["quantity", "price"],
                })
                  .then(async (purchases) => {
                    res.status(200).json({
                      sales,
                      movements,
                      expenses,
                      purchases,
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Error not information",
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Error not information",
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error not information",
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error not information",
        });
      });
  });
}

export async function yearReport(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    var year = req.params.year;
    await Sale.findAll({
      where: {
        andOp: sequelize.where(
          sequelize.fn("date_part", "year", sequelize.col("date")),
          year
        ),
      },
      attributes: ["payment", "total"],
      include: [{ model: ProductSale }],
    })
      .then(async (sales) => {
        await Movement.findAll({
          where: {
            andOp: sequelize.where(
              sequelize.fn("date_part", "year", sequelize.col("date")),
              year
            ),
          },
          attributes: ["amount"],
        })
          .then(async (movements) => {
            await Expense.findAll({
              where: {
                andOp: sequelize.where(
                  sequelize.fn("date_part", "year", sequelize.col("date")),
                  year
                ),
              },
              attributes: ["amount"],
            })
              .then(async (expenses) => {
                await Purchase.findAll({
                  where: {
                    andOp: sequelize.where(
                      sequelize.fn("date_part", "year", sequelize.col("date")),
                      year
                    ),
                  },
                  attributes: ["quantity", "price"],
                })
                  .then(async (purchases) => {
                    res.status(200).json({
                      sales,
                      movements,
                      expenses,
                      purchases,
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Error not information",
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Error not information",
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error not information",
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error not information",
        });
      });
  });
}
