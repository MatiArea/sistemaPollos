import Sale from '../models/Sale';
const jwt = require('jsonwebtoken');

export async function createSale(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        
    })
};

export async function updateSale(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
       
    })
};

export async function deleteSale(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        
    })
};

export async function getOneSale(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
      if (error) {
        return res.status(500).json({
          message: "Error, invalid token",
        });
      }
      
    });
  }

export async function getAllSales(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        Sale.findAll().then( sales => {
            return res.status(200).json({
                sales
            })
        })
    })
};