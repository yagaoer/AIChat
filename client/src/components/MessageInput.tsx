import React, { useState, KeyboardEvent } from 'react';
import './MessageInput.css';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="message-input-container">
      <div className="input-wrapper">
        <textarea
          className="message-textarea"
          placeholder={isLoading ? "AI正在回复中..." : "请输入您的问题，比如：如何优化我的简历？"}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          rows={1}
          style={{
            resize: 'none',
            minHeight: '44px',
            maxHeight: '120px'
          }}
        />
        <button
          className={`send-button ${isLoading ? 'loading' : ''}`}
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="input-hint">
        <span>按 Enter 发送，Shift + Enter 换行</span>
      </div>
    </div>
  );
};

export default MessageInput; 