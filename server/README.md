# AI简历小助手 - 后端服务器

## 项目简介

这是AI简历小助手的后端服务器，使用Node.js和Express.js构建，提供Server-Sent Events (SSE)流式响应API。

## 技术栈

- Node.js
- Express.js
- CORS中间件

## 功能特性

- SSE流式响应API
- 模拟AI对话数据
- 跨域请求支持
- 健康检查端点

## 安装和运行

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 启动服务器

开发模式（推荐）：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

服务器将在 `http://localhost:5000` 启动

## API端点

### SSE流式响应
- **路径**: `GET /api/stream-resume-advice`
- **功能**: 提供流式的简历建议文本
- **响应格式**: Server-Sent Events
- **特性**: 
  - 每50毫秒发送一个字符
  - 实现打字机效果
  - 自动发送结束信号

### 健康检查
- **路径**: `GET /api/health`
- **功能**: 检查服务器运行状态
- **响应**: JSON格式的状态信息

## SSE数据格式

```javascript
// 数据块
data: {"content": "字", "type": "chunk"}

// 结束信号
data: {"content": "[DONE]", "type": "done"}
```

## 开发说明

- 服务器支持CORS，允许前端跨域请求
- 包含客户端断开连接的处理逻辑
- 使用JSON格式封装SSE数据，便于前端解析 