export const theme = {
  colors: {
    // Professional Green/Emerald scheme for Agriculture
    primary: '#059669',
    primaryDark: '#047857',
    primaryLight: '#10b981',
    primaryGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    secondary: '#0891b2',
    secondaryDark: '#0e7490',
    secondaryLight: '#06b6d4',
    secondaryGradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
    accent: '#10b981',
    accentDark: '#059669',
    accentLight: '#34d399',
    accentGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    
    // Clean neutral backgrounds
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    backgroundSolid: '#ffffff',
    backgroundDark: '#0f172a',
    
    // Surface colors
    surface: '#ffffff',
    surfaceAlt: '#f8fafc',
    surfaceGradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    surfaceDark: '#1e293b',
    
    // Text colors - Professional
    text: '#0f172a',
    textSecondary: '#475569',
    textLight: '#64748b',
    textMuted: '#94a3b8',
    
    // Border colors
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    borderDark: '#cbd5e1',
    
    // Status colors - Professional
    success: '#10b981',
    successGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: '#f59e0b',
    warningGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: '#ef4444',
    errorGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    info: '#3b82f6',
    infoGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    
    // Shadows
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowMedium: 'rgba(15, 23, 42, 0.12)',
    shadowDark: 'rgba(15, 23, 42, 0.16)',
    cardShadow: '0 4px 24px rgba(15, 23, 42, 0.08)',
    hoverShadow: '0 8px 32px rgba(37, 99, 235, 0.16)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Monaco', 'Consolas', monospace",
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};