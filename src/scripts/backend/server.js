import express from "express";
import cors from "cors";
import { DuckDBInstance } from "@duckdb/node-api";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DuckDB
let db;

const initDatabase = async () => {
  try {
    db = await DuckDBInstance.create(":memory:");
    console.log("DuckDB database initialized successfully");
    try {
      const conn = await db.connect();
      await conn.run("CALL dbgen(sf=3);");
      console.log("TPCH data generated successfully");
      conn.closeSync();
    } catch (genError) {
      console.error("Failed to generate TPCH data:", genError.message);
      process.exit(1);
    }
  } catch (error) {
    console.error("Failed to initialize database:", error.message);
    process.exit(1);
  }
};

// Routes
app.post("/api/query", async (req, res) => {
  try {
    const { sql } = req.body;

    if (!sql) {
      return res.status(400).json({ error: "SQL query is required" });
    }

    try {
      const conn = await db.connect();

      // Execute query and get results
      const result = await conn.streamAndReadUntil(sql + ";", 10);
      console.log("Query executed successfully");

      const rows = result.getRowObjectsJson();
      const columns = result.getColumnsObjectJson();

      res.json({
        ok: true,
        data: rows,
        columns: columns,
      });
    } catch (queryError) {
      console.error("Query execution error:", queryError.message);
      res.status(400).json({
        ok: false,
        error: queryError.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`DuckDB server running on http://localhost:${PORT}`);
  });
});
