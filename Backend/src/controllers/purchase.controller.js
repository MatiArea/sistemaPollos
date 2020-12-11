import Purchase from "../models/Purchase";
import Product from "../models/Product";
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
      if (body.idProduct && body.number && body.date) {
        const purchase = {
          date: body.date,
          number: body.number,
          id_product: body.idProduct,
        };
        await Purchase.create(purchase)
        .then((data) => {
          return res.status(200).json({
            message: "Purchase created succeffully",
          });
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({
            message: "Error, purchase not created",
          });
        });
        // body.items.forEach(item => {
          //     newPurchase.addProduct(item.Product,{ through: { quantity:item.cantidad, price:item.precio } })
          // });
        } else {
        console.log('Error')
        return res.status(500).json({
          message: "Error, purchase not created",
        });
      }
    } else {
      console.log('Error1')
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
}

export async function updatePurchase(req, res) {
  console.log("HOLA RESPUESTA");
}

export async function deletePurchase(req, res) {
  console.log("HOLA RESPUESTA");
}

export async function getAllPurchases(req, res) {
  await Purchase.findAll({
    include: [Product],
  }).then((data) => {
    return res.status(200).json({
      data,
    });
  });
}
