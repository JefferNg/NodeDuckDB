/**
 * Main Blockly Workspace Initialization
 * Handles workspace setup and code generation
 */

import * as Blockly from "blockly";
import { blocks } from "./blocks/sql.js";
import { sqlGenerator } from "./generators/sql.js";
import { toolbox } from "./toolbox.js";
import DuckDB from "./scripts/frontend/duckdb.js";

Blockly.common.defineBlocks(blocks);

const codeDiv = document.getElementById("code");
const outputDiv = document.getElementById("output");
const tableDiv = document.getElementById("tables-list");
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: toolbox,
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: "left",
  css: true,
  media: "https://cdn.jsdelivr.net/npm/blockly/media/",
  rtl: false,
  scrollbars: true,
  sounds: true,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
});

let tablesLoaded = false;

const runCode = () => {
  const block = workspace.getTopBlocks(true)[0];
  const code = sqlGenerator.blockToCode(block);
  codeDiv.textContent = code + ";";
  outputDiv.textContent = DuckDB.query(code).then((result) => {
    outputDiv.textContent = JSON.stringify(result, null, 2);
  });
};

workspace.addChangeListener((event) => {
  if (
    event.isUiEvent ||
    event.type == Blockly.Events.FINISHED_LOADING ||
    workspace.isDragging()
  )
    return;

  if (
    event.type === Blockly.Events.BLOCK_CREATE ||
    event.type === Blockly.Events.BLOCK_MOVE
  ) {
    const block = workspace.getBlockById(event.blockId);
    if (block && block.type === "select_block") {
      populateTableDropdown();
    }
  }

  if (event.type === Blockly.Events.BLOCK_DELETE) {
    if (event.blockId) {
      const remainingSelectBlocks = workspace
        .getAllBlocks()
        .filter((b) => b.type === "select_block");
      if (remainingSelectBlocks.length === 0) {
        tablesLoaded = false;
      }
    }
  }

  runCode();
});
// Tab switching functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(tabName).classList.add("active");

    // Load tables list if switching to tables tab
    if (tabName === "tables") {
      loadTablesList();
    }
  });
});

// Function to load and display database tables
const loadTablesList = async () => {
  tableDiv.textContent = "Loading tables...";

  try {
    const tables = await DuckDB.getTables();

    if (tables && tables.length > 0) {
      tableDiv.textContent = "";
      for (const key in tables) {
        tableDiv.textContent += JSON.stringify(tables[key], null) + "\n";
      }
    } else {
      tableDiv.textContent = "No tables found in database";
    }
  } catch (error) {
    tableDiv.innerHTML = `<p style="color: red;">Error loading tables: ${error.message}</p>`;
  }
};
const populateTableDropdown = async () => {
  if (tablesLoaded) {
    return;
  }

  try {
    const tables = await DuckDB.getTables();
    const options = tables.map((table) => [table[0], table[0]]);

    workspace.getAllBlocks().forEach((block) => {
      if (block.type == "select_block") {
        const field = block.getField("FROM");
        if (field) {
          field.setOptions(options);
        }
      }
    });
    tablesLoaded = true;
  } catch (error) {
    console.error("Error populating table dropdown:", error);
  }
};
