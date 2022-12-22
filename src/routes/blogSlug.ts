import { Router, Request, Response } from "express";
import { Pool } from 'pg';

const router = Router();

const slugRoutes = (db: Pool) => {
  router.get("/:slug", (req: Request, res: Response) => {
    db.query(`SELECT * FROM blogs WHERE slug = $1;`, [req.params.slug])
      .then(data =>
        res.json(data.rows)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err });
      });
  });


  return router;
};

export { slugRoutes };

