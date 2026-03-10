/**
 * Toolbox definition for Node-Based DuckDB
 * Add and modify blocks here to customize your workspace
 */

const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Operators",
      contents: [
        {
          kind: "block",
          type: "select_block",
        },
        {
          kind: "block",
          type: "where_block",
        },
        {
          kind: "block",
          type: "and_block",
        },
      ],
    },
    {
      kind: "category",
      name: "Variables",
      contents: [
        {
          kind: "block",
          type: "column_input_block",
        },
        {
          kind: "block",
          type: "value_input_block",
        },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      contents: [
        {
          kind: "block",
          type: "conditional_block",
        },
      ],
    },
  ],
};

export { toolbox };
