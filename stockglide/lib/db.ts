export const db = {
    users: new Map<string, any>(),
    
    
    async createUser(userData: any): Promise<any> {

      const id = Math.random().toString(36).substring(2, 15);
      const user = {
        id,
        ...userData,
        createdAt: new Date().toISOString(),
      };
      this.users.set(id, user);
      return user;
    },
    
    async getUserByEmail(email: string): Promise<any | null> {
        console.log(this.users)
      for (const user of this.users.values()) {
        if (user.email === email) return user;
      }
      return null;
    },
    
    async getUserById(id: string): Promise<any | null> {
      return this.users.get(id) || null;
    },
    
    async updateUser(id: string, data: any): Promise<any> {
      const user = this.users.get(id);
      if (!user) return null;
      
      const updatedUser = { ...user, ...data };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
  };