import { getRouteFromHash, getRoutePath, setActiveNav } from "./router.js";
import { loadHtml } from "./api.js";
import { saveVote, loadVote } from "./storage.js";
import { isAuthed, login, logout } from "./auth.js";

const appEl = document.getElementById("app");

async function renderLogin() {
  const html = await loadHtml("pages/login.html");
  appEl.innerHTML = html;

  const pwInput = document.getElementById("pw");
  const btn = document.getElementById("loginBtn");
  const err = document.getElementById("loginError");

  async function tryLogin() {
    const ok = login(pwInput.value);
    err.classList.toggle("d-none", ok);
    if (ok) await render(); // nach Login die eigentliche Seite laden
  }

  btn.addEventListener("click", tryLogin);
  pwInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryLogin();
  });

  pwInput.focus();
}

async function render() {
  // Gate
  if (!isAuthed()) {
    // Optional: Navbar "deaktiv" wirken lassen
    setActiveNav(""); 
    return renderLogin();
  }

  const route = getRouteFromHash();
  setActiveNav(route);

  const path = getRoutePath(route);
  const html = await loadHtml(path);
  appEl.innerHTML = html;

  if (route === "polls") initPolls();
  addLogoutToNavbar(); // optional
}

function initPolls() {
  const myVoteEl = document.getElementById("myVote");
  const current = loadVote();
  if (current) myVoteEl.textContent = current;

  document.querySelectorAll("[data-vote]").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.vote;
      saveVote(v);
      myVoteEl.textContent = v;
      myVoteEl.className = "badge text-bg-success";
    });
  });
}

// Optional: Logout-Link in die Navbar einhängen
function addLogoutToNavbar() {
  const nav = document.querySelector(".navbar .container");
  if (!nav) return;

  // nicht doppelt hinzufügen
  if (document.getElementById("logoutBtn")) return;

  const btn = document.createElement("button");
  btn.id = "logoutBtn";
  btn.className = "btn btn-sm btn-outline-light ms-2";
  btn.textContent = "Logout";
  btn.addEventListener("click", () => {
    logout();
    window.location.hash = "#/news";
    render();
  });

  // rechts neben den Navbar-Inhalt
  nav.appendChild(btn);
}

window.addEventListener("hashchange", render);
render();

