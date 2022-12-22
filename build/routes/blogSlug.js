"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const slugRoutes = (db) => {
    router.get("/:slug", (req, res) => {
        db.query(`SELECT * FROM blogs WHERE slug = $1;`, [req.params.slug])
            .then(data => res.json(data.rows))
            .catch(err => {
            res
                .status(500)
                .json({ error: err });
        });
    });
    return router;
};
exports.slugRoutes = slugRoutes;
