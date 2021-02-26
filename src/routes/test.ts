import express, { Request, Response } from "express";
import { PACKS } from "./nottest";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({
    page: req.query.page,
    size: req.query.size,
    transacciones: PACKS,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const FILTER = PACKS.find((pack) => {
    console.log(pack.id);
    return pack.id === req.params.id;
  });

  res.send({
    page: req.query.page,
    size: req.query.size,
    transacciones: FILTER,
    packs: [
      {
        id: 22,
        contrato: "65004",
        orden: "012",
        interlocutorComercial: "10003",
        precio: 15,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },
      {
        id: 23,
        contrato: "55104",
        orden: "548",
        interlocutorComercial: "10023",
        precio: 25.36,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },

      {
        id: 24,
        contrato: "55104",
        orden: "548",
        interlocutorComercial: "10023",
        precio: 25.36,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },

      {
        id: 23,
        contrato: "55104",
        orden: "548",
        interlocutorComercial: "10023",
        precio: 25.36,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },

      {
        id: 23,
        contrato: "55104",
        orden: "548",
        interlocutorComercial: "10023",
        precio: 25.36,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },

      {
        id: 23,
        contrato: "55104",
        orden: "548",
        interlocutorComercial: "10023",
        precio: 25.36,
        fechaCompra: "2021-02-19T20:30:10+0000",
        fechaBaja: null,
        fechaConsumido: null,
      },
    ],
  });
});

export = router;
