"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const blogRoutes = (db) => {
    router.get("/:page", (req, res) => {
        const rowsToSkip = parseInt(req.params.page) * 6 - 6;
        db.query(`SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY published_at DESC OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY;`, [rowsToSkip, 6])
            .then((data) => res.json(data.rows))
            .catch((err) => {
            res.status(500).json({ error: err.message });
        });
    });
    router.get("/", (req, res) => {
        db.query(`SELECT COUNT(*) FROM blogs;`)
            .then((data) => res.json(data.rows))
            .catch((err) => {
            res.status(500).json({ error: err.message });
        });
    });
    return router;
};
exports.blogRoutes = blogRoutes;
