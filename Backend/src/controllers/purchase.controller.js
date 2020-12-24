import Purchase from "../models/Purchase";
import Product from "../models/Product";
import Cash from "../models/Cash";
const jwt = require("jsonwebtoken");

export async function createPurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (
        body.idProduct &&
        body.number &&
        body.date &&
        body.price >= 0 &&
        body.quantity >= 0
      ) {
        const purchase = {
          date: body.date,
          number: body.number,
          quantity: body.quantity,
          price: body.price,
          id_product: body.idProduct,
        };
        await Product.findByPk(purchase.id_product).then(async (product) => {
          let arrayPrice = [];

          product.cost_price.forEach((element) => {
            arrayPrice.push(element);
          });

          let newPrice = {
            quantity: purchase.quantity,
            price: purchase.price,
          };

          arrayPrice.push(newPrice);
          product
            .update(
              {
                stock: product.stock + purchase.quantity,
                cost_price: arrayPrice,
              },
              {
                where: {
                  id_product: body.id,
                },
              }
            )
            .then(async (productUpdate) => {
              await Purchase.create(purchase)
                .then(async (data) => {
                  await Cash.findOne({
                    where: {
                      init: false,
                    },
                  }).then((cash) => {
                    cash.amount -= purchase.quantity * purchase.price;
                    cash.save().then((cashSave) => {
                      return res.status(200).json({
                        message: "Purchase created succeffully",
                      });
                    });
                  });
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(500).json({
                    message: "Error, purchase not created",
                  });
                });
            });
        });
      } else {
        return res.status(500).json({
          message: "Error, purchase not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, purchase not created",
      });
    }
  });

  // const purchase = {
  //     number:1005,
  //     date: new Date(),
  // }

  // await Product.findByPk(6).then(async(product) => {
  //     console.log(product)
  //     if (product) {
  //         const newPurchase = await Purchase.create(purchase)
  //         newPurchase.addProduct(product,{ through: { quantity:15 , price:152 } })
  //     }
  // }).catch(error => {
  //     return res.status(500).json({
  //         message: "Error, product not exist",
  //         error
  //     })
  // })
  // body.items.forEach(item => {
  //     newPurchase.addProduct(item.Product,{ through: { quantity:item.cantidad, price:item.precio } })
  // });
}

export async function updatePurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (
        body.id &&
        body.idProduct &&
        body.number &&
        body.date &&
        body.price &&
        body.quantity
      ) {
        const newPurchase = {
          date: body.date,
          number: body.number,
          quantity: body.quantity,
          price: body.price,
          id_product: body.idProduct,
        };
        await Purchase.findByPk(body.id).then(async (purchase) => {
          if (
            purchase.quantity != newPurchase.quantity ||
            purchase.price != newPurchase.price
          ) {
            if (expenseUpdate.amount > body.amoun) {
              await Cash.findOne().then((cash) => {
                cash.amount +=
                  expenseUpdate.amount -
                  newPurchase.quantity * newPurchase.price;
                cash.save().then();
              });
            } else {
              await Cash.findOne().then((cash) => {
                cash.amount -=
                  newPurchase.quantity * newPurchase.price -
                  expenseUpdate.amount;
                cash.save().then();
              });
            }
          }
          purchase
            .update(newPurchase, {
              where: {
                id_purchase: body.id,
              },
            })
            .then(async (purchaseUpdate) => {
              if (purchaseUpdate == 1) {
                res.status(200).json({
                  message: "Purchase updated succeffully",
                });
              } else {
                return res.status(500).json({
                  message: "Error, product not updated or not exist",
                });
              }
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Error, purchase not created",
              });
            });
        });
      } else {
        return res.status(500).json({
          message: "Error, purchase not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, purchase not created",
      });
    }
  });

  // const purchase = {
  //     number:1005,
  //     date: new Date(),
  // }

  // await Product.findByPk(6).then(async(product) => {
  //     console.log(product)
  //     if (product) {
  //         const newPurchase = await Purchase.create(purchase)
  //         newPurchase.addProduct(product,{ through: { quantity:15 , price:152 } })
  //     }
  // }).catch(error => {
  //     return res.status(500).json({
  //         message: "Error, product not exist",
  //         error
  //     })
  // })
  // body.items.forEach(item => {
  //     newPurchase.addProduct(item.Product,{ through: { quantity:item.cantidad, price:item.precio } })
  // });
}

export async function deletePurchase(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    if (params && params.id) {
      await Purchase.findByPk(params.id)
        .then(async (purchase) => {
          if (purchase) {
            await Product.findByPk(purchase.id_product).then(
              async (product) => {
                await product
                  .update(
                    {
                      stock: product.stock - purchase.quantity,
                    },
                    {
                      where: {
                        id_product: purchase.idProduct,
                      },
                    }
                  )
                  .then(async (data) => {
                    await Cash.findOne()
                      .then((cash) => {
                        cash.amount += purchase.quantity * purchase.price;
                        cash.save().then(async (cashSave) => {
                          await purchase.destroy().then((purchaseDeleted) => {
                            if (purchaseDeleted) {
                              return res.status(200).json({
                                message: "Purchase deleted succeffully",
                              });
                            } else {
                              return res.status(500).json({
                                message: "Error, Purchase not exist",
                              });
                            }
                          });
                        });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          message: "Error, expense not deleted",
                          error,
                        });
                      });
                  });
              }
            );
          } else {
            return res.status(500).json({
              message: "Error, Purchase not exist",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error, Purchase not exist",
          });
        });
    } else {
      return res.status(500).json({
        message: "Error, Purchase not exist",
      });
    }
  });
}

export async function getAllPurchases(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    await Purchase.findAll({
      include: [Product],
      order: [
        ['date', 'DESC'],
    ],
    }).then((purchases) => {
      return res.status(200).json({
        purchases,
      });
    });
  });
}

export async function getOnePurchases(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    if (params.idPurchase) {
      await Purchase.findByPk(params.idPurchase, {
        include: [Product],
      })
        .then((purchase) => {
          return res.status(200).json({
            purchase,
          });
        })
        .catch((error) => {
          return res.status(200).json({
            message: "Error, purchase not exist",
          });
        });
    } else {
      return res.status(200).json({
        message: "Error, purchase not exist",
      });
    }
  });
}
