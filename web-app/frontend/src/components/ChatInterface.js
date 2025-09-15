import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend, FiUser, FiMessageCircle, FiAlertCircle } from 'react-icons/fi';
import { chatService } from '../services/chatService';
import { userService } from '../services/userService';
import { chatHistoryService } from '../services/chatHistoryService';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  overflow: hidden; /* Prevent container overflow */
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  min-height: 0; /* Ensures proper scrolling */
`;

const Message = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-start;
  opacity: ${props => props.isNew ? 0 : 1};
  animation: ${props => props.isNew ? 'fadeIn 0.3s ease-out forwards' : 'none'};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.xs};
  
  ${props => props.isUser && `
    flex-direction: row-reverse;
    align-self: flex-end;
  `}
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: ${props => props.theme.fontSizes.sm};
  position: relative;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => props.isUser ? `
    background: ${props.theme.colors.primaryGradient};
    box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
  ` : `
    background: ${props.theme.colors.accentGradient};
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4);
  `}
  
  &:hover {
    transform: scale(1.1);
    ${props => props.isUser ? `
      box-shadow: 0 6px 20px rgba(46, 125, 50, 0.5);
    ` : `
      box-shadow: 0 6px 20px rgba(0, 188, 212, 0.5);
    `}
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  min-width: 80px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.4;
  border: 2px solid;
  word-wrap: break-word;
  position: relative;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => props.isUser ? `
    background: ${props.theme.colors.primaryGradient};
    color: white;
    border-color: ${props.theme.colors.primaryLight};
    border-bottom-right-radius: ${props.theme.borderRadius.sm};
    box-shadow: 0 4px 20px rgba(46, 125, 50, 0.3);
  ` : `
    background: ${props.theme.colors.surfaceGradient};
    color: ${props.theme.colors.text};
    border-color: ${props.theme.colors.accentLight};
    border-bottom-left-radius: ${props.theme.borderRadius.sm};
    box-shadow: 0 4px 20px rgba(0, 188, 212, 0.15);
  `}
  
  &:hover {
    transform: translateY(-1px);
    ${props => props.isUser ? `
      box-shadow: 0 6px 25px rgba(46, 125, 50, 0.4);
    ` : `
      box-shadow: 0 6px 25px rgba(0, 188, 212, 0.2);
    `}
  }
`;

const FormattedMessage = styled.div`
  line-height: 1.6;
  
  h3 {
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.lg};
    margin: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.sm} 0;
    color: ${props => props.theme.colors.primary};
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h4 {
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.base};
    margin: ${props => props.theme.spacing.sm} 0 ${props => props.theme.spacing.xs} 0;
    color: ${props => props.theme.colors.textSecondary};
  }
  
  ul {
    margin: ${props => props.theme.spacing.xs} 0;
    padding-left: ${props => props.theme.spacing.lg};
    
    li {
      margin-bottom: ${props => props.theme.spacing.xs};
      line-height: 1.5;
    }
  }
  
  p {
    margin: ${props => props.theme.spacing.sm} 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
  
  .section {
    margin-bottom: ${props => props.theme.spacing.md};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MessageTime = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.isUser ? 'rgba(255,255,255,0.8)' : props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surfaceGradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => props.theme.colors.accentLight};
  margin-top: ${props => props.theme.spacing.md};
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.1);
  transition: all ${props => props.theme.transitions.fast};
  
  &:focus-within {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 6px 30px rgba(0, 188, 212, 0.2);
    transform: translateY(-1px);
  }
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  font-size: ${props => props.theme.fontSizes.base};
  font-family: inherit;
  color: ${props => props.theme.colors.text};
  resize: none;
  outline: none;
  min-height: 20px;
  max-height: 120px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.disabled ? 
    props.theme.colors.borderLight : 
    props.theme.colors.secondaryGradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(255, 143, 0, 0.3);
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.secondaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 143, 0, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  border-bottom-left-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  
  .dots {
    display: flex;
    gap: 2px;
  }
  
  .dot {
    width: 4px;
    height: 4px;
    background: ${props => props.theme.colors.textSecondary};
    border-radius: 50%;
    animation: pulse 1.4s ease-in-out infinite both;
  }
  
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.error}10;
  border: 1px solid ${props => props.theme.colors.error}30;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.surfaceGradient};
  border-radius: ${props => props.theme.borderRadius.xl};
  margin: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.colors.cardShadow};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.accentGradient};
  }
  
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    background: ${props => props.theme.colors.primaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${props => props.theme.spacing.md};
    font-weight: ${props => props.theme.fontWeights.bold};
    
    @supports not (-webkit-background-clip: text) {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.textSecondary};
  }
  
  .examples {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    max-width: 500px;
    margin: 0 auto;
  }
`;

