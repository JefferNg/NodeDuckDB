import * as Blockly from "blockly";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: "select_block",
    message0: "SELECT %1 FROM %2",
    args0: [
      {
        type: "input_value",
        name: "COLUMNS",
        check: "Columns",
      },
      {
        type: "input_value",
        name: "FROM",
        check: "Table",
      },
    ],
    nextStatement: null,
    colour: 225,
    tooltip: "Create a SQL SELECT statement",
    helpUrl: "",
  },
  {
    type: "from_value_block",
    message0: "TABLE %1",
    args0: [
      {
        type: "field_input",
        name: "TABLE_NAME",
        text: "table_name",
      },
    ],
    output: "Table",
    colour: 45,
    tooltip: "Specify a table name",
    helpUrl: "",
  },
  {
    type: "columns_block",
    message0: "COLUMNS %1",
    args0: [
      {
        type: "field_input",
        name: "COLUMNS",
        text: "*",
      },
    ],
    output: "Columns",
    colour: 290,
    tooltip: "Specify which columns to select",
    helpUrl: "",
  },
  {
    type: "where_block",
    tooltip: "Specify a WHERE condition",
    helpUrl: "",
    message0: "WHERE %1 = %2",
    args0: [
      {
        type: "input_value",
        name: "LEFT",
        check: "Value",
      },
      {
        type: "input_value",
        name: "RIGHT",
        check: "Value",
      },
    ],
    previousStatement: null,
    nextStatement: ["and_block"],
    colour: 225,
    inputsInline: true,
  },
  {
    type: "column_input_block",
    tooltip: "Input any column name",
    helpUrl: "",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "VALUE",
        text: "",
      },
    ],
    output: "Value",
    colour: 100,
  },
  {
    type: "value_input_block",
    tooltip: "Input any value",
    helpUrl: "",
    message0: "'%1'",
    args0: [
      {
        type: "field_input",
        name: "VALUE",
        text: "",
      },
    ],
    output: "Value",
    colour: 100,
  },
  {
    type: "and_block",
    tooltip: "Add additional filtering statements",
    helpUrl: "",
    message0: "AND %1 = %2",
    args0: [
      {
        type: "input_value",
        name: "LEFT",
        check: "Value",
      },
      {
        type: "input_value",
        name: "RIGHT",
        check: "Value",
      },
    ],
    previousStatement: ["where_block", "and_block"],
    nextStatement: ["and_block"],
    colour: 225,
    inputsInline: false,
  },
]);
