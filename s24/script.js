document.addEventListener("DOMContentLoaded", () => {
  const room = new URLSearchParams(window.location.search).get("room");
  if (room) {
    htmx.ajax("GET", "pages/" + room + ".html", "main");
    history.pushState({}, "", "?room=" + room);
    document.getElementById("select-nav").value = room;
  } else {
    htmx.ajax("GET", "pages/home.html", "main");
    document.getElementById("select-nav").value = "home";
  }
});

document.getElementById("logo-nav").addEventListener("click", () => {
  document.getElementById("select-nav").value = "home";
});
