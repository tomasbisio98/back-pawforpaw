export function validateUser(user: any): boolean {
  if (!user) return false;

  return (
    typeof user.name === 'string' &&
    user.name.trim() !== '' &&
    typeof user.email === 'string' &&
    user.email.includes('@') &&
    typeof user.password === 'string' &&
    user.password.length >= 6 &&
    typeof user.phone === 'string'
  );
}
