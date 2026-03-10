import * as Blockly from "blockly";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: "select_block",
    message0: "SELECT %1 FROM %2",
    args0: [
      {
        type: "input_value",
        name: "COLUMNS",
        check: "Column",
      },
      {
        type: "field_dropdown",
        name: "FROM",
        options: [["Loading tables...", ""]],
      },
    ],
    nextStatement: null,
    colour: 225,
    tooltip: "Create a SQL SELECT statement",
    helpUrl: "",
  },
  {
    type: "where_block",
    tooltip: "Specify a WHERE condition",
    helpUrl: "",
    message0: "WHERE %1",
    args0: [
      {
        type: "input_value",
        name: "CONDITIONAL",
        check: "Conditional",
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
    message0: "Column %1",
    args0: [
      {
        type: "field_input",
        name: "COLUMN",
        text: "",
      },
    ],
    output: "Column",
    colour: 100,
  },
  {
    type: "value_input_block",
    tooltip: "Input any value",
    helpUrl: "",
    message0: "Value '%1'",
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
        check: "Column",
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
  {
    type: "conditional_block",
    tooltip: "Filter tables via conditions",
    helpUrl: "",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "COLUMN_NAME",
        check: "Column",
      },
      {
        type: "field_dropdown",
        name: "OPERATOR",
        options: [
          // ["visual", "logic"]
          ["=", "="],
          ["<", "<"],
          ["<=", "<="],
          [">", ">"],
          [">=", ">="],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
        check: "Value",
      },
    ],
    output: "Conditional",
    colour: 190,
    inputsInline: true,
  },
]);
