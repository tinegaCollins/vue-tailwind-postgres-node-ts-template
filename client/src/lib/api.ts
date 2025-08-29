export type User = {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  role: 'USER' | 'ADMIN'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type UserCreate = {
  name: string
  email: string
  phone: string
  role: 'USER' | 'ADMIN'
  isActive: boolean
}

const API_BASE =
  import.meta.env.VITE_API_BASE?.trim() ||
  (import.meta.env.VITE_ENVIROMENT === 'DEV' ? 'http://localhost:3000/api' : '/api')

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const fullUrl = `${API_BASE}${url}`

  const res = await fetch(fullUrl, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }

  return (await res.json()) as T
}

export const api = {
  listUsers: (params?: {
    search?: string
    role?: string
    isActive?: string
    userId?: string
    skip?: number
    take?: number
  }) => {
    const query = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) query.append(k, String(v))
      })
    }
    const qs = query.toString()
    return request<{ data: User[]; total: number }>(`/users${qs ? `?${qs}` : ''}`)
  },
  getUser: (id: string) => request<User>(`/users/${id}`),
  createUser: (body: UserCreate) =>
    request<User>(`/users`, { method: 'POST', body: JSON.stringify(body) }),
  updateUser: (id: string, body: Partial<UserCreate> & { isActive?: boolean }) =>
    request<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteUser: (id: string) => fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' }),
  nukeDatabase: () =>
    request<{ message: string; timestamp: string; clearedTables: string[] }>(`/users/nuke`, {
      method: 'DELETE',
    }),
}
