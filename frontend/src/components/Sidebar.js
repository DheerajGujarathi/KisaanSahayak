import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSidebar, FiX, FiChevronLeft } from 'react-icons/fi';
import ChatHistory from './ChatHistory';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.$isOpen ? '0' : '-320px'};
  width: 320px;
  height: 100vh;
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.$isOpen ? '4px 0 24px rgba(15, 23, 42, 0.12)' : 'none'};
  transition: left ${props => props.theme.transitions.normal};
  z-index: 1000;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  border-right: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SidebarTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  background: ${props => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${props => props.theme.colors.surfaceAlt};
  color: ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primaryGradient};
    color: white;
    transform: rotate(90deg);
    box-shadow: ${props => props.theme.colors.hoverShadow};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 80px;
  left: ${props => props.$sidebarOpen ? '340px' : '20px'};
  width: 56px;
  height: 56px;
  border: none;
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.35);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  transition: opacity ${props => props.theme.transitions.normal};
`;

const SidebarContent = styled.div`
  padding-bottom: 80px; /* Space for toggle button */
`;

function Sidebar({ onSessionSelect, onClearHistory }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleSessionSelect = (session) => {
    if (onSessionSelect) onSessionSelect(session);
    closeSidebar(); // Close sidebar on mobile after selecting
  };

  return (
    <>
      <ToggleButton $sidebarOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <FiChevronLeft size={20} /> : <FiSidebar size={20} />}
      </ToggleButton>

      <Overlay $visible={isOpen} onClick={closeSidebar} />

      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Chat History</SidebarTitle>
          <CloseButton onClick={closeSidebar}>
            <FiX size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <ChatHistory 
            onSessionSelect={handleSessionSelect}
            onClearHistory={onClearHistory}
          />
        </SidebarContent>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;