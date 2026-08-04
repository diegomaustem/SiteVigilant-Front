export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      roleId: number;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}