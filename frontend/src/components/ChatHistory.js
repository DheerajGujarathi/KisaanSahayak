import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiClock, FiTrash2, FiDownload, FiMessageSquare } from 'react-icons/fi';
import { chatHistoryService } from '../services/chatHistoryService';

const HistoryContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surfaceGradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.colors.cardShadow};
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const HistoryTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primaryGradient};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const SessionsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const SessionItem = styled.div`
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 2px 8px rgba(46, 125, 50, 0.15);
    transform: translateY(-1px);
  }
`;

const SessionTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const SessionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
`;

const SessionStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.xs};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
  }
  
  &.danger:hover {
    border-color: ${props => props.theme.colors.error};
    background: ${props => props.theme.colors.error}20;
    color: ${props => props.theme.colors.error};
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.surfaceAlt};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const StatItem = styled.div`
  text-align: center;
  
  .value {
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.primary};
    display: block;
  }
  
  .label {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

function ChatHistory({ onSessionSelect, onClearHistory }) {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const chatSessions = chatHistoryService.getChatSessions();
    const chatStats = chatHistoryService.getStats();
    setSessions(chatSessions);
    setStats(chatStats);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      chatHistoryService.clearHistory();
      setSessions([]);
      setStats({});
      if (onClearHistory) onClearHistory();
    }
  };

  const handleExportHistory = () => {
    const data = chatHistoryService.exportHistory();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kisaan-chat-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>
          <FiClock />
          Chat History
        </HistoryTitle>
      </HistoryHeader>

      <UserInfo>
        <FiMessageSquare />
        <span>Farming Assistant Chat Sessions</span>
      </UserInfo>

      {sessions.length > 0 ? (
        <>
          <SessionsList>
            {sessions.map((session) => (
              <SessionItem 
                key={session.id}
                onClick={() => onSessionSelect && onSessionSelect(session)}
              >
                <SessionTitle>{session.title}</SessionTitle>
                <SessionMeta>
                  <span>{formatDate(session.startTime)}</span>
                  <SessionStats>
                    <span><FiMessageSquare size={10} /> {session.messages.length}</span>
                  </SessionStats>
                </SessionMeta>
              </SessionItem>
            ))}
          </SessionsList>

          <Stats>
            <StatItem>
              <span className="value">{stats.totalMessages || 0}</span>
              <span className="label">Total Messages</span>
            </StatItem>
            <StatItem>
              <span className="value">{stats.totalSessions || 0}</span>
              <span className="label">Sessions</span>
            </StatItem>
            <StatItem>
              <span className="value">{stats.userMessages || 0}</span>
              <span className="label">Questions</span>
            </StatItem>
            <StatItem>
              <span className="value">{stats.botMessages || 0}</span>
              <span className="label">Answers</span>
            </StatItem>
          </Stats>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#757575', padding: '20px' }}>
          No chat history yet. Start a conversation!
        </div>
      )}

      <ActionButtons>
        <ActionButton onClick={handleExportHistory} disabled={sessions.length === 0}>
          <FiDownload />
          Export
        </ActionButton>
        <ActionButton 
          className="danger" 
          onClick={handleClearHistory}
          disabled={sessions.length === 0}
        >
          <FiTrash2 />
          Clear All
        </ActionButton>
      </ActionButtons>
    </HistoryContainer>
  );
}

export default ChatHistory;