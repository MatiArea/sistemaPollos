import Cash from '../models/Cash';
const jwt = require('jsonwebtoken');

export async function createCash(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const body = req.body;
        if (body) {
            if (body.amount >=0) {
                const cash = {
                    amount:body.amount
                }
                await Cash.create(cash).then(cash => {
                    return res.status(200).json({
                        message: "Cash created succeffully"
                    })
                }).catch(error => {
                    return res.status(500).json({
                        message: "Error, cash not created",
                        error
                    })
                })
            }
            else {
                return res.status(500).json({
                    message: "Error, cash not created"
                })
            }
        }
        else {
            return res.status(500).json({
                message: "Error, cash not created"
            })
        }
    })
};

export async function updateCash(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const body = req.body;
        if (body) {
            if (body.amount >=0) {
                const newCash = {
                    amount:body.amount
                }
                await Cash.findOne().then(async(cash) => {
                    if(cash === null){
                        await Cash.create(newCash).then(cash => {
                            return res.status(200).json({
                                message: "Cash created succeffully"
                            })
                        }).catch(error => {
                            console.log(error)
                            return res.status(500).json({
                                message: "Error, cash not created",
                                error
                            })
                        })
                    }
                    else {
                        cash.amount = newCash.amount
                        await cash.save().then(cash =>{
                            return res.status(200).json({
                                message: "Error, cash created succefully" 
                            })
                        })
                        .catch(error =>{
                            return res.status(500).json({
                                message: "Error, cash not created"
                            })
                        })
                    }
                })      
            }
        }
    })
}

export async function deleteCash(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
    })
};

export async function getCash(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        await Cash.findOne().then(cash => {
            return res.status(200).json({
                cash
            })
        })
    })
};