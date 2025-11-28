// src/api.ts
export const API_BASE = 'http://localhost:4000/api';

export const api = {
  async register(data: any) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async login(credential: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async getLoans(userId: string, token: string) {
    const res = await fetch(`${API_BASE}/loans?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch loans');
    return res.json();
  },

  // Add more methods later if needed (e.g., getChats, uploadFile)
};