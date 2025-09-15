class UserService {
  constructor() {
    this.currentUser = this.getCurrentUser();
  }

  // Get or create current user
  getCurrentUser() {
    let user = localStorage.getItem('kisaan_user');
    
    if (!user) {
      user = {
        id: 'default-user',
        name: 'Farmer',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('kisaan_user', JSON.stringify(user));
    } else {
      user = JSON.parse(user);
      // Update last active time
      user.lastActive = new Date().toISOString();
      localStorage.setItem('kisaan_user', JSON.stringify(user));
    }
    
    return user;
  }

  // Update user name
  updateUserName(newName) {
    this.currentUser.name = newName;
    localStorage.setItem('kisaan_user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  // Get user ID
  getUserId() {
    return this.currentUser.id;
  }

  // Get user name
  getUserName() {
    return this.currentUser.name;
  }
}

export const userService = new UserService();