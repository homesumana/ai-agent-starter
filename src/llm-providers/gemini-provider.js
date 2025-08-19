require('dotenv').config();
const axios = require('axios');

// TODO: คุณต้องตั้งค่า GEMINI_API_KEY ใน environment variable ของคุณ
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// คำอธิบายเครื่องมือในรูปแบบที่ Gemini API เข้าใจ
const toolDefinitions = [
  {
    name: 'readFile',
    description: 'Read the content of a file at a given path.',
    parameters: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'The path to the file.'
        }
      },
      required: ['filePath']
    }
  },
  {
    name: 'writeFile',
    description: 'Write content to a file at a given path.',
    parameters: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'The path to the file.'
        },
        content: {
          type: 'string',
          description: 'The content to write.'
        }
      },
      required: ['filePath', 'content']
    }
  },
  {
    name: 'listFiles',
    description: 'List all files and directories in a given path.',
    parameters: {
      type: 'object',
      properties: {
        dirPath: {
          type: 'string',
          description: 'The path to the directory.'
        }
      },
      required: ['dirPath']
    }
  },
  {
    name: 'executeCommand',
    description: 'Execute a shell command.',
    parameters: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: 'The shell command to execute.'
        }
      },
      required: ['command']
    }
  }
];

/**
 * เรียก Gemini API เพื่อรับคำสั่งสำหรับ Agent
 * @param {string} prompt - คำสั่งจากผู้ใช้
 * @returns {Promise<object>} คำสั่งที่ Agent เข้าใจ (เช่น tool call หรือ respond)
 */
async function getInstruction(prompt) {
  if (!API_KEY) {
    return { action: 'respond', text: 'Error: GEMINI_API_KEY is not set.' };
  }

  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ function_declarations: toolDefinitions }],
    });

    const candidate = response.data.candidates[0];
    const part = candidate.content.parts[0];

    if (part.functionCall) {
      const { name, args } = part.functionCall;
      // แปลง args ให้เป็น array ของ parameters
      const parameters = Object.values(args);
      return {
        action: 'call_tool',
        tool: name,
        parameters: parameters,
      };
    } else {
      return {
        action: 'respond',
        text: part.text,
      };
    }
  } catch (error) {
    console.error('[Gemini Provider] Error calling API:', error.response ? error.response.data : error.message);
    return { action: 'respond', text: `Error communicating with Gemini API: ${error.message}` };
  }
}

module.exports = { getInstruction };
