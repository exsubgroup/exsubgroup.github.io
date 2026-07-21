/* ══════════════════════════════════════════════
   NAVBAR.JS — Left sidebar (Exsub Group)
   Updated: Autoloads Username Session Context & Standard Avatar
   ══════════════════════════════════════════════ */
'use strict';

const NAVBAR_TEMPLATE = `
<div id="mobileTopBar">
  <button id="mobileMenuBtn" aria-label="Open menu">☰</button>
  <div class="mobile-brand">
    <img src="images/logo.svg" alt="Logo">
    <span>Exsub Group</span>
  </div>
  <div style="width:38px"></div>
</div>

<div id="sidebarOverlay"></div>

<aside id="sidebar" class="sidebar">
  <div class="sidebar-brand">
    <div class="sidebar-brand-left">
      <img src="images/logo.svg" alt="Logo">
      <span>Exsub Group</span>
    </div>
    <button id="sidebarCloseBtn" aria-label="Close menu">✕</button>
  </div>

  <div class="sidebar-user-panel">
    <div class="user-profile-trigger" onclick="toggleProfileDropdown()">
      <img id="navProfilePic" src="images/default-avatar.png" alt="Profile">
      <div class="user-info">
        <span id="navUsername" class="username">Loading...</span>
        <span class="user-status">Verified Member</span>
      </div>
      <svg class="chev-profile" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    
    <div id="profileDropdown" class="profile-dropdown">
      <a href="profile.html" class="dropdown-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Open Profile
      </a>
      <hr class="dropdown-divider">
      <button id="lnkLogout" class="dropdown-item logout-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        Logout
      </button>
    </div>
  </div>

  <nav class="sidebar-nav">
    <a id="lnkDashboard" href="analytics.html" class="sidebar-link">Dashboard</a>
    <a id="lnkGroups" href="groups.html" class="sidebar-link">Exsub Groups</a>
    
    <div>
      <button id="lnkChannelsToggle" class="sidebar-link" onclick="toggleSidebarGroup('channelsGroup', this)">
        Channels
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div id="channelsGroup" class="sidebar-submenu">
        <a href="channels.html">❍ Promotional Channel</a>
        <a href="videos.html">❍ Long Videos</a>
        <a href="shortvideos.html">❍ Short Videos</a>
        <a href="playlists.html">❍ Playlists</a>
        <a href="workingchannel.html">❍ Working Channel</a>
        <a href="#">❍ Settings</a>
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
        <a href="#">❍ Short Video Tasks</a>
        <a href="#">❍ Playlist Tasks</a>
        <a href="#">❍ Like &amp; Comment Tasks</a>
      </div>
    </div>

    <a id="AccountIssues" href="issues.html" class="sidebar-link">Account Issues</a>
    <a id="lnkHowTo" href="howtowork.html" class="sidebar-link">How To Work</a>
    <a id="lnkExtension" href="exsubextension.html" class="sidebar-link">Exsub Extension</a>
    <a id="lnkSupport" href="support.html" class="sidebar-link">Contact &amp; Support</a>
  </nav>
</aside>
`;

/* ── PROFILE DROPDOWN TOGGLE ── */
window.toggleProfileDropdown = function() {
  const dropdown = document.getElementById("profileDropdown");
  const trigger = document.querySelector(".user-profile-trigger");
  if (!dropdown) return;
  dropdown.classList.toggle("open");
  if (trigger) trigger.classList.toggle("expanded");
};

/* Close profile menu if clicking outside */
document.addEventListener("click", function(e) {
  const panel = document.querySelector(".sidebar-user-panel");
  if (panel && !panel.contains(e.target)) {
    const dropdown = document.getElementById("profileDropdown");
    const trigger = document.querySelector(".user-profile-trigger");
    if (dropdown) dropdown.classList.remove("open");
    if (trigger) trigger.classList.remove("expanded");
  }
});

/* ── ACCORDION SUBMENUS (Channels / Tasks) ── */
window.toggleSidebarGroup = function(groupId, btnEl) {
  const submenu = document.getElementById(groupId);
  if (!submenu) return;
  submenu.classList.toggle("open");
  btnEl.classList.toggle("expanded");
};

/* ── ACTIVE LINK HIGHLIGHTING ── */
function highlightActiveNavLinks() {
  const current = window.location.pathname.split("/").pop() || "analytics.html";

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

/* ── DRAWER OPEN/CLOSE (mobile) ── */
function wireSidebarDrawer() {
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("sidebarOverlay");
  const openBtn  = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  if (!sidebar || !overlay || !openBtn) return;

  function openDrawer() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  }
  function closeDrawer() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  openBtn.addEventListener("click", openDrawer);
  closeBtn && closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  sidebar.querySelectorAll("a[href]").forEach(a => {
    a.addEventListener("click", () => { if (window.innerWidth < 768) closeDrawer(); });
  });
}

/* ── DYNAMIC SESSION SYNC ── */
function syncNavbarUserSession() {
  const txtUser = document.getElementById("navUsername");
  const imgProfile = document.getElementById("navProfilePic");

  // Read current active member username from local browser storage
  const storedName = localStorage.getItem("username") || "ExUser";

  if (txtUser) {
    let cleanName = storedName.trim();
    // Constrain username to 5-6 dynamic view characters max
    if (cleanName.length > 6) {
      cleanName = cleanName.substring(0, 5) + "..";
    }
    txtUser.textContent = cleanName;
  }

  // Uses a local default avatar image asset instead of looking up remote/custom session pictures
  if (imgProfile) {
    imgProfile.src = "images/default-avatar.png";
  }
}

/* ── INITIALIZATION ── */
function initNavbar() {
  const root = document.getElementById("navbar-root");
  if (!root) {
    console.error('navbar.js: missing <div id="navbar-root"></div> context node.');
    return;
  }
  root.innerHTML = NAVBAR_TEMPLATE;
  
  wireSidebarDrawer();
  highlightActiveNavLinks();
  syncNavbarUserSession();

  // Setup dynamic clear-session routine on Logout hit
  const logoutBtn = document.getElementById("lnkLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.href = "signin.html"; 
    });
  }
}

document.addEventListener("DOMContentLoaded", initNavbar);