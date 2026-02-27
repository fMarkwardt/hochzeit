import { getRouteFromHash, getRoutePath, setActiveNav } from "./router.js";
import { loadHtml } from "./api.js";
import { saveVote, loadVote } from "./storage.js";

const appEl = document.getElementById("app");
const buildInfoEl = document.getElementById("buildInfo");

function setBuildInfo() {
  const d = new Date();
  buildInfoEl.textContent = `Lokal geöffnet am ${d.toLocaleString("de-DE")}`;
}

async function render() {
  const route = getRouteFromHash();
  setActiveNav(route);

  const path = getRoutePath(route);
  const html = await loadHtml(path);
  appEl.innerHTML = html;

  // page-specific wiring
  if (route === "polls") initPolls();
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

window.addEventListener("hashchange", render);
setBuildInfo();
render();