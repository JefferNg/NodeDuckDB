const API_URL = "http://localhost:3001/api";

const DuckDB = {
  query: async (sql) => {
    try {
      const response = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        throw new Error("Invalid SQL query");
      }

      const data = await response.json();

      if (data.ok) {
        console.log("Query Result:", data.data);
        return data.data;
      } else {
        console.error("Query Error:", data.error);
        return { error: data.error };
      }
    } catch (error) {
      console.error("Error executing query:", error);
      return { error: error.message };
    }
  },

  getTables: async () => {
    try {
      const response = await fetch(`${API_URL}/tables`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.ok) {
        console.log("Tables:", data.data);
        return data.data || [];
      } else {
        console.error("Tables Error:", data.error);
        return [];
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
      return [];
    }
  },
};

export default DuckDB;
