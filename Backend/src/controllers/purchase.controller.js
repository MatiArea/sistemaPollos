import Purchase from '../models/Purchase';
import Product from '../models/Product'; 

export async function createPurchase(req,res){
    const purchase = {
        number:1005,
        date: new Date(),
    }

    await Product.findByPk(6).then(async(product) => {
        console.log(product)
        if (product) {
            const newPurchase = await Purchase.create(purchase)
            newPurchase.addProduct(product,{ through: { quantity:15 , price:152 } })
        }
    }).catch(error => {
        return res.status(500).json({
            message: "Error, product not exist",
            error
        })
    })


};

export async function updatePurchase(req,res){
    console.log('HOLA RESPUESTA');

};

export async function deletePurchase(req,res){
    console.log('HOLA RESPUESTA');

};

export async function getAllPurchases(req,res){
    await Purchase.findAll({
        include:[Product]
    }).then(data => {
        return res.status(200).json({
            data
        })
    })
};