const routes = {
  news: "pages/news.html",
  polls: "pages/polls.html",
};

export function getRouteFromHash() {
  const hash = window.location.hash || "#/news";
  const route = hash.replace("#/", "");
  return routes[route] ? route : "news";
}

export function getRoutePath(route) {
  return routes[route];
}

export function setActiveNav(route) {
  document.querySelectorAll("[data-route]").forEach(a => {
    a.classList.toggle("active", a.dataset.route === route);
    a.setAttribute("aria-current", a.dataset.route === route ? "page" : "false");
  });
}