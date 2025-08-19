#!/usr/bin/env node

const { Command } = require('commander');
const { handleCommand } = require('./agent-core');

const program = new Command();

program
  .name('agent')
  .description('AI Agent สำหรับช่วยงานโค้ดดิ้งผ่าน CLI')
  .version('1.0.0');

program
  .argument('<prompt>', 'คำสั่งหลักสำหรับ AI Agent')
  .action(async (prompt) => {
    const result = await handleCommand(prompt);
    console.log("\n[Agent] ผลลัพธ์สุดท้าย:");
    console.log(result);
  });

program.parse(process.argv);
