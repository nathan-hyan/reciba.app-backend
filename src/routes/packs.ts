import express, { Response, Request } from "express";

const router = express.Router();
const PACKS = [
  {
    "packs": [
      {
        "id": 1,
        "tipo": "ON_DEMAND",
        "titulo": "test",
        "subtitulo": "test",
        "descripcion": "test",
        "imagen": "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/05/24182655/odontologia.jpg",
        "precio": 3499.99,
        "diasVigencia": 30,
        "codigoMarca": "PACKON0001"
      },
      {
        "id": 2,
        "tipo": "ON_DEMAND",
        "titulo": "Sonrisa Perfecta",
        "subtitulo": "Blanqueamiento Dental",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu volutpat metus. Curabitur aliquet erat aliquet semper pretium. Quisque eget ante eu urna posuere ultrices luctus ut magna. Phasellus faucibus ex sit amet libero euismod luctus. Suspendisse vulputate commodo sapien nec mattis. Ut hendrerit faucibus lacus, ac malesuada lacus convallis non. Vestibulum eleifend turpis dapibus elit dapibus, vitae maximus purus mattis. Donec sed ex vel libero sodales hendrerit sed sit amet nisi. Praesent molestie elementum ultrices. Sed nec elit non nulla feugiat accumsan sed at justo. Proin sodales, eros at pharetra maximus, tellus nunc tincidunt erat, sed faucibus velit libero at nibh. Vestibulum quis est massa. In placerat nulla nulla, facilisis blandit velit maximus et. Donec rutrum dui diam, a congue nisl sodales sed. Nullam egestas enim sed purus pretium placerat. Cras quis mauris facilisis, elementum nulla a, porttitor massa.\n\nDuis hendrerit auctor magna, a vestibulum nunc semper ac. Etiam ullamcorper, velit nec pharetra sodales, est mi scelerisque nibh, sed commodo neque enim dictum justo. Aliquam lorem risus, porttitor at feugiat a, bibendum quis justo. Phasellus venenatis dui nec justo pharetra euismod. Donec congue ex ac ex dapibus lobortis quis et enim. Duis laoreet, dolor quis faucibus venenatis, turpis ante varius leo, at sagittis purus dui in odio. Praesent posuere ante eu nunc interdum sodales. Donec ac nunc tempus, mattis sapien vel, tempor nibh. Integer vitae felis in odio ultrices bibendum sed ut nunc. Proin nec ultricies quam, eu varius velit.",
        "imagen": "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/05/24182655/odontologia.jpg",
        "precio": 999.00,
        "diasVigencia": 30,
        "codigoMarca": "PACKON0002"
      },
      {
        "id": 3,
        "tipo": "ON_DEMAND",
        "titulo": "Movete sin problemas",
        "subtitulo": "Kinesiología",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu volutpat metus. Curabitur aliquet erat aliquet semper pretium. Quisque eget ante eu urna posuere ultrices luctus ut magna. Phasellus faucibus ex sit amet libero euismod luctus. Suspendisse vulputate commodo sapien nec mattis. Ut hendrerit faucibus lacus, ac malesuada lacus convallis non. Vestibulum eleifend turpis dapibus elit dapibus, vitae maximus purus mattis. Donec sed ex vel libero sodales hendrerit sed sit amet nisi. Praesent molestie elementum ultrices. Sed nec elit non nulla feugiat accumsan sed at justo. Proin sodales, eros at pharetra maximus, tellus nunc tincidunt erat, sed faucibus velit libero at nibh. Vestibulum quis est massa. In placerat nulla nulla, facilisis blandit velit maximus et. Donec rutrum dui diam, a congue nisl sodales sed. Nullam egestas enim sed purus pretium placerat. Cras quis mauris facilisis, elementum nulla a, porttitor massa.\n\nDuis hendrerit auctor magna, a vestibulum nunc semper ac. Etiam ullamcorper, velit nec pharetra sodales, est mi scelerisque nibh, sed commodo neque enim dictum justo. Aliquam lorem risus, porttitor at feugiat a, bibendum quis justo. Phasellus venenatis dui nec justo pharetra euismod. Donec congue ex ac ex dapibus lobortis quis et enim. Duis laoreet, dolor quis faucibus venenatis, turpis ante varius leo, at sagittis purus dui in odio. Praesent posuere ante eu nunc interdum sodales. Donec ac nunc tempus, mattis sapien vel, tempor nibh. Integer vitae felis in odio ultrices bibendum sed ut nunc. Proin nec ultricies quam, eu varius velit.",
        "imagen": "https://storage-prtl-co.imgix.net/endor/articles/2734/images/1568885927_shutterstock_1494043136.jpg?max-w=660&max-h=532&fit=crop&auto=format,compress&q=40",
        "precio": 1258.00,
        "diasVigencia": 30,
        "codigoMarca": "PACKON0003"
      },
      {
        "id": 4,
        "tipo": "ON_DEMAND",
        "titulo": "Pruebas QA2",
        "subtitulo": "testing",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu volutpat metus. Curabitur aliquet erat aliquet semper pretium. Quisque eget ante eu urna posuere ultrices luctus ut magna. Phasellus faucibus ex sit amet libero euismod luctus. Suspendisse vulputate commodo sapien nec mattis. Ut hendrerit faucibus lacus, ac malesuada lacus convallis non. Vestibulum eleifend turpis dapibus elit dapibus, vitae maximus purus mattis. Donec sed ex vel libero sodales hendrerit sed sit amet nisi. Praesent molestie elementum ultrices. Sed nec elit non nulla feugiat accumsan sed at justo. Proin sodales, eros at pharetra maximus, tellus nunc tincidunt erat, sed faucibus velit libero at nibh. Vestibulum quis est massa. In placerat nulla nulla, facilisis blandit velit maximus et. Donec rutrum dui diam, a congue nisl sodales sed. Nullam egestas enim sed purus pretium placerat. Cras quis mauris facilisis, elementum nulla a, porttitor massa.\n\nDuis hendrerit auctor magna, a vestibulum nunc semper ac. Etiam ullamcorper, velit nec pharetra sodales, est mi scelerisque nibh, sed commodo neque enim dictum justo. Aliquam lorem risus, porttitor at feugiat a, bibendum quis justo. Phasellus venenatis dui nec justo pharetra euismod. Donec congue ex ac ex dapibus lobortis quis et enim. Duis laoreet, dolor quis faucibus venenatis, turpis ante varius leo, at sagittis purus dui in odio. Praesent posuere ante eu nunc interdum sodales. Donec ac nunc tempus, mattis sapien vel, tempor nibh. Integer vitae felis in odio ultrices bibendum sed ut nunc. Proin nec ultricies quam, eu varius velit.",
        "imagen": "https://developers.decidir.com/static/apidoc/images/logo-decidir.png",
        "precio": 125.00,
        "diasVigencia": 30,
        "codigoMarca": "PACKON0002"
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
        "codigoMarca": "PACKON0002"
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
  }
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
        // fechaBaja: "2021-02-19T14:58:43+0000",
      },
      {
        id: 7,
        fechaDesde: "2021-02-17T14:58:43+0000",
        // fechaBaja: "2021-02-19T14:58:43+0000",
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
