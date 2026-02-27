const SESSION_KEY = "wedding_authed";

/**
 * ⚠️ Unsicher: Passwort liegt im JS.
 * Für "Hürde" ok, nicht für echte Sicherheit.
 */
const PASSWORD = "wha200626!";

export function isAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function login(pw) {
  const ok = pw === PASSWORD;
  if (ok) sessionStorage.setItem(SESSION_KEY, "true");
  return ok;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}