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
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.$isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};
  transition: left ${props => props.theme.transitions.medium};
  z-index: 1000;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  border-right: 2px solid ${props => props.theme.colors.border};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const SidebarTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  background: ${props => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CloseButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  border: none;
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceAlt};
    transform: scale(1.05);
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 75px;
  left: ${props => props.$sidebarOpen ? '340px' : '20px'};
  width: 48px;
  height: 48px;
  border: none;
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(46, 125, 50, 0.4);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  transition: opacity ${props => props.theme.transitions.medium};
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