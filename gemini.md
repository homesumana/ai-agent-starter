# แผนการสร้าง AI Agent สำหรับ Coding ด้วย Node.js (ฉบับสมบูรณ์)

## แนวคิดหลัก (Core Concept)

สร้างแอปพลิเคชัน Node.js แบบ Command-Line (CLI) ที่เป็นแกนกลาง (Core) ของ Agent โดย Agent จะรับคำสั่งจากผู้ใช้, ประมวลผลผ่าน AI Provider ที่สามารถสับเปลี่ยนได้, และใช้เครื่องมือ (Tools) ต่างๆ เพื่อทำงานด้านโค้ดดิ้งโดยตรงบนไฟล์ของผู้ใช้ พร้อมสถาปัตยกรรมที่ยืดหยุ่นสำหรับเชื่อมต่อกับภายนอกผ่านโปรโตคอลอย่าง MCP

---

## แผนการดำเนินงาน (Action Plan)

### ขั้นตอนที่ 1: ตั้งค่าโปรเจกต์และเครื่องมือพื้นฐาน
- **Initialize Node.js Project:** `npm init -y`
- **Install Dependencies:** `commander`, `axios`, `glob`

### ขั้นตอนที่ 2: สร้างส่วนติดต่อผู้ใช้ (CLI Interface)
- ใช้ `commander` ใน `src/index.js` เพื่อรับ input จากผู้ใช้และส่งต่อไปยัง Agent Core

### ขั้นตอนที่ 3: พัฒนาแกนหลักของ Agent (Agent Core)
- ใน `src/agent-core.js` ทำหน้าที่เป็นศูนย์กลาง (Orchestrator)
- รับพรอมต์จาก CLI
- เรียกใช้ AI Provider เพื่อขอคำสั่ง (Instruction)
- เรียกใช้ Tools หรือ Connectors ตามคำสั่งที่ได้รับจาก AI

### ขั้นตอนที่ 4: สร้างเครื่องมือสำหรับการ Coding (Coding Tools)
- **`tools/file-system.js`**: สร้างฟังก์ชัน `readFile`, `writeFile`, `listFiles`
- **`tools/shell.js`**: สร้างฟังก์ชัน `executeCommand`

### ขั้นตอนที่ 5: ออกแบบส่วนเชื่อมต่อภายนอก (MCP Connector)
- สร้าง Interface ที่ชัดเจนใน `src/connectors/mcp-connector.js` (`connect`, `sendMessage`, etc.)
- แยกตรรกะของโปรโตคอลออกจาก Agent Core

### ขั้นตอนที่ 6: พัฒนาส่วนเชื่อมต่อ AI (AI Provider)
- สร้างสถาปัตยกรรมที่สับเปลี่ยนได้ใน `src/llm-providers/`
- **`gemini-provider.js`**: เป็นตัวอย่างการเชื่อมต่อกับ Gemini API โดยเฉพาะ
- ทำให้ Agent Core ไม่ขึ้นตรงกับ AI เจ้าใดเจ้าหนึ่ง

---

## ภาพรวมสถาปัตยกรรมสุดท้าย

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

## วิธีการใช้งาน

1.  **ติดตั้ง Dependencies:** `npm install`
2.  **ตั้งค่า API Key:** สร้างไฟล์ `.env` แล้วเพิ่ม `GEMINI_API_KEY="YOUR_API_KEY"`
3.  **รัน Agent:** `node src/index.js "your prompt here"`
