import * as Blockly from "blockly";

export const sqlGenerator = new Blockly.CodeGenerator("SQL");

const Order = {
  ATOMIC: 0,
};

sqlGenerator.forBlock["select_block"] = function (block, generator) {
  const columnsCode = generator.valueToCode(block, "COLUMNS", Order.ATOMIC);
  const fromCode = generator.valueToCode(block, "FROM", Order.ATOMIC);
  const code = `SELECT ${columnsCode} FROM ${fromCode}`;
  return code;
};

sqlGenerator.forBlock["from_value_block"] = function (block) {
  const tableName = block.getFieldValue("TABLE_NAME");
  const code = `${tableName}`;
  return [code, Order.ATOMIC];
};

sqlGenerator.forBlock["columns_block"] = function (block) {
  const columns = block.getFieldValue("COLUMNS");
  const code = `${columns}`;
  return [code, Order.ATOMIC];
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
  const leftCode = generator.valueToCode(block, "LEFT", Order.ATOMIC);
  const rightCode = generator.valueToCode(block, "RIGHT", Order.ATOMIC);
  const code = `AND ${leftCode} = ${rightCode}`;
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
