const KEY = "wedding_poll_food";

export function saveVote(value) {
  localStorage.setItem(KEY, value);
}

export function loadVote() {
  return localStorage.getItem(KEY);
}