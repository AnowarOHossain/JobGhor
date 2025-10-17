export const users = []

export function findByEmail(email) {
  return users.find(u => u.email.toLowerCase() === String(email || '').toLowerCase())
}

export function findByName(name) {
  return users.find(u => u.name.toLowerCase() === String(name || '').toLowerCase())
}

export function createUser({ id, name, email, passwordHash, role }) {
  const u = { id, name, email, passwordHash, role: role || 'user', createdAt: new Date().toISOString() }
  users.push(u)
  return u
}
