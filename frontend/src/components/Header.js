import React from 'react';
import styled from 'styled-components';
import { FiWifi, FiWifiOff, FiAlertCircle, FiHome } from 'react-icons/fi';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  z-index: 10;
  position: relative;
  backdrop-filter: blur(10px);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  background: ${props => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  letter-spacing: -0.5px;
  margin: 0;
  
  /* Fallback for browsers that don't support background-clip */
  @supports not (-webkit-background-clip: text) {
    color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '🌾';
    font-size: ${props => props.theme.fontSizes['2xl']};
    filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.2));
  }
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: ${props => props.theme.colors.surfaceAlt};
  color: ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background: ${props => props.theme.colors.primaryGradient};
    color: white;
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.colors.hoverShadow};
    border-color: transparent;
  }

  svg {
    font-size: ${props => props.theme.fontSizes.base};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    span {
      display: none;
    }
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  backdrop-filter: blur(10px);
  border: 1px solid;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => {
    switch (props.$status) {
      case 'connected':
        return `
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
          color: ${props.theme.colors.success};
          border-color: rgba(16, 185, 129, 0.3);
        `;
      case 'connecting':
        return `
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
          color: ${props.theme.colors.warning};
          border-color: rgba(245, 158, 11, 0.3);
        `;
      case 'disconnected':
        return `
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
          color: ${props.theme.colors.error};
          border-color: rgba(239, 68, 68, 0.3);
        `;
      default:
        return `
          background: ${props.theme.colors.surfaceAlt};
          color: ${props.theme.colors.textSecondary};
          border-color: ${props.theme.colors.border};
        `;
    }
  }}
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.sm};
`;

function Header({ connectionStatus, onBackToHome }) {
  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <FiWifi />;
      case 'connecting':
        return <FiAlertCircle className="pulse" />;
      case 'disconnected':
        return <FiWifiOff />;
      default:
        return <FiAlertCircle />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <Title>KisaanSahayak</Title>
      </LeftSection>
      
      <StatusSection>
        <HomeButton onClick={onBackToHome} title="Back to Home">
          <FiHome />
          <span>Home</span>
        </HomeButton>
        <StatusIndicator $status={connectionStatus}>
          <StatusIcon>{getStatusIcon()}</StatusIcon>
          <span>{getStatusText()}</span>
        </StatusIndicator>
      </StatusSection>
    </HeaderContainer>
  );
}

export default Header;