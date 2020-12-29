import Product from '../models/Product';
import Purchase from '../models/Purchase';
const jwt = require('jsonwebtoken');

export async function createProduct(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            })
        }
        const body = req.body;
        if (body) {
            if (body.code && body.name) {
                const newProduct = {
                    code: body.code,
                    name: body.name,
                    stock: 0,
                    cost_price: [],
                }
                await Product.create(newProduct).then(newProduct => {
                    return res.status(200).json({
                        message: "Product created succesffully"
                    })
                }).catch(error => {
                    return res.status(500).json({
                        message: "Error, product not created"
                    })
                })
            }
            else {
                return res.status(500).json({
                    message: "Error, product not created"
                })
            }
        }
        else {
            return res.status(500).json({
                message: "Error, product not created"
            })
        }
    })
}

export async function updateProduct(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            })
        }
        const body = req.body
        if (body && body.id && body.name && body.code && (body.stock >= 0)) {
            await Product.update({
                code: body.code,
                name: body.name,
                stock: body.stock,
            }, {
                where: {
                    id_product: body.id
                }
            }).then(productUpdate => {
                if (productUpdate == 1) {
                    return res.status(200).json({
                        message: "Product updated succeffully",
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, product not updated or not exist"
                    })
                }
            }).catch(error => {
                return res.status(500).json({
                    message: "Error, product not exist"
                })
            })
        }
        else {
            return res.status(500).json({
                message: "Error, product not exist"
            })
        }
    })
}

export async function deleteProduct(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            })
        }
        const params = req.params
        if (params && params.id) {
            await Product.findByPk(params.id).then(product => {
                if (product) {
                    product.destroy().then(productDeleted => {
                        if (productDeleted) {
                            return res.status(200).json({
                                message: "Product deleted succeffully"
                            })
                        }
                        else {
                            return res.status(500).json({
                                message: "Error, product not exist"
                            })
                        }
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, product not exist"
                    })
                }
            }).catch(error => {
                return res.status(500).json({
                    message: "Error, product not exist"
                })
            })
        }
        else {
            return res.status(500).json({
                message: "Error, product not exist"
            })
        }
    })
}

export async function getAllProducts(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            })
        }
        await Product.findAll({
            order: [
                ['name', 'ASC'],
            ],
        }).then(products => {
            return res.status(200).json({
                products
            })
        }).catch(error => {
            return res.status(500).json({
                message: "Error, product not created"
            })
        })
    })
}

export async function getOneProduct(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            })
        }
        const params = req.params
        await Product.findByPk(params.id).then(product => {
            if (product) {
                return res.status(200).json({
                    product
                })
            }
            else {
                return res.status(500).json({
                    message: "Error, product not exist",
                })
            }
        }).catch(error => {
            return res.status(500).json({
                message: "Error, product not exist",
            })
        })
    })
}