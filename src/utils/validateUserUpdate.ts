export function validateUserUpdate(user: any): boolean {
  if (!user || typeof user !== 'object') return false;

  // Verifica si al menos uno de los campos válidos está presente
  const hasValidField = 
    'name' in user || 'phone' in user || 'status' in user;

  if (!hasValidField) return false;

  // Validaciones individuales si están presentes
  if ('name' in user && (typeof user.name !== 'string' || user.name.trim() === '')) {
    return false;
  }

  if ('phone' in user && typeof user.phone !== 'string') {
    return false;
  }

  if ('status' in user && typeof user.status !== 'boolean') {
    return false;
  }

  return true;
}