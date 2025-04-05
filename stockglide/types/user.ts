export interface User {
    id: string;
    username: string;
    email: string;
    name?: string;
    profileImage?: string;
    createdAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    username: string;
    name?: string;
  }

  export interface LoginCredentials {
    email: string;
    password: string;
  }
  export interface RegisterData extends LoginCredentials {
    username: string;
    name?: string;
  }