import { Router, Request, Response } from "express";
import { Pool } from 'pg';

const router = Router();

const blogRoutes = (db: Pool) => {
  router.get("/:page", (req: Request, res: Response) => {
    const rowsToSkip = parseInt(req.params.page) * 6 - 6;
    db.query(
      `SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY published_at DESC OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY;`,
      [rowsToSkip, 6]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req: Request, res: Response) => {
    db.query(`SELECT COUNT(*) FROM blogs;`)
      .then((data) => res.json(data.rows))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

export { blogRoutes };



