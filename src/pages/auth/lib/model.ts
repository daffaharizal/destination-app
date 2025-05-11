export interface PayloadLogin {
  identifier: string;
  password: string;
}

export interface PayloadRegister {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}
