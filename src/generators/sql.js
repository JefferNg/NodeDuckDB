import * as Blockly from "blockly";

export const sqlGenerator = new Blockly.CodeGenerator("SQL");

const Order = {
  ATOMIC: 0,
};

sqlGenerator.forBlock["select_block"] = function (block, generator) {
  const columnsCode = generator.valueToCode(block, "COLUMNS", Order.ATOMIC);
  const fromCode = block.getFieldValue("FROM");
  const code = `SELECT ${columnsCode} FROM ${fromCode}`;
  return code;
};

sqlGenerator.forBlock["where_block"] = function (block, generator) {
  const conditional = generator.valueToCode(block, "CONDITIONAL", Order.ATOMIC);
  const code = `WHERE ${conditional}`;
  return code;
};

sqlGenerator.forBlock["column_input_block"] = function (block) {
  const value = block.getFieldValue("COLUMN");
  const code = `${value}`;
  return [code, Order.ATOMIC];
};

sqlGenerator.forBlock["value_input_block"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const code = `\'${value}\'`;
  return [code, Order.ATOMIC];
};

sqlGenerator.forBlock["and_block"] = function (block, generator) {
  const conditional = generator.valueToCode(block, "CONDITIONAL", Order.ATOMIC);
  const code = `AND ${conditional}`;
  return code;
};

sqlGenerator.forBlock["conditional_block"] = function (block, generator) {
  const leftCode = generator.valueToCode(block, "COLUMN_NAME", Order.ATOMIC);
  const op = block.getFieldValue("OPERATOR");
  const rightCode = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = `${leftCode} ${op} ${rightCode}`;
  return [code, Order.ATOMIC];
};

sqlGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    const nextCode = sqlGenerator.blockToCode(nextBlock);
    return code + "\n" + nextCode;
  }
  return code;
};
