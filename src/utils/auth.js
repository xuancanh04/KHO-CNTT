// Simple localStorage-based password override utilities for demo purposes

const PASSWORD_OVERRIDES_KEY = 'passwordOverrides';

export function getPasswordOverrides() {
  try {
    const raw = localStorage.getItem(PASSWORD_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export function getEffectivePasswordForUser(username, defaultPassword = '123456') {
  const overrides = getPasswordOverrides();
  return overrides[username] || defaultPassword;
}

export function setPasswordForUser(username, newPassword) {
  const overrides = getPasswordOverrides();
  overrides[username] = newPassword;
  localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(overrides));
}

export function validateCurrentPassword(username, currentPassword, defaultPassword = '123456') {
  const effective = getEffectivePasswordForUser(username, defaultPassword);
  return String(currentPassword) === String(effective);
}


