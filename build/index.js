"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const blog_1 = require("./routes/blog");
const blogSlug_1 = require("./routes/blogSlug");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
const PORT = 8080;
const app = (0, express_1.default)();
const db = new pg_1.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: true
});
db.connect();
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true })); // incase we have post request
app.use("/api/blogs", (0, blog_1.blogRoutes)(db));
app.use("/api/blogs/slug", (0, blogSlug_1.slugRoutes)(db));
app.get("/", (req, res) => {
    res.send("Hi there!");
});
app.listen(PORT, () => {
    console.log('Listening on port 8080');
});
