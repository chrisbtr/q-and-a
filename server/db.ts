import { Pool } from "pg";

export const pool = new Pool({
  user: "christopher.botros",
  host: "localhost",
  port: 5432,
  database: "qanda",
});

export default pool;
