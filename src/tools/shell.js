const { exec } = require('child_process');

/**
 * รันคำสั่ง shell และคืนค่าผลลัพธ์
 * @param {string} command - คำสั่งที่ต้องการรัน
 * @returns {Promise<string>} ผลลัพธ์จาก stdout หรือข้อความ error
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error);
        reject(`Error: ${error.message}\nStderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  executeCommand,
};
