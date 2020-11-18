import Expense from '../models/Expense';
const jwt = require('jsonwebtoken');

export async function createExpense(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });


        }
        const body = req.body;
        if (body) {
            if (body.type && body.amount && body.description) {
                const today = new Date();
                const expense = {
                    date: today,
                    type: body.type,
                    amount: body.amount,
                    description: body.description
                }
                await Expense.create(expense).then(expense => {
                    return res.status(200).json({
                        message: "Expenses created succeffully"
                    })
                }).catch(error => {
                    return res.status(500).json({
                        message: "Error, expense not created",
                        error
                    })
                })
            }
            else {
                return res.status(500).json({
                    message: "Error, expense not created"
                })
            }
        }
        else {
            return res.status(500).json({
                message: "Error, expense not created"
            })
        }
    })

};

export async function updateExpense(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const body = req.body
        if (body.id && body.type && body.amount) {
            await Expense.findOne({
                where: {
                    id_expense: body.id
                }
            }).then(async expenseUpdate => {
                if (expenseUpdate) {
                    expenseUpdate.type = body.type;
                    expenseUpdate.amount = body.amount;
                    expenseUpdate.description = body.description
                    await expenseUpdate.save().then(data => {
                        return res.status(200).json({
                            message: "Expense updated succesffully"
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            message: "Error, expense not updated",
                            error
                        })
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, expense not updated"
                    })
                }
            })
        }
        else {
            return res.status(500).json({
                message: "Error, expense not updated"
            })
        }
    })
};

export async function deleteExpense(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const idExpense = req.body.id
        if (idExpense) {
            await Expense.findOne({
                where: {
                    id_expense: idExpense
                }
            }).then(async expense => {
                if (expense) {
                    await expense.destroy().then(data => {
                        return res.status(200).json({
                            message: "Expense deleted succesffully"
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            message: "Error, expense not deleted",
                            error
                        })
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, expense not deleted"
                    })
                }
            })
        }
        else {
            return res.status(500).json({
                message: "Error, expense not deleted"
            })
        }
    })
};

export async function getAllExpenses(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        await Expense.findAll().then(expenses => {
            return res.status(200).json({
                expenses
            })
        })
    })
};