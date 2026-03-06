# NodeDuckDB

A Node.js application that combines **DuckDB** with **Google's Blockly** to make SQL learning intuitive and fun. NodeDuckDB allows new developers to build and execute SQL queries using visual blocks, eliminating the need to write raw SQL syntax.

Inspired by platforms like Scratch, this project demonstrates how visual programming can make database concepts accessible to beginners.

## Features

- **Block-Based SQL Building**: Drag-and-drop SQL query construction using Blockly
- **In-Memory Analytics**: Fast query execution with DuckDB's analytical capabilities
- **Pre-Loaded Dataset**: TPCH benchmark data (scale factor 3) for realistic querying
- **Tabbed Interface**: Switch between query output/generated code and database tables
- **Real-Time Results**: See query results and corresponding SQL code instantly
- **Table Browser**: Explore available tables in the database at a glance

## Current Capabilities

- Connect to and query an in-memory DuckDB database
- Execute SQL operations (SELECT, FROM, WHERE)
- View generated SQL code from block configurations
- Return query results in JSON format
- Browse and list all available tables
- Display first 10 rows of query results

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: DuckDB (in-memory)
- **Frontend**: HTML5, CSS3, JavaScript
- **Visual Programming**: Google Blockly
- **Data**: TPCH benchmark dataset (scale factor 3)

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd NodeDuckDB
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the backend server**

   ```bash
   npm run server
   ```

   The server will initialize DuckDB and load the TPCH dataset (this may take a moment on first run).

4. **In a new terminal, start the frontend**

   ```bash
   npm run start
   ```

   The app will open automatically once you run the command.

## How to Use

1. **Build SQL with Blocks**: Drag blocks from the Blockly toolbox to construct your query
2. **View Results**: See query output and generated SQL code in real time in the Output & Code tab
3. **Explore Tables**: Switch to the Tables tab to see available tables in the database

## Project Structure

```
NodeDuckDB/
├── src/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Frontend styling
│   ├── app.js              # Frontend logic
│   ├── blocks/
│   │   └── sql.js          # Block definitions
│   ├── generators/
│   │   └── sql.js          # Convert blocks to SQL
│   └── scripts/
│       ├── backend/
│       │   └── server.js   # Express server & DuckDB setup
│       └── frontend/
│           └── duckdb.js   # Frontend API client
├── package.json
└── README
```

## Available Scripts

- `npm run server` - Start the Express backend server on port 3001
- `npm run start` - Start a local development server for the frontend on port 8080

## Learning Resources

- [DuckDB Documentation](https://duckdb.org/docs/)
- [Blockly Developer Guide](https://developers.google.com/blockly)
- [SQL Tutorial for Beginners](https://www.w3schools.com/sql/)
