const fs = require('fs').promises;
const path = require('path');

/**
 * อ่านเนื้อหาของไฟล์แบบ asynchronous
 * @param {string} filePath - path ไปยังไฟล์ที่ต้องการอ่าน
 * @returns {Promise<string>} เนื้อหาของไฟล์ หรือ ข้อความ error
 */
async function readFile(filePath) {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(process.cwd())) {
      return `Error: Access denied. Path is outside the project directory.`;
    }
    const content = await fs.readFile(resolvedPath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return `Error: Could not read file at ${filePath}. ${error.message}`;
  }
}

/**
 * เขียนเนื้อหาลงในไฟล์แบบ asynchronous
 * @param {string} filePath - path ไปยังไฟล์ที่ต้องการเขียน
 * @param {string} content - เนื้อหาที่ต้องการเขียน
 * @returns {Promise<string>} ข้อความยืนยัน หรือ ข้อความ error
 */
async function writeFile(filePath, content) {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(process.cwd())) {
      return `Error: Access denied. Path is outside the project directory.`;
    }
    // สร้าง directory ถ้ายังไม่มี
    await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
    await fs.writeFile(resolvedPath, content, 'utf8');
    return `Successfully wrote to ${filePath}`;
  } catch (error) {
    console.error(`Error writing file at ${filePath}:`, error);
    return `Error: Could not write file at ${filePath}. ${error.message}`;
  }
}

/**
 * แสดงรายการไฟล์และโฟลเดอร์ใน directory
 * @param {string} dirPath - path ไปยัง directory ที่ต้องการ
 * @returns {Promise<string[]|string>} รายการไฟล์ หรือ ข้อความ error
 */
async function listFiles(dirPath) {
  try {
    const resolvedPath = path.resolve(dirPath);
    if (!resolvedPath.startsWith(process.cwd())) {
      return `Error: Access denied. Path is outside the project directory.`;
    }
    const files = await fs.readdir(resolvedPath);
    return files;
  } catch (error) {
    console.error(`Error listing files in ${dirPath}:`, error);
    return `Error: Could not list files in ${dirPath}. ${error.message}`;
  }
}

module.exports = {
  readFile,
  writeFile,
  listFiles,
};
