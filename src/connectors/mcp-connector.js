const EventEmitter = require('events');

/**
 * MCPConnector จัดการการเชื่อมต่อกับระบบภายนอกผ่านโปรโตคอล MCP
 * โค้ดส่วนนี้เป็นเพียงโครงสร้างพื้นฐาน (Placeholder) ที่ต้องใส่ตรรกะของโปรโตคอลจริงต่อไป
 * ใช้ EventEmitter สำหรับจัดการ event ของข้อความที่ได้รับ
 */
class MCPConnector extends EventEmitter {
  constructor() {
    super();
    this.isConnected = false;
  }

  /**
   * จำลองการเชื่อมต่อกับระบบภายนอก
   * @returns {Promise<void>}
   */
  async connect() {
    console.log('[MCP Connector] กำลังพยายามเชื่อมต่อ...');
    // TODO: ใส่ตรรกะการเชื่อมต่อ MCP จริงที่นี่
    return new Promise(resolve => {
      setTimeout(() => {
        this.isConnected = true;
        console.log('[MCP Connector] เชื่อมต่อสำเร็จ');
        this.emit('connected'); // ส่ง event 'connected'
        resolve();
      }, 500); // จำลอง delay ของเน็ตเวิร์ค
    });
  }

  /**
   * จำลองการยกเลิกการเชื่อมต่อ
   */
  disconnect() {
    if (!this.isConnected) {
      console.log('[MCP Connector] ไม่ได้เชื่อมต่ออยู่แล้ว');
      return;
    }
    // TODO: ใส่ตรรกะการยกเลิกการเชื่อมต่อจริงที่นี่
    this.isConnected = false;
    console.log('[MCP Connector] ยกเลิกการเชื่อมต่อแล้ว');
    this.emit('disconnected'); // ส่ง event 'disconnected'
  }

  /**
   * จำลองการส่งข้อความไปยังระบบภายนอก
   * @param {any} message - ข้อความที่ต้องการส่ง
   */
  sendMessage(message) {
    if (!this.isConnected) {
      console.error('[MCP Connector] ไม่สามารถส่งข้อความได้เนื่องจากยังไม่ได้เชื่อมต่อ');
      return;
    }
    console.log(`[MCP Connector] กำลังส่งข้อความ:`, message);
    // TODO: ใส่ตรรกะการส่งข้อความจริงที่นี่
  }

  /**
   * เมธอดสำหรับจำลองการรับข้อความจากภายนอก (สำหรับทดสอบ)
   * ในการใช้งานจริง ส่วนนี้จะถูกเรียกโดย event listener ของโปรโตคอล (เช่น WebSocket.onmessage)
   * @param {any} message 
   */
  _simulateIncomingMessage(message) {
    console.log(`[MCP Connector] ได้รับข้อความดิบ:`, message);
    this.emit('message', message); // ส่ง event 'message' พร้อมข้อมูล
  }
}

// Export instance ของ connector ไปเพื่อให้มี connection เพียงอันเดียว
module.exports = new MCPConnector();
