import { userService } from './userService';

class ChatHistoryService {
  constructor() {
    this.maxHistoryPerUser = 100; // Maximum messages per user
  }

  // Get storage key for current user
  getStorageKey() {
    return `kisaan_chat_${userService.getUserId()}`;
  }

  // Load chat history for current user
  loadChatHistory() {
    try {
      const history = localStorage.getItem(this.getStorageKey());
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  }

  // Save chat history for current user
  saveChatHistory(messages) {
    try {
      // Keep only the last N messages to prevent storage overflow
      const trimmedMessages = messages.slice(-this.maxHistoryPerUser);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(trimmedMessages));
      return true;
    } catch (error) {
      console.error('Error saving chat history:', error);
      return false;
    }
  }

  // Add a message to history
  addMessage(message) {
    const history = this.loadChatHistory();
    history.push({
      ...message,
      userId: userService.getUserId(),
      timestamp: message.timestamp || new Date().toISOString()
    });
    
    return this.saveChatHistory(history);
  }

  // Clear chat history for current user
  clearHistory() {
    try {
      localStorage.removeItem(this.getStorageKey());
      return true;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return false;
    }
  }

  // Get chat sessions (for organizing conversations)
  getChatSessions() {
    const messages = this.loadChatHistory();
    const sessions = [];
    let currentSession = null;
    
    messages.forEach((message, index) => {
      // Create new session if it's the first message or there's a time gap
      const previousMessage = messages[index - 1];
      const timeDiff = previousMessage ? 
        new Date(message.timestamp) - new Date(previousMessage.timestamp) : 0;
      
      // Start new session if more than 1 hour gap or first message
      if (!currentSession || timeDiff > 60 * 60 * 1000) {
        currentSession = {
          id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: this.generateSessionTitle(message),
          startTime: message.timestamp,
          messages: []
        };
        sessions.push(currentSession);
      }
      
      currentSession.messages.push(message);
      currentSession.endTime = message.timestamp;
    });
    
    return sessions.reverse(); // Most recent first
  }

  // Generate a title for a chat session based on first message
  generateSessionTitle(firstMessage) {
    if (!firstMessage.text) return 'New Chat';
    
    const text = firstMessage.text.toLowerCase();
    
    // Common farming topics
    if (text.includes('rice') || text.includes('paddy')) return '🌾 Rice Cultivation';
    if (text.includes('wheat')) return '🌾 Wheat Farming';
    if (text.includes('tomato')) return '🍅 Tomato Growing';
    if (text.includes('pest') || text.includes('disease')) return '🐛 Pest Management';
    if (text.includes('soil')) return '🌱 Soil Management';
    if (text.includes('water') || text.includes('irrigation')) return '💧 Water Management';
    if (text.includes('fertilizer') || text.includes('nutrient')) return '🧪 Fertilization';
    if (text.includes('plant') || text.includes('crop')) return '🌿 Crop Planning';
    if (text.includes('weather') || text.includes('climate')) return '🌤️ Weather Advice';
    
    // Extract first few words as title
    const words = firstMessage.text.split(' ').slice(0, 4).join(' ');
    return words.length > 20 ? words.substring(0, 20) + '...' : words;
  }

  // Get statistics
  getStats() {
    const messages = this.loadChatHistory();
    const sessions = this.getChatSessions();
    
    return {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.isUser).length,
      botMessages: messages.filter(m => !m.isUser).length,
      totalSessions: sessions.length,
      oldestMessage: messages[0]?.timestamp,
      newestMessage: messages[messages.length - 1]?.timestamp
    };
  }

  // Export chat history (for backup)
  exportHistory() {
    const data = {
      user: userService.getCurrentUser(),
      messages: this.loadChatHistory(),
      sessions: this.getChatSessions(),
      stats: this.getStats(),
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  // Import chat history (from backup)
  importHistory(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.messages && Array.isArray(data.messages)) {
        return this.saveChatHistory(data.messages);
      }
      return false;
    } catch (error) {
      console.error('Error importing chat history:', error);
      return false;
    }
  }
}

export const chatHistoryService = new ChatHistoryService();