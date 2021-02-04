import Movement from "../models/Movement";
import Client from "../models/Client";
import Cash from "../models/Cash";
const jwt = require("jsonwebtoken");

export async function createMovement(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const body = req.body;
    if (body) {
      if (body.date && body.total && body.id_client) {
        const newMovement = {
          date: body.date,
          amount: body.total,
          id_client: body.id_client,
        };
        await Cash.findByPk(1).then((cashUpdate) => {
          if (cashUpdate) {
            cashUpdate.amount += newMovement.amount;
            cashUpdate.save().then(async (cashSave) => {
              await Movement.create(newMovement)
                .then(async (movement) => {
                  return res.status(200).json({
                    message: "Movement created succesffully",
                  });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Error, movement not created",
                  });
                });
            });
          } else {
            return res.status(500).json({
              message: "Error, movement not created",
            });
          }
        });
      } else {
        return res.status(500).json({
          message: "Error, movement not created",
        });
      }
    } else {
      return res.status(500).json({
        message: "Error, movement not created",
      });
    }
  });
}

export async function updateMovement(req, res) {}

export async function deleteMovement(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    if (params && params.id) {
      await Movement.findByPk(params.id, {
        include: [client],
      })
        .then(async (movement) => {
          if (movement) {
            movement.destroy().then((movementDeleted) => {
              if (movementDeleted) {
                return res.status(200).json({
                  message: "Movement deleted succeffully",
                });
              } else {
                return res.status(500).json({
                  message: "Error, movement not exist",
                });
              }
            });
          } else {
            return res.status(500).json({
              message: "Error, movement not exist",
            });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Error, movement not exist",
          });
        });
    } else {
      return res.status(500).json({
        message: "Error, movement not exist",
      });
    }
  });
}

export async function getOneMovement(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    const params = req.params;
    await Movement.findByPk(params.id)
      .then((movement) => {
        if (movement) {
          return res.status(200).json({
            movement,
          });
        } else {
          return res.status(500).json({
            message: "Error, movement not exist",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error, movement not exist",
        });
      });
  });
}

export async function getAllMovements(req, res) {
  jwt.verify(req.token, process.env.keyToken, async (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "Error, invalid token",
      });
    }
    await Movement.findAll({
      include: { model: Client },
      order: [["date", "DESC"]],
    }).then((movements) => {
      return res.status(200).json({
        movements,
      });
    });
  });
}
