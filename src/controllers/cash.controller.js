import Cash from "../models/Cash";
import Sale from "../models/Sale";
const jwt = require("jsonwebtoken");

export async function createCash(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.amount >= 0) {
        const cash = {
          amount: body.amount,
        };
        await Cash.create(cash)
          .then((cash) => {
            return res.status(200).json({
              message: "Cash created succeffully",
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, cash not created",
              error,
            });
          });
      } else {
        return res.status(500).json({
          message: "Error, cash not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, cash not created",
      });
    }
  });
}

export async function removeCash(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.amount >= 0) {
        const newCash = {
          amount: body.amount,
        };
        await Cash.findByPk(1)
          .then(async (cash) => {
            if (cash) {
              cash.amount -= newCash.amount;
              await cash
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Cash updated succeffully",
                  });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Error, cash not created",
                  });
                });
            } else {
              return res.status(500).json({
                message: "Error, cash not created",
                error,
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, cash not created",
            });
          });
      }
    }
  });
}

export async function addCash(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.amount >= 0) {
        const newCash = {
          amount: body.amount,
        };
        await Cash.findByPk(1)
          .then(async (cash) => {
            if (cash) {
              cash.amount += newCash.amount;
              await cash
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Cash updated succeffully",
                  });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Error, cash not created",
                  });
                });
            } else {
              await Cash.create(newCash)
                .then((cash) => {
                  return res.status(200).json({
                    message: "Cash created succeffully",
                  });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Error, cash not created",
                    error,
                  });
                });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, cash not created",
            });
          });
      }
    }
  });
}

export async function validateCash(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }

    const date = new Date().toISOString().split("T")[0];
    await Sale.findAll({
      where: {
        date: date,
      },
    })
      .then(async (sales) => {
        await Purchase.findAll({
          where: { date: date },
        })
          .then(async (purchases) => {
            await Expense.findAll({
              where: {
                date: date,
              },
            })
              .then(async (expenses) => {
                await Movement.findAll({
                  where: {
                    date: date,
                  },
                })
                  .then((movements) => {
                    return res.status(200).json({
                      sales,
                      purchases,
                      expenses,
                      movements,
                    });
                  })
                  .catch((error) => {
                    res.status(500);
                  });
              })
              .catch((error) => {
                res.status(500);
              });
          })
          .catch((error) => {
            res.status(500);
          });
      })
      .catch((error) => {
        res.status(500);
      });
  });
}

export async function getCash(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    await Cash.findByPk(1).then((cash) => {
      return res.status(200).json({
        cash,
      });
    });
  });
}
