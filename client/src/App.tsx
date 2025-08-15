import React, { useState, useCallback, useRef } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { Message } from './types/Message';
import './App.css';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSendMessage = useCallback((messageText: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: generateId(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 创建EventSource连接
    const eventSource = new EventSource('http://localhost:4000/api/stream-resume-advice');
    eventSourceRef.current = eventSource;

    // 用于存储AI消息ID
    let aiMessageId: string | null = null;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'chunk') {
          if (aiMessageId === null) {
            // 首次接收数据，创建新的AI消息
            aiMessageId = generateId();
            const aiMessage: Message = {
              id: aiMessageId,
              text: data.content,
              sender: 'ai',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
          } else {
            // 后续数据，追加到现有消息
            setMessages(prev => 
              prev.map(msg => 
                msg.id === aiMessageId 
                  ? { ...msg, text: msg.text + data.content }
                  : msg
              )
            );
          }
        } else if (data.type === 'done' || data.content === '[DONE]') {
          // 接收到结束信号
          eventSource.close();
          setIsLoading(false);
          eventSourceRef.current = null;
        }
      } catch (error) {
        console.error('解析SSE数据时出错:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE连接错误:', error);
      eventSource.close();
      setIsLoading(false);
      eventSourceRef.current = null;
      
      // 添加错误消息
      const errorMessage: Message = {
        id: generateId(),
        text: '抱歉，连接服务器时出现问题，请稍后重试。',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    };

    eventSource.onopen = () => {
      console.log('SSE连接已建立');
    };
  }, []);

  // 组件卸载时清理EventSource
  React.useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <div className="app">
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
