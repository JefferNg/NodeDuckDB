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
  runCode();
});
