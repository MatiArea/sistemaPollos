import Expense from "../models/Expense";
import Cash from "../models/Cash";

const jwt = require("jsonwebtoken");

export async function createExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.type && body.amount >= 0 && body.description) {
        const expense = {
          date: body.date,
          type: body.type,
          amount: body.amount,
          description: body.description,
        };
        await Expense.create(expense)
          .then(async (newExpense) => {
            await Cash.findOne({
              where: {
                init: false,
              },
            }).then((cash) => {
              cash.amount -= expense.amount;
              cash.save().then((cashSave) => {
                return res.status(200).json({
                  message: "Expenses created succeffully",
                });
              });
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, expense not created",
              error,
            });
          });
      } else {
        return res.status(500).json({
          message: "Error, expense not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, expense not created",
      });
    }
  });
}

export async function updateExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body.id && body.type && body.amount >= 0) {
      await Expense.findOne({
        where: {
          id_expense: body.id,
        },
      }).then(async (expenseUpdate) => {
        if (expenseUpdate) {
          if (expenseUpdate.amount != body.amount) {
            if (expenseUpdate.amount > body.amount) {
              await Cash.findOne().then((cash) => {
                cash.amount += expenseUpdate.amount - body.amount;
                cash.save().then();
              });
            } else {
              await Cash.findOne().then((cash) => {
                cash.amount -= body.amount - expenseUpdate.amount;
                cash.save().then();
              });
            }
          }
          expenseUpdate.type = body.type;
          expenseUpdate.amount = body.amount;
          expenseUpdate.description = body.description;
          await expenseUpdate
            .save()
            .then((data) => {
              return res.status(200).json({
                message: "Expense updated succesffully",
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Error, expense not updated",
                error,
              });
            });
        } else {
          return res.status(500).json({
            message: "Error, expense not updated",
          });
        }
      });
    } else {
      return res.status(500).json({
        message: "Error, expense not updated",
      });
    }
  });
}

export async function deleteExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const idExpense = req.params.id;
    if (idExpense) {
      await Expense.findOne({
        where: {
          id_expense: idExpense,
        },
      }).then(async (expense) => {
        if (expense) {
          await Cash.findOne()
            .then((cash) => {
              cash.amount += expense.amount;
              cash.save().then(async (cashSave) => {
                await expense
                  .destroy()
                  .then((data) => {
                    return res.status(200).json({
                      message: "Expense deleted succesffully",
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Error, expense not deleted",
                      error,
                    });
                  });
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Error, expense not deleted",
                error,
              });
            });
        } else {
          return res.status(500).json({
            message: "Error, expense not deleted",
          });
        }
      });
    } else {
      return res.status(500).json({
        message: "Error, expense not deleted",
      });
    }
  });
}

export async function getOneExpense(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    await Expense.findByPk(params.id)
      .then((expense) => {
        if (expense) {
          return res.status(200).json({
            expense,
          });
        } else {
          return res.status(500).json({
            message: "Error, expense not exist",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error, expense not exist",
        });
      });
  });
}

export async function getAllExpenses(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let offset = req.params.page * 10;
    await Expense.findAll({
      offset,
      limit: 10,
      order: [["date", "DESC"]],
    }).then((expenses) => {
      return res.status(200).json({
        expenses,
      });
    });
  });
}
