import Sale from "../models/Sale";
import Product from "../models/Product";
import Client from "../models/Client";
import Cash from "../models/Cash";
import ProductSale from "../models/ProductSale";
import { each } from "async";
import { product } from "puppeteer";
const jwt = require("jsonwebtoken");

export async function createSale(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.total >= 0 && body.id_client && body.date && body.items) {
        var sale = {
          number: body.number,
          date: body.date,
          payment: body.payment,
          total: body.total,
          id_client: body.id_client,
        };
        await Sale.create(sale)
          .then(async (newSale) => {
            body.items.forEach(async (item) => {
              let quantity = item.quantity;
              await Product.findByPk(item.id_product).then((product) => {
                let arrayCost = [];
                product.cost_price.forEach((element) => {
                  arrayCost.push(element);
                });
                while (quantity > 0) {
                  let costPrice = arrayCost[0].price;
                  let quantityStock = arrayCost[0].quantity;
                  if (quantityStock <= quantity) {
                    arrayCost.shift();
                    newSale.addProduct(product, {
                      through: {
                        quantity: quantityStock,
                        cost_price: costPrice,
                        sale_price: item.sale_price,
                        id_product: item.id_product,
                        id_sale: newSale.id_sale,
                      },
                    });
                  } else {
                    newSale.addProduct(product, {
                      through: {
                        quantity: quantity,
                        cost_price: costPrice,
                        sale_price: item.sale_price,
                      },
                    });
                    arrayCost[0].quantity -= quantity;
                  }
                  quantity -= quantityStock;
                }
                product.stock -= item.quantity;
                product.cost_price = [];
                arrayCost.forEach((element) => {
                  product.cost_price.push(element);
                });
                product.save().then();
              });
            });
            await Cash.findByPk(1).then((cashUpdate) => {
              if (cashUpdate) {
                cashUpdate.amount += sale.payment;
                cashUpdate.save().then(async (cashSave) => {
                  await Client.findByPk(sale.id_client).then((client) => {
                    client.balance += sale.total - sale.payment;
                    client.save().then((clientModify) => {
                      return res.status(200).json({
                        message: "Ok, Sale created succeffully",
                      });
                    });
                  });
                });
              }
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Error, Sale not created",
            });
          });
      } else {
        return res.status(500).json({
          message: "Error, Sale not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, Sale not created",
      });
    }
  });
}

export async function updateSale(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
  });
}

export async function deleteSale(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let params = req.params;
    if (params.id) {
      Sale.findByPk(params.id, {
        include: [{ model: ProductSale }],
      })
        .then(async (saleToDelete) => {
          each(saleToDelete.productsales, (item) => {
            Product.findByPk(item.id_product).then((productToModify) => {
              let arrayCost = [];
              productToModify.cost_price.forEach((element) => {
                arrayCost.push(element);
              });
              arrayCost.unshift({
                quantity: item.quantity,
                price: item.cost_price,
              });
              productToModify
                .update(
                  {
                    stock: (productToModify.stock += item.quantity),
                    cost_price: arrayCost,
                  },
                  {
                    where: {
                      id_product: item.id_product,
                    },
                  }
                )
                .then((data) => {
                  item.destroy().then();
                });
            });
          });
          await Cash.findByPk(1).then((cash) => {
            if (cash) {
              cash.amount -= saleToDelete.payment;
              cash.save().then(async (cashSave) => {
                await Client.findByPk(saleToDelete.id_client).then(
                  async (client) => {
                    client.balance -= saleToDelete.total - saleToDelete.payment;
                    client.save().then((clientModify) => {
                      saleToDelete
                        .destroy()
                        .then((saleDeleted) => {
                          if (saleDeleted) {
                            return res.status(200).json({
                              message: "Sale deleted succefully",
                            });
                          }
                        })
                        .catch((error) => {
                          return res.status(500).json({
                            message: "Error, sale not deleted",
                          });
                        });
                    });
                  }
                );
              });
            }
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error, sale not deleted",
          });
        });
    } else {
      return res.status(500).json({
        message: "Error, sale not deleted",
      });
    }
  });
}

export async function getOneSale(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let params = req.params;
    if (params) {
      Sale.findByPk(params.id, {
        include: [
          { model: Client, attributes: ["name"] },
          { model: Product, attributes: ["id_product", "name", "code"] },
          { model: ProductSale },
        ],
        through: {
          model: ProductSale,
          unique: false,
        },
      })
        .then((sale) => {
          return res.status(200).json({
            sale,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error, sale not exist",
          });
        });
    } else {
      return res.status(500).json({
        message: "Error, sale not exist",
      });
    }
  });
}

export async function getAllSales(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    let offset = req.params.page;
    Sale.findAll({
      offset,
      limit: 10,
      include: [Client],
      order: [["date", "DESC"]],
    }).then((sales) => {
      return res.status(200).json({
        sales,
      });
    });
  });
}
