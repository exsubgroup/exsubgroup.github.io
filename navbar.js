/* ══════════════════════════════════════════════
   NAVBAR.JS — Left sidebar (Exsub Group)
   Menus & links only — no profile picture / member name / notifications.

   USAGE ON EACH PAGE:
     1. <link rel="stylesheet" href="navbar.css"> in <head>
     2. <div id="navbar-root"></div>  as the very first thing in <body>
     3. <script src="navbar.js"></script>  right after that div
     4. Give your main content wrapper class="page-content"
        (handles the left offset on desktop + top offset on mobile)
   ══════════════════════════════════════════════ */
'use strict';

const NAVBAR_TEMPLATE = `
<!-- Mobile top bar -->
<div id="mobileTopBar">
  <button id="mobileMenuBtn" aria-label="Open menu">☰</button>
  <div class="mobile-brand">
    <img src="images/logo.svg">
    <span>Exsub Group</span>
  </div>
  <div style="width:38px"></div>
</div>

<!-- Drawer backdrop (mobile only) -->
<div id="sidebarOverlay"></div>

<!-- Sidebar (desktop: static left column, mobile: slide-in drawer) -->
<aside id="sidebar" class="sidebar">
  <div class="sidebar-brand">
    <div class="sidebar-brand-left">
      <img src="images/logo.svg">
      <span>Exsub Group</span>
    </div>
    <button id="sidebarCloseBtn" aria-label="Close menu">✕</button>
  </div>

  <nav class="sidebar-nav">
    <a id="lnkDashboard" href="analytics.html" class="sidebar-link"> 
    Dashboard</a>
    <a id="lnkGroups" href="groups.html" class="sidebar-link"> Exsub Groups</a>
    <div>


      <button id="lnkChannelsToggle" class="sidebar-link" onclick="toggleSidebarGroup('channelsGroup', this)">
        Channels
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div id="channelsGroup" class="sidebar-submenu">
        <a href="channels.html?view=promotional">❍ Promotional Channel</a>
        <a href="channels.html?view=longvideos">❍ Long Videos</a>
        <a href="channels.html?view=shortvideos">❍ Short Videos</a>
        <a href="channels.html?view=playlist">❍ Playlists</a>
        <a href="channels.html?view=working">❍ Working Channel</a>
            <a href="channels.html?view=working">❍ Settings</a>
      </div>
    </div>



    <div>
      <button id="lnkTasksToggle" class="sidebar-link" onclick="toggleSidebarGroup('tasksGroup', this)">
        Tasks
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div id="tasksGroup" class="sidebar-submenu">
        <a href="subscriberstask.html">❍ Subscriber Tasks</a>
        <a href="videotask.html">❍ Long Video Tasks</a>
          <a href="videotask.html">❍ Short Video Tasks</a>
        <a href="playlisttask.html">❍ Playlist Tasks</a>
        <a href="likeandcommentstasks.html">❍ Like &amp; Comment Tasks</a>
      </div>
    </div>

    <a id="AccountIssues" href="issues.html" class="sidebar-link">Account Issues</a>
        <a id="lnkHowTo" href="howtowork.html" class="sidebar-link">How To Work</a>
    <a id="lnkExtension" href="exsubextension.html" class="sidebar-link">Exsub Extension</a>
    <a id="lnkSupport" href="support.html" class="sidebar-link"> Contact &amp; Support</a>
  </nav>
</aside>

`;

/* ── ACCORDION SUBMENUS (Channels / Tasks) ── */
function toggleSidebarGroup(groupId, btnEl){
  const submenu = document.getElementById(groupId);
  if (!submenu) return;
  submenu.classList.toggle("open");
  btnEl.classList.toggle("expanded");
}

/* ── ACTIVE LINK HIGHLIGHTING (auto, based on current filename) ── */
function highlightActiveNavLinks(){
  const current = window.location.pathname.split("/").pop() || "analytics.html";

  document.querySelectorAll("#mobileBottomNav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-page") === current);
  });

  document.querySelectorAll(".sidebar-link[href], .sidebar-submenu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.split("?")[0] === current) {
      a.classList.add("active");
      const parentGroup = a.closest(".sidebar-submenu");
      if (parentGroup) {
        parentGroup.classList.add("open");
        const toggleBtn = parentGroup.previousElementSibling;
        if (toggleBtn) toggleBtn.classList.add("expanded");
      }
    }
  });
}

/* ── BLOCKED-USER STATE ──
   Call this from a page's own script when the member's status is "blocked". */
function disableNavbarForBlockedUser(){
  ["lnkDashboard","lnkChannelsToggle","lnkGroups","lnkTasksToggle","lnkHowTo","lnkExtension"]
  .forEach(function(id){
    const el = document.getElementById(id);
    if (el){ el.classList.add("nav-disabled"); el.removeAttribute("href"); }
  });
}

/* ── DRAWER OPEN/CLOSE (mobile) ── */
function wireSidebarDrawer(){
  const sidebar     = document.getElementById("sidebar");
  const overlay     = document.getElementById("sidebarOverlay");
  const openBtn     = document.getElementById("mobileMenuBtn");
  const closeBtn    = document.getElementById("sidebarCloseBtn");
  if (!sidebar || !overlay || !openBtn) return;

  function openDrawer(){
    sidebar.classList.add("open");
    overlay.classList.add("show");
  }
  function closeDrawer(){
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  openBtn.addEventListener("click", openDrawer);
  closeBtn && closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Close drawer after tapping a real link (mobile only)
  sidebar.querySelectorAll("a[href]").forEach(a => {
    a.addEventListener("click", () => { if (window.innerWidth < 768) closeDrawer(); });
  });
}

/* ── INIT ── */
function initNavbar(){
  const root = document.getElementById("navbar-root");
  if (!root){
    console.error('navbar.js: no <div id="navbar-root"></div> found on this page.');
    return;
  }
  root.innerHTML = NAVBAR_TEMPLATE;
  wireSidebarDrawer();
  highlightActiveNavLinks();
}

document.addEventListener("DOMContentLoaded", initNavbar);
