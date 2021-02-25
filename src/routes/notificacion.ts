import express, { Response, Request } from "express";

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.send({
    "notification": [
      {
        "id": "496417"
      }
    ]
  });
});

export = router;
