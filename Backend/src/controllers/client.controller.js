import Client from '../models/Client';
const jwt = require('jsonwebtoken');

export async function createClient(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const body = req.body;
        if (body) {
            if (body.name && body.address) {
                const client = {
                    name: body.name,
                    address: body.address,
                    balance: 0
                }
                await Client.create(client).then(client => {
                    return res.status(200).json({
                        message: "Client created succeffully"
                    })
                }).catch(error => {
                    return res.status(500).json({
                        message: "Error, client nos created",
                    })
                })
            }
            else {
                return res.status(500).json({
                    message: "Error, client nos created"
                })
            }
        }
        else {
            return res.status(500).json({
                message: "Error, client nos created"
            })
        }
    })

};

export async function updateClient(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const body = req.body
        if (body.id && body.name && body.address && body.balance) {
            await Client.findOne({
                where:{
                    id_client:body.id
                }
            }).then(async client => {
                if(client){
                    client.name = body.name,
                    client.address = body.address,
                    client.balance = body.balance
                    await client.save().then( clientUpdated => {
                        return res.status(200).json({
                            message:"Client updated succeffully"
                        });
                    }).catch(error => {
                        return res.status(500).json({
                            message: "Error, client not updated",
                        })
                    })
                }
                else{
                    return res.status(500).json({
                        message:"Error, client not updated"
                    })
                }
            })
        } 
        else {
            return res.status(500).json({
                message: "Error, client not updated"
            })
        }
    })

};

export async function deleteClient(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const idClient = req.params.id
        if (idClient) {
            await Client.findOne({
                where: {
                    id_client: idClient
                }
            }).then(async client => {
                if (client) {
                    await client.destroy().then(data => {
                        return res.status(200).json({
                            message: "Client deleted succesffully"
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            message: "Error, Client not deleted",
                            error
                        })
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, Client not deleted"
                    })
                }
            })
        }
        else {
            return res.status(500).json({
                message: "Error, Client not deleted"
            })
        }
    })
};

export async function getAllClients(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        await Client.findAll().then(clients => {
            return res.status(200).json({
                clients
            })
        })
    })
};

export async function getOneClient(req,res){
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(500).json({
                message: "Error, invalid token"
            });
        }
        const params = req.params
        if(params){
            await Client.findOne({
                where:{
                    id_client: params.id
                }
            }).then(client => {
                if(client){
                    return res.status(200).json({
                        client
                    })
                }
                else{
                    return res.status(500).json({
                        message: "Error, Client not exist"
                    })
                }
            })
        }
        else{
            return res.status(500).json({
                message: "Error, Client not exist"
            })
        }
    })

}

export async function updateBalance(idClient,balance){
    console.log("HOLA CLIENTE")
    if (idClient && balance){
        await Client.findByPk(idClient).then( async clientToUpdate => {
            if(clientToUpdate){
                console.log("HOLA")
                clientToUpdate.balance = clientToUpdate.balance - balance
                await clientToUpdate.save({clientToUpdate}).then( data => {
                    console.log(data)
                    return Promise(data)
                }) 
            }
        })
    }
}