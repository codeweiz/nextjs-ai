import '@testing-library/jest-dom';

// 为 Node.js 环境添加 TextDecoder 和 TextEncoder
import { TextEncoder, TextDecoder } from 'util';
global.TextDecoder = TextDecoder;
// @ts-ignore
global.TextEncoder = TextEncoder;


// 设置测试环境变量
process.env.RESEND_API_KEY = 'test-api-key';
process.env.NODE_ENV = 'test';