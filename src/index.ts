import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Pool } from 'pg';
import { blogRoutes } from "./routes/blog";
import { slugRoutes } from "./routes/blogSlug";
import { config } from 'dotenv';

config({ path: '.env' });

const PORT = 8080;
const app = express();

const db = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: true
});
db.connect();



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); // incase we have post request

app.use("/api/blogs", blogRoutes(db));
app.use("/api/blogs/slug", slugRoutes(db));

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(PORT, () => {
  console.log('Listening on port 8080');
});