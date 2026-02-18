import { apiFetch, tokenStore } from './client';
import { User } from '@/lib/types';
import { toUser } from './normalize';

type LoginResponse = {
  access: string;
  refresh: string;
  user: unknown;
};

export const login = async (email: string, password: string): Promise<{ access: string; refresh: string; user: User }> => {
  const data = await apiFetch<LoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  if (data.access && data.refresh) {
    tokenStore.setTokens(data.access, data.refresh);
  }

  return {
    access: data.access,
    refresh: data.refresh,
    user: toUser(data.user),
  };
};

export const registerStudent = async (email: string, username: string, password: string) => {
  return apiFetch('/api/v1/auth/register/student', {
    method: 'POST',
    body: { email, username, password },
  });
};

export const registerTeacher = async (email: string, username: string, password: string) => {
  return apiFetch('/api/v1/auth/register/teacher', {
    method: 'POST',
    body: { email, username, password },
  });
};

export const registerUser = async (role: 'student' | 'teacher' | 'parent', email: string, username: string, password: string) => {
  if (role === 'teacher') {
    return registerTeacher(email, username, password);
  }

  return registerStudent(email, username, password);
};

/**
 * Auto-register a guest user with random password
 * Returns the generated password for email notification
 */
export const autoRegisterGuest = async (email: string, phone: string): Promise<{ password: string; username: string }> => {
  // Generate random password
  const password = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10).toUpperCase() + '123!';
  
  // Use email prefix or phone as username
  const username = email.split('@')[0] + '_' + phone.slice(-4);
  
  await registerStudent(email, username, password);
  
  return { password, username };
};

export const getMyProfile = async (): Promise<User> => {
  const data = await apiFetch('/api/v1/users/me');
  return toUser(data);
};

export const updateMyProfile = async (updates: Partial<{ 
  username: string; 
  email: string; 
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}>) => {
  // Convert camelCase to snake_case for API
  const bodyData: Record<string, unknown> = {};
  if (updates.username !== undefined) bodyData.username = updates.username;
  if (updates.email !== undefined) bodyData.email = updates.email;
  if (updates.firstName !== undefined) bodyData.first_name = updates.firstName;
  if (updates.lastName !== undefined) bodyData.last_name = updates.lastName;
  if (updates.phone !== undefined) bodyData.phone = updates.phone;
  if (updates.bio !== undefined) bodyData.bio = updates.bio;

  return apiFetch('/api/v1/users/me', {
    method: 'PATCH',
    body: bodyData,
  });
};

export const updateAvatar = async (avatarUrl: string) => {
  return apiFetch('/api/v1/users/me/avatar', {
    method: 'POST',
    body: { avatar_url: avatarUrl },
  });
};

export const logout = async () => {
  try {
    await apiFetch('/api/v1/auth/logout', { method: 'POST' });
  } finally {
    tokenStore.clear();
  }
};

export const refreshToken = async (refreshToken: string): Promise<{ access: string; refresh: string }> => {
  const data = await apiFetch<{ access: string; refresh: string }>('/api/v1/auth/refresh-token', {
    method: 'POST',
    body: { refresh: refreshToken },
  });
  
  if (data.access && data.refresh) {
    tokenStore.setTokens(data.access, data.refresh);
  }
  
  return data;
};

export const verifyEmail = async (token: string) => {
  return apiFetch('/api/v1/auth/verify-email', {
    method: 'POST',
    body: { token },
  });
};

export const resendVerification = async (email: string) => {
  return apiFetch('/api/v1/auth/resend-verification', {
    method: 'POST',
    body: { email },
  });
};

export const forgotPassword = async (email: string) => {
  return apiFetch('/api/v1/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
};

export const resetPassword = async (token: string, newPassword: string) => {
  return apiFetch('/api/v1/auth/reset-password', {
    method: 'POST',
    body: { token, new_password: newPassword },
  });
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  return apiFetch('/api/v1/auth/change-password', {
    method: 'POST',
    body: { old_password: oldPassword, new_password: newPassword },
  });
};

export const registerParent = async (email: string, username: string, password: string) => {
  return apiFetch('/api/v1/auth/register/parent', {
    method: 'POST',
    body: { email, username, password },
  });
};
