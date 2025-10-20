import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiArrowRight, FiDatabase, FiCpu, FiZap } from 'react-icons/fi';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  padding: 2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  ${css`
    animation: ${fadeIn} 0.8s ease-out;
  `}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
    }
  ` : `
    background: rgba(5, 150, 105, 0.1);
    color: #059669;
    border: 2px solid rgba(5, 150, 105, 0.2);
    
    &:hover {
      background: rgba(5, 150, 105, 0.15);
      border-color: rgba(5, 150, 105, 0.3);
    }
  `}
`;

const Hero = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 5%;
  position: relative;
  z-index: 5;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  ${css`
    animation: ${fadeIn} 1s ease-out 0.2s both;
  `}
`;

const ProjectName = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.3rem;
  color: #475569;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

const Quote = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0fdf4;
  border-left: 4px solid #059669;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.1);
  
  p {
    font-size: 1.1rem;
    color: #0f172a;
    font-style: italic;
    margin: 0 0 0.5rem 0;
    line-height: 1.6;
  }
  
  cite {
    font-size: 0.9rem;
    color: #64748b;
    font-style: normal;
  }
`;

const CTAButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  margin-top: 1rem;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const HeroVisual = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  ${css`
    animation: ${fadeIn} 1s ease-out 0.4s both;
  `}
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
    transform: translateY(-2px);
  }
  
  ${props => props.$position === 1 && `
    grid-column: 1;
  `}
  
  ${props => props.$position === 2 && `
    grid-column: 2;
  `}
  
  ${props => props.$position === 3 && `
    grid-column: 3;
  `}
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 0.75rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const FeatureDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
`;

const TechStack = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const TechTitle = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TechBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Badge = styled.span`
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #475569;
`;

const farmerQuotes = [
  {
    quote: "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness.",
    author: "Thomas Jefferson"
  },
  {
    quote: "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.",
    author: "John F. Kennedy"
  },
  {
    quote: "Agriculture not only gives riches to a nation, but the only riches she can call her own.",
    author: "Samuel Johnson"
  },
  {
    quote: "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.",
    author: "Masanobu Fukuoka"
  },
  {
    quote: "To forget how to dig the earth and to tend the soil is to forget ourselves.",
    author: "Mahatma Gandhi"
  }
];

function LandingPage({ onGetStarted }) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % farmerQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Header>
        <Logo>
          <LogoIcon>🌾</LogoIcon>
          <h1>KisaanSahayak</h1>
        </Logo>
        <NavButtons>
          <Button onClick={onGetStarted} $primary>
            Get Started <FiArrowRight />
          </Button>
        </NavButtons>
      </Header>

      <Hero>
        <HeroContent>
          <HeroText>
            <ProjectName>KisaanSahayak</ProjectName>
            <Tagline>
              AI-Powered Agricultural Intelligence Platform
            </Tagline>
            <Quote>
              <p>"{farmerQuotes[currentQuote].quote}"</p>
              <cite>— {farmerQuotes[currentQuote].author}</cite>
            </Quote>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '1.5rem 0' }}>
              Empowering farmers with cutting-edge RAG technology, real-time insights, 
              and intelligent decision-making tools for sustainable agriculture.
            </p>
            <CTAButton onClick={onGetStarted} $primary>
              Launch Application <FiArrowRight />
            </CTAButton>
            
            <TechStack>
              <TechTitle>Powered By</TechTitle>
              <TechBadges>
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>Python</Badge>
                <Badge>LangChain</Badge>
                <Badge>ChromaDB</Badge>
                <Badge>Groq AI</Badge>
              </TechBadges>
            </TechStack>
          </HeroText>

          <HeroVisual>
            <FeatureCard $position={1}>
              <FeatureIcon><FiCpu /></FeatureIcon>
              <FeatureTitle>RAG Technology</FeatureTitle>
              <FeatureDesc>Advanced retrieval-augmented generation</FeatureDesc>
            </FeatureCard>
            <FeatureCard $position={2}>
              <FeatureIcon><FiDatabase /></FeatureIcon>
              <FeatureTitle>Vector Database</FeatureTitle>
              <FeatureDesc>ChromaDB for semantic search</FeatureDesc>
            </FeatureCard>
            <FeatureCard $position={3}>
              <FeatureIcon><FiZap /></FeatureIcon>
              <FeatureTitle>Real-time AI</FeatureTitle>
              <FeatureDesc>Instant intelligent responses</FeatureDesc>
            </FeatureCard>
          </HeroVisual>
        </HeroContent>
      </Hero>
    </Container>
  );
}

export default LandingPage;
