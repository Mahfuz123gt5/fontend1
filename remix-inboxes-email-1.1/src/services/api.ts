import { Inbox } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt?: string;
  };
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Token helper
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `API request failed with status ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.error) errorMsg = errorJson.error;
      else if (errorJson.message) errorMsg = errorJson.message;
    } catch {
      // no JSON response
    }
    throw new ApiError(errorMsg, response.status);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// Auth Endpoints
export async function registerUser(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
}

export async function loginUser(data: { email: string; password: string }): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.token) {
    setAuthToken(res.token);
  }
  return res;
}

export async function getCurrentUser(): Promise<AuthResponse['user']> {
  return request<AuthResponse['user']>('/auth/me', {
    method: 'GET',
  });
}

// Inboxes Endpoints
export async function fetchInboxes(): Promise<Inbox[]> {
  return request<Inbox[]>('/inboxes', {
    method: 'GET',
  });
}

export async function fetchInboxById(id: string): Promise<Inbox> {
  return request<Inbox>(`/inboxes/${id}`, {
    method: 'GET',
  });
}

export async function createInbox(inboxData: Partial<Inbox>): Promise<Inbox> {
  return request<Inbox>('/inboxes', {
    method: 'POST',
    body: JSON.stringify(inboxData),
  });
}

export async function updateInbox(id: string, inboxData: Partial<Inbox>): Promise<Inbox> {
  return request<Inbox>(`/inboxes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(inboxData),
  });
}

export async function toggleInboxStatusApi(id: string, status: 'running' | 'paused'): Promise<Inbox> {
  return request<Inbox>(`/inboxes/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteInboxApi(id: string): Promise<void> {
  await request<void>(`/inboxes/${id}`, {
    method: 'DELETE',
  });
}

// Email Verification Endpoints (Replit Backend Integration)
export async function verifyEmailApi(email: string) {
  try {
    return await request<any>('/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.warn('Replit backend verify-email endpoint unreachable, using client verifier engine:', err);
    const { verifySingleEmail } = await import('./emailVerifierService');
    return await verifySingleEmail(email);
  }
}

export async function verifyBulkEmailsApi(emails: string[]) {
  try {
    return await request<any>('/verify-bulk', {
      method: 'POST',
      body: JSON.stringify({ emails }),
    });
  } catch (err) {
    console.warn('Replit backend verify-bulk endpoint unreachable, using client verifier engine:', err);
    const { verifyBulkEmails } = await import('./emailVerifierService');
    return await verifyBulkEmails(emails);
  }
}
