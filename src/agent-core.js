const aiProvider = require('./llm-providers/gemini-provider.js');
const fileSystemTools = require('./tools/file-system.js');
const shellTool = require('./tools/shell.js');
const mcpConnector = require('./connectors/mcp-connector.js');

// ที่เก็บเครื่องมือทั้งหมดเพื่อให้เรียกใช้ง่าย
const tools = {
  readFile: fileSystemTools.readFile,
  writeFile: fileSystemTools.writeFile,
  listFiles: fileSystemTools.listFiles,
  executeCommand: shellTool.executeCommand,
};

// ตั้งค่า listener สำหรับ mcp connector ไว้ล่วงหน้า
mcpConnector.on('message', (message) => {
  console.log('\n[Agent Core] ได้รับข้อความจาก MCP Connector:', message);
  // TODO: นำข้อความที่ได้ไปประมวลผลต่อ
});

async function handleCommand(prompt) {
  console.log(`[Agent Core] เริ่มประมวลผลคำสั่ง: "${prompt}"`);

  // 1. เรียก AI Provider เพื่อรับคำสั่ง
  console.log('[Agent Core] กำลังเรียก AI Provider เพื่อขอคำสั่ง...');
  const instruction = await aiProvider.getInstruction(prompt);
  console.log(`[Agent Core] ได้รับคำสั่งจาก AI:`, instruction);

  // 2. ประมวลผลคำสั่งที่ได้รับ
  switch (instruction.action) {
    case 'call_tool':
      const { tool, parameters } = instruction;
      if (tools[tool]) {
        console.log(`[Agent Core] กำลังรันเครื่องมือ: ${tool} ด้วยพารามิเตอร์: ${parameters.join(', ')}`);
        const toolResult = await tools[tool](...parameters).catch(error => `เกิดข้อผิดพลาดขณะรันเครื่องมือ: ${error}`);
        console.log(`[Agent Core] ผลลัพธ์จากเครื่องมือ:`, toolResult);

        // TODO: ส่งผลลัพธ์กลับไปให้ AI อีกครั้งเพื่อสรุปเป็นคำตอบสุดท้าย
        return toolResult; // ตอนนี้คืนค่าโดยตรงไปก่อน
      } else {
        const errorMsg = `Error: AI ร้องขอเครื่องมือที่ไม่รู้จัก: ${tool}`;
        console.error(`[Agent Core] ${errorMsg}`);
        return errorMsg;
      }

    case 'respond':
      return instruction.text;

    case 'mcp_test': // ส่วนนี้ยังคงไว้สำหรับการทดสอบ
      console.log('[Agent Core] เริ่มการทดสอบ MCP Connector...');
      await mcpConnector.connect();
      mcpConnector.sendMessage({ type: 'greeting', payload: 'Hello from Agent' });
      mcpConnector._simulateIncomingMessage({ from: 'server', data: 'Acknowledged' });
      return 'MCP Connector test sequence initiated.';

    default:
      return `Error: การกระทำจาก AI ไม่เป็นที่รู้จัก: ${instruction.action}`;
  }
}

module.exports = { handleCommand };
