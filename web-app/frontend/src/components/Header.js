import React from 'react';
import styled from 'styled-components';
import { FiMenu, FiWifi, FiWifiOff, FiAlertCircle } from 'react-icons/fi';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.surfaceGradient};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.colors.cardShadow};
  z-index: 10;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.primaryGradient};
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.theme.colors.surfaceGradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1);

  &:hover {
    background: ${props => props.theme.colors.primaryGradient};
    color: white;
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.colors.hoverShadow};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
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
  
  /* Fallback for browsers that don't support background-clip */
  @supports not (-webkit-background-clip: text) {
    color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '🌾';
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  
  ${props => {
    switch (props.$status) {
      case 'connected':
        return `
          background: ${props.theme.colors.primaryLight};
          color: ${props.theme.colors.primaryDark};
        `;
      case 'connecting':
        return `
          background: ${props.theme.colors.warning}20;
          color: ${props.theme.colors.warning};
        `;
      case 'disconnected':
        return `
          background: ${props.theme.colors.error}20;
          color: ${props.theme.colors.error};
        `;
      default:
        return `
          background: ${props.theme.colors.surfaceAlt};
          color: ${props.theme.colors.textSecondary};
        `;
    }
  }}
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.sm};
`;

function Header({ connectionStatus }) {
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
        <StatusIndicator $status={connectionStatus}>
          <StatusIcon>{getStatusIcon()}</StatusIcon>
          <span>{getStatusText()}</span>
        </StatusIndicator>
      </StatusSection>
    </HeaderContainer>
  );
}

export default Header;