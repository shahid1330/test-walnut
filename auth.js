function login(email, password, user) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Invalid email');
  if (!password || password.length < 8) throw new Error('Password too short');
  if (user.lockedUntil && user.lockedUntil > Date.now()) throw new Error('Account locked');
  if (user.password !== password) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;
    if (user.failedAttempts >= 3) user.lockedUntil = Date.now() + 15 * 60 * 1000;
    throw new Error('Wrong password');
  }
  user.failedAttempts = 0;
  return { token: 'session-token', redirect: '/dashboard' };
}
module.exports = { login };