const ExampleQuery = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: 2px solid transparent;
  background: ${props => props.theme.colors.surfaceGradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.accentGradient};
    transition: left ${props => props.theme.transitions.normal};
    z-index: -1;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
    
    &::before {
      left: 0;
    }
  }
`;

// Function to format bot responses with better readability
const formatBotResponse = (text) => {
  if (!text) return text;
  
  let formatted = text;
  
  // Convert **Section:** to headers
  formatted = formatted.replace(/\*\*([^*:]+):\*\*/g, '<h4>$1:</h4>');
  
  // Convert bold text
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Split into lines and process
  const lines = formatted.split('\n').filter(line => line.trim());
  let result = [];
  let currentList = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Handle headers
    if (trimmed.includes('<h4>')) {
      // Close any open list
      if (currentList.length > 0) {
        result.push(`<ul>${currentList.join('')}</ul>`);
        currentList = [];
      }
      result.push(`<div class="section">${trimmed}</div>`);
      return;
    }
    
    // Handle numbered items (1. 2. etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, '');
      currentList.push(`<li>${content}</li>`);
      return;
    }
    
    // Handle bullet points
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const content = trimmed.substring(1).trim();
      currentList.push(`<li>${content}</li>`);
      return;
    }
    
    // Regular paragraph
    if (trimmed) {
      // Close any open list
      if (currentList.length > 0) {
        result.push(`<ul>${currentList.join('')}</ul>`);
        currentList = [];
      }
      result.push(`<p>${trimmed}</p>`);
    }
  });
  
  // Close any remaining list
  if (currentList.length > 0) {
    result.push(`<ul>${currentList.join('')}</ul>`);
  }
  
  return result.join('');
};

function ChatInterface({ initialMessages = [], sessionId: propSessionId, onMessagesChange }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(() => propSessionId || uuidv4());
  const [currentUser] = useState(() => userService.getCurrentUser());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Update messages when initialMessages prop changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Notify parent component when messages change
  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  // Load chat history on component mount (only if no initial messages)
  useEffect(() => {
    if (initialMessages.length === 0) {
      const loadChatHistory = () => {
        try {
          const history = chatHistoryService.loadChatHistory();
          if (history.length > 0) {
            setMessages(history);
          }
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      };

      loadChatHistory();
    }
  }, [initialMessages.length]);

  // Save messages to history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      chatHistoryService.saveChatHistory(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    try {
      // Handle various date formats
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()); // Use current time as fallback
      }
      
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    } catch (error) {
      console.warn('Invalid date format:', date, error);
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()); // Use current time as fallback
    }
  };

  const sendMessage = async (messageText = inputValue.trim()) => {
    if (!messageText || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      isNew: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(messageText, sessionId, currentUser.id);
      
      const assistantMessage = {
        id: uuidv4(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        type: response.type,
        isNew: true,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const exampleQueries = [
    "What's the best time to plant tomatoes?",
    "How do I control pests in my corn crop?",
    "What fertilizer should I use for wheat?",
    "Tell me about soil preparation"
  ];

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeMessage>
            <h2>Welcome to KisaanSahayak! 🌾</h2>
            <p>I'm here to help with all your farming and agriculture questions.</p>
            <div className="examples">
              <strong>Try asking about:</strong>
              {exampleQueries.map((query, index) => (
                <ExampleQuery
                  key={index}
                  onClick={() => sendMessage(query)}
                >
                  {query}
                </ExampleQuery>
              ))}
            </div>
          </WelcomeMessage>
        ) : (
          messages.map(message => (
            <Message key={message.id} isUser={message.isUser} isNew={message.isNew}>
              <Avatar isUser={message.isUser}>
                {message.isUser ? <FiUser /> : <FiMessageCircle />}
              </Avatar>
              <div>
                <MessageBubble isUser={message.isUser}>
                  {message.isUser ? (
                    message.text
                  ) : (
                    <FormattedMessage 
                      dangerouslySetInnerHTML={{ 
                        __html: formatBotResponse(message.text) 
                      }} 
                    />
                  )}
                </MessageBubble>
                <MessageTime isUser={message.isUser}>
                  {formatTime(message.timestamp)}
                </MessageTime>
              </div>
            </Message>
          ))
        )}
        
        {isLoading && (
          <Message isUser={false}>
            <Avatar isUser={false}>
              <FiMessageCircle />
            </Avatar>
            <TypingIndicator>
              <span>AI is thinking</span>
              <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </TypingIndicator>
          </Message>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {error && (
        <ErrorMessage>
          <FiAlertCircle />
          {error}
        </ErrorMessage>
      )}

      <InputContainer>
        <MessageInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about farming..."
          disabled={isLoading}
          rows="1"
        />
        <SendButton
          onClick={() => sendMessage()}
          disabled={!inputValue.trim() || isLoading}
        >
          <FiSend size={16} />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatInterface;