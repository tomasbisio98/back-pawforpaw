export function validateUserUpdate(user: any): boolean {
  if (!user || typeof user !== 'object') return false;

  const hasValidField =
    'name' in user ||
    'phone' in user ||
    'status' in user ||
    'profileImgUrl' in user;

  if (!hasValidField) return false;

  if (
    'name' in user &&
    (typeof user.name !== 'string' || user.name.trim() === '')
  ) {
    return false;
  }

  if ('phone' in user && typeof user.phone !== 'string') {
    return false;
  }

  // ✅ Aquí está el cambio importante
  if (
    'status' in user &&
    user.status !== undefined &&
    typeof user.status !== 'boolean'
  ) {
    return false;
  }

  if (
    'profileImgUrl' in user &&
    (typeof user.profileImgUrl !== 'string' || user.profileImgUrl.trim() === '')
  ) {
    return false;
  }

  return true;
}
