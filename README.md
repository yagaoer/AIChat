# AI简历小助手 (Mock版)

一个前后端分离的Web应用，模拟AI流式对话体验，使用Server-Sent Events (SSE)实现实时通信。

## 项目概述

这是一个完整的AI简历助手应用，包含：
- **前端**: React + TypeScript + CSS
- **后端**: Node.js + Express.js
- **通信**: Server-Sent Events (SSE)
- **特性**: 流式数据传输、打字机效果、自动滚动

## 项目结构

```
ai-resume-assistant/
├── server/                 # 后端服务器
│   ├── server.js          # Express服务器主文件
│   ├── package.json       # 后端依赖配置
│   └── README.md          # 后端文档
├── client/                # 前端应用
│   ├── src/
│   │   ├── components/    # React组件
│   │   │   ├── ChatWindow.tsx      # 聊天窗口组件
│   │   │   ├── ChatWindow.css      # 聊天窗口样式
│   │   │   ├── MessageInput.tsx    # 消息输入组件
│   │   │   └── MessageInput.css    # 消息输入样式
│   │   ├── types/         # TypeScript类型定义
│   │   │   └── Message.ts # 消息接口
│   │   ├── App.tsx        # 主应用组件
│   │   ├── App.css        # 主应用样式
│   │   └── index.tsx      # 应用入口
│   └── package.json       # 前端依赖配置
└── README.md              # 项目主文档
```

## 功能特性

### 后端功能
- ✅ Express服务器搭建
- ✅ SSE流式响应API (`/api/stream-resume-advice`)
- ✅ CORS跨域支持
- ✅ 健康检查端点 (`/api/health`)
- ✅ 模拟AI简历建议文本
- ✅ 逐字符流式传输 (50ms间隔)
- ✅ 客户端断开连接处理

### 前端功能
- ✅ React + TypeScript项目结构
- ✅ 现代化聊天UI界面
- ✅ 消息状态管理 (useState)
- ✅ SSE流式数据接收 (EventSource)
- ✅ 打字机效果实现
- ✅ 自动滚动到底部
- ✅ 加载状态管理
- ✅ 错误处理机制
- ✅ 响应式设计
- ✅ 键盘快捷键支持 (Enter发送)

## 快速开始

### 1. 启动后端服务器

```bash
cd server
npm install
npm start
```

服务器将在 `http://localhost:4000` 启动

### 2. 启动前端应用

```bash
cd client
npm install
npm start
```

前端应用将在 `http://localhost:3000` 启动

## API接口

### SSE流式响应
- **端点**: `GET /api/stream-resume-advice`
- **功能**: 提供流式简历建议
- **响应格式**: Server-Sent Events
- **数据格式**: 
  ```javascript
  // 数据块
  data: {"content": "字", "type": "chunk"}
  
  // 结束信号
  data: {"content": "[DONE]", "type": "done"}
  ```

### 健康检查
- **端点**: `GET /api/health`
- **响应**: `{"status": "ok", "message": "AI简历小助手服务器运行正常"}`

## 技术实现

### SSE流式传输
- 使用EventSource建立长连接
- 每50毫秒发送一个字符
- 实现实时打字机效果
- 自动处理连接关闭

### 用户体验优化
- 自动滚动到最新消息
- 加载状态的视觉反馈
- 输入框和按钮的禁用状态
- 响应式布局适配移动端
- 优雅的动画效果

### 错误处理
- 网络连接错误处理
- SSE连接异常恢复
- 用户友好的错误提示

## 开发说明

### 环境要求
- Node.js 14+
- npm 6+

### 开发模式
后端支持热重载：
```bash
cd server
npm run dev  # 使用nodemon
```

### 自定义配置
- 修改 `server/server.js` 中的 `RESUME_ADVICE` 变量来自定义回复内容
- 调整 `setInterval` 的间隔时间来改变打字速度
- 在前端 `App.tsx` 中修改SSE连接地址

## 项目特色

1. **完整的前后端分离架构**
2. **真实的流式数据传输体验**
3. **现代化的UI设计**
4. **完善的错误处理机制**
5. **响应式移动端适配**
6. **TypeScript类型安全**

## 未来扩展

- [ ] 支持多轮对话历史
- [ ] 添加消息持久化存储
- [ ] 集成真实的AI模型API
- [ ] 支持文件上传功能
- [ ] 添加用户认证系统 