# AI Agent (MMM)

นี่คือโปรเจกต์ AI Agent ในรูปแบบ CLI ที่สร้างด้วย Node.js โดยมีเป้าหมายเพื่อช่วยเหลืองานด้านการเขียนโปรแกรม (Coding) และมีสถาปัตยกรรมที่ยืดหยุ่น สามารถปรับเปลี่ยนและขยายความสามารถได้ง่าย

## คุณสมบัติ (Features)

- **CLI Interface:** สั่งการ Agent ผ่าน Command Line
- **Tool-Using:** มีเครื่องมือสำหรับจัดการไฟล์ (อ่าน, เขียน, ลิสต์) และรันคำสั่ง Shell
- **Modular AI Provider:** ออกแบบให้สลับสับเปลี่ยนผู้ให้บริการ AI (LLM) ได้ง่าย (ตัวอย่างคือ Gemini)
- **Extensible Connectors:** มีโครงสร้างสำหรับเชื่อมต่อกับระบบภายนอก (เช่น MCP)

## สถาปัตยกรรม

```
+--------------+   +-----------------+   +----------------------+
| User (CLI)   |-->|   Agent Core    |-->|    AI Provider       |
+--------------+   | (Orchestrator)  |   | (e.g., Gemini)       |-----> (LLM API)
                   +-------+---------+   +----------------------+
                           |
         +-----------------v------------------+
         |             Toolbox                |
         | +----------------+ +-------------+ |
         | |  File System   | | Shell Tool  | |
         | +----------------+ +-------------+ |
         +------------------------------------+
                           |
                   +-------v---------+
                   |  MCP Connector  |-----> (External System)
                   +-----------------+
```

## การติดตั้งและใช้งาน

### สิ่งที่ต้องมี
- [Node.js](https://nodejs.org/) (v18 หรือสูงกว่า)
- npm

### ขั้นตอนการติดตั้ง

1.  **Clone a repository:**
    ```bash
    git clone <your-repository-url>
    cd ai-agent-mmm
    ```

2.  **ติดตั้ง Dependencies:**
    ```bash
    npm install
    ```

3.  **ตั้งค่า Environment Variables:**
    - สร้างไฟล์ชื่อ `.env` ใน root ของโปรเจกต์
    - เพิ่ม API Key ของคุณลงในไฟล์ `.env`:
      ```
      GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
      ```

### การใช้งาน

รัน Agent ผ่าน `node` โดยส่งพรอมต์เป็น argument

**ตัวอย่าง:**

- **การลิสต์ไฟล์:**
  ```bash
  node src/index.js "list all files in the src directory"
  ```

- **การอ่านไฟล์:**
  ```bash
  node src/index.js "what is in the package.json file?"
  ```

- **การรันคำสั่ง Shell:**
  ```bash
  node src/index.js "show me the node version"
  ```

## โครงสร้างโปรเจกต์

- `src/index.js`: จุดเริ่มต้นของ CLI Application
- `src/agent-core.js`: แกนหลักของ Agent ทำหน้าที่เป็นศูนย์กลางประสานงาน
- `src/tools/`: โฟลเดอร์เก็บเครื่องมือที่ Agent เรียกใช้ได้
- `src/connectors/`: โฟลเดอร์สำหรับโมดูลเชื่อมต่อระบบภายนอก
- `src/llm-providers/`: โฟลเดอร์สำหรับโมดูลเชื่อมต่อกับ LLM API เจ้าต่างๆ
- `gemini.md`: เอกสารแผนการพัฒนา
- `README.md`: เอกสารประกอบโปรเจกต์ (ไฟล์นี้)
