import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { theme } from './styles/theme';
import { chatService } from './services/chatService';
import { chatHistoryService } from './services/chatHistoryService';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  
  /* Add decorative elements */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primaryGradient};
    z-index: 100;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

function App() {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    // Check backend connection on app start
    const checkConnection = async () => {
      try {
        const status = await chatService.checkHealth();
        setConnectionStatus(status ? 'connected' : 'disconnected');
      } catch (error) {
        console.error('Failed to connect to backend:', error);
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSessionSelect = (session) => {
    setChatMessages(session.messages);
    setCurrentSessionId(session.id);
  };

  const handleClearHistory = () => {
    setChatMessages([]);
    setCurrentSessionId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Sidebar 
          onSessionSelect={handleSessionSelect}
          onClearHistory={handleClearHistory}
        />
        <MainContent>
          <Header 
            connectionStatus={connectionStatus}
          />
          <ContentArea>
            <ChatInterface 
              initialMessages={chatMessages}
              sessionId={currentSessionId}
              onMessagesChange={setChatMessages}
            />
          </ContentArea>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;