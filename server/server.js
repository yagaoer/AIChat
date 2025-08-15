const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// 中间件配置
app.use(cors());
app.use(express.json());

// 定义固定的简历建议文本
const RESUME_ADVICE = "你的简历非常出色！为了冲击SP Offer，我建议你在项目经历中，更多地使用STAR法则来量化你的成果。例如，将'优化了性能'具体描述为'通过虚拟列表技术，将长列表的渲染帧率从30fps提升至60fps'，这样更具说服力。同时，建议在技能栈部分突出你的核心竞争力，比如React、TypeScript等前端技术的深度应用经验。另外，项目描述中可以加入更多的业务价值体现，例如'该优化方案为公司节省了30%的服务器成本'等量化指标。";

// SSE流式响应API端点
app.get('/api/stream-resume-advice', (req, res) => {
  console.log('收到SSE请求');
  
  // 设置SSE响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

  // 将文本按字符分割成小块
  const chunks = RESUME_ADVICE.split('');
  let currentIndex = 0;

  // 每50毫秒发送一个字符
  const intervalId = setInterval(() => {
    if (currentIndex < chunks.length) {
      const chunk = chunks[currentIndex];
      // 发送SSE格式的数据
      res.write(`data: ${JSON.stringify({ content: chunk, type: 'chunk' })}\n\n`);
      currentIndex++;
    } else {
      // 所有数据发送完毕，发送结束信号
      res.write(`data: ${JSON.stringify({ content: '[DONE]', type: 'done' })}\n\n`);
      clearInterval(intervalId);
      res.end();
      console.log('SSE流式响应完成');
    }
  }, 50);

  // 处理客户端断开连接
  req.on('close', () => {
    console.log('客户端断开连接');
    clearInterval(intervalId);
    res.end();
  });
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI简历小助手服务器运行正常' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`SSE端点: http://localhost:${PORT}/api/stream-resume-advice`);
});

module.exports = app; 