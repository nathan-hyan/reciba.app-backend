import express, { Response, Request } from "express";

const router = express.Router();
const PACKS = [
  {
    id: 1,
    tipo: "ON_DEMAND",
    titulo: "Test",
    subtitulo: "Test",
    descripcion: "lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90lorem90",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 1999.99,
    diasVigencia: 30,
    codigoMarca: "6556562",
  },
  {
    id: 2,
    tipo: "ON_DEMAND",
    titulo: "Prueba sprint 5",
    subtitulo: "Prueba sprint 5",
    descripcion: "Prueba sprint 5",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 999.0,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 3,
    tipo: "MENSUAL",
    titulo: "Pruebas QA",
    subtitulo: "testing",
    descripcion: "tre",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 1258.0,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 4,
    tipo: "ON_DEMAND",
    titulo: "Pruebas QA2",
    subtitulo: "testing",
    descripcion: "fffe",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 125.0,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 5,
    tipo: "ON_DEMAND",
    titulo: "Pruebas QA3",
    subtitulo: "testing",
    descripcion: "fffe",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 1300.0,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 6,
    tipo: "MENSUAL",
    titulo: "testsss",
    subtitulo: "sprint 6",
    descripcion: "filex",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: 1300.0,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 7,
    tipo: "MENSUAL",
    titulo: "testsss",
    subtitulo: "sprint 6",
    descripcion: "filex",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: null,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 8,
    tipo: "MENSUAL",
    titulo: "testsss",
    subtitulo: "sprint 6",
    descripcion: "filex",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: null,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 9,
    tipo: "MENSUAL",
    titulo: "testsss",
    subtitulo: "sprint 6",
    descripcion: "filex",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: null,
    diasVigencia: 30,
    codigoMarca: null,
  },
  {
    id: 10,
    tipo: "MENSUAL",
    titulo: "testsss",
    subtitulo: "sprint 6",
    descripcion: "filex",
    imagen:
      "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
    precio: null,
    diasVigencia: 30,
    codigoMarca: null,
  },
];

router.post("/", (req: Request, res: Response) => {
  res.send({ success: true });
});

router.put("/:id", (req: Request, res: Response) => {
  res.send({ success: true, id: req.params.id });
});

router.get("/", (req: Request, res: Response) => {
  res.send({
    packs: PACKS,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const FILTER = PACKS.find((pack) => {
    console.log(pack.id);
    return pack.id === parseInt(req.params.id);
  });

  res.send({
    vigencias: [
      {
        id: 1,
        fechaDesde: "2021-02-17T14:58:43+0000",
        fechaBaja: "2021-02-19T14:58:43+0000",
      },
      {
        id: 7,
        fechaDesde: "2021-02-17T14:58:43+0000",
        fechaBaja: "2021-02-19T14:58:43+0000",
      },
    ],
    precios: [
      {
        id: 1,
        precio: 1999.99,
        fechaDesde: "2021-03-04T14:58:32+0000",
        fechaBaja: "2021-02-18T14:58:32+0000",
      },
      {
        id: 7,
        precio: 2999.99,
        fechaDesde: "2021-02-26T00:00:00+0000",
        fechaBaja: "2021-02-19T14:58:43+0000",
      },
      {
        id: 8,
        precio: 1999.99,
        fechaDesde: "2021-02-17T14:58:32+0000",
        fechaBaja: null,
      },
    ],
    pack: FILTER,
  });
});

export = router;
