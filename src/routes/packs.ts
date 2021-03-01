import express, { Response, Request } from "express";

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.send({success: true});
});

router.put('/:id', (req: Request, res: Response) => {
      res.send({success: true, id: req.params.id});
});

router.get('/', (req: Request, res: Response) => {
    res.send({
        "packs": [
          {
            "id": 1,
            "tipo": "ON_DEMAND",
            "titulo": "Test",
            "subtitulo": "Test",
            "descripcion": "Descripción",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 1999.99,
            "diasVigencia": 30,
            "codigoMarca": "6556562"
          },
          {
            "id": 2,
            "tipo": "ON_DEMAND",
            "titulo": "Prueba sprint 5",
            "subtitulo": "Prueba sprint 5",
            "descripcion": "Prueba sprint 5",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 999.00,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 3,
            "tipo": "MENSUAL",
            "titulo": "Pruebas QA",
            "subtitulo": "testing",
            "descripcion": "tre",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 1258.00,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 4,
            "tipo": "ON_DEMAND",
            "titulo": "Pruebas QA2",
            "subtitulo": "testing",
            "descripcion": "fffe",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 125.00,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 5,
            "tipo": "ON_DEMAND",
            "titulo": "Pruebas QA3",
            "subtitulo": "testing",
            "descripcion": "fffe",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 1300.00,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 6,
            "tipo": "MENSUAL",
            "titulo": "testsss",
            "subtitulo": "sprint 6",
            "descripcion": "filex",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": 1300.00,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 7,
            "tipo": "MENSUAL",
            "titulo": "testsss",
            "subtitulo": "sprint 6",
            "descripcion": "filex",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": null,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 8,
            "tipo": "MENSUAL",
            "titulo": "testsss",
            "subtitulo": "sprint 6",
            "descripcion": "filex",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": null,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 9,
            "tipo": "MENSUAL",
            "titulo": "testsss",
            "subtitulo": "sprint 6",
            "descripcion": "filex",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": null,
            "diasVigencia": 30,
            "codigoMarca": null
          },
          {
            "id": 10,
            "tipo": "MENSUAL",
            "titulo": "testsss",
            "subtitulo": "sprint 6",
            "descripcion": "filex",
            "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
            "precio": null,
            "diasVigencia": 30,
            "codigoMarca": null
          }
        ]
      })
})

export = router;
