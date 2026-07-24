/* ══════════════════════════════════════════════
   NAVBAR.JS — Left sidebar (Exsub Group)
   Updated: Autoloads Username & Profile Picture from Google Sheets
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
   <span style="padding-left:10px">Exsub Group</span>
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
      <a href="profile.html" target="_self" class="dropdown-item">
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

    <a id="lnkDashboard" href="analytics.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>
        Dashboard
      </span>
    </a>

    <a id="lnkMembers" href="members.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        Members
      </span>
    </a>

    <a id="lnkGroups" href="groups.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
        Groups
      </span>
    </a>

    <div>
      <button id="lnkChannelsToggle" class="sidebar-link" onclick="toggleSidebarGroup('channelsGroup', this)">
        <span class="link-icon-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>
          Channels
        </span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div id="channelsGroup" class="sidebar-submenu">
        <a href="channels.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
          Promotional Channel
        </a>
        <a href="videos.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>
          Long Videos
        </a>
        <a href="shortvideos.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          Short Videos
        </a>
        <a href="playlists.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          Playlists
        </a>
        <a href="workingchannel.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Working Channel
        </a>
        <a href="settings.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          Settings
        </a>
      </div>
    </div>

    <div>
      <button id="lnkTasksToggle" class="sidebar-link" onclick="toggleSidebarGroup('tasksGroup', this)">
        <span class="link-icon-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          Tasks
        </span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div id="tasksGroup" class="sidebar-submenu">
        <a href="subscriberstask.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
          Subscriber Tasks
        </a>
        <a href="videotask.html" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>
          Long Video Tasks
        </a>
        <a href="#" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          Short Video Tasks
        </a>
        <a href="#" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          Playlist Tasks
        </a>
        <a href="#" target="_self">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          Like &amp; Comment Tasks
        </a>
      </div>
    </div>

    <a id="AccountIssues" href="issues.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        Issues
      </span>
    </a>

    <a id="lnkHowTo" href="howtowork.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        How To Work
      </span>
    </a>

    <a id="lnkExtension" href="exsubextension.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        Exsub Extension
      </span>
    </a>

    <a id="lnkSupport" href="support.html" target="_self" class="sidebar-link">
      <span class="link-icon-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        Contact &amp; Support
      </span>
    </a>

  </nav>
</aside>
`;

// Google Apps Script Web App URL
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzZuCba1p86eD743gKa4eb8YnjcBspnO46OFORuDQrvElzoucxrri8mka-sdmt7-Xou/exec";

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

/* ── DYNAMIC SESSION SYNC WITH GOOGLE SHEETS ── */
async function syncNavbarUserSession() {
  const txtUser = document.getElementById("navUsername");
  const imgProfile = document.getElementById("navProfilePic");

  // Get user code from localStorage — session convention across the app
  // stores this as lowercase "usercode" (see analytics.html / channels.html /
  // members.html). Previously this read "userCode" (never set), which fell
  // through to "username" and sent the wrong value to the API — that's why
  // the ProfilePicture never loaded and the default avatar always showed.
  const userCode = (localStorage.getItem("usercode") || "").trim();
  
  console.log("User Code from localStorage:", userCode);
  
  if (!userCode) {
    console.log("No userCode found, using fallback");
    const storedName = localStorage.getItem("username") || "ExUser";
    if (txtUser) {
      let cleanName = storedName.trim();
      if (cleanName.length > 6) {
        cleanName = cleanName.substring(0, 5) + "..";
      }
      txtUser.textContent = cleanName;
    }
    if (imgProfile) {
      imgProfile.src = "images/default-avatar.png";
    }
    return;
  }

  try {
    const url = `${GAS_WEB_APP_URL}?action=getProfileContext&userCode=${encodeURIComponent(userCode)}`;
    console.log("Fetching profile from:", url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("Profile API Response:", data);

    if (data.success) {
      // Update username
      if (txtUser) {
        let cleanName = data.userName || "ExUser";
        if (cleanName.length > 6) {
          cleanName = cleanName.substring(0, 5) + "..";
        }
        txtUser.textContent = cleanName;
        console.log("Username set to:", cleanName);
      }

      // Update profile picture
      if (imgProfile) {
        const profilePic = data.profilePicture || data.rawProfilePicture;
        console.log("Profile picture URL from API:", profilePic);
        
        if (profilePic && profilePic !== "images/default-avatar.png") {
          // Set the image src
          imgProfile.src = profilePic;
          console.log("Setting profile image to:", profilePic);
          
          // Handle image loading errors — disarm after the first failure so a
          // missing/broken fallback file can't retrigger onerror in a loop
          imgProfile.onerror = function() {
            console.warn("Failed to load profile image:", this.src);
            this.onerror = null;
            this.src = "images/default-avatar.png";
          };
          
          // Image loaded successfully
          imgProfile.onload = function() {
            console.log("Profile image loaded successfully:", this.src);
          };
        } else {
          console.log("No valid profile picture found, using default");
          imgProfile.src = "images/default-avatar.png";
        }
      }
    } else {
      console.warn("Profile API returned error:", data.message || data.error);
      // Fallback to default
      if (txtUser) {
        const storedName = localStorage.getItem("username") || "ExUser";
        let cleanName = storedName.trim();
        if (cleanName.length > 6) {
          cleanName = cleanName.substring(0, 5) + "..";
        }
        txtUser.textContent = cleanName;
      }
      if (imgProfile) {
        imgProfile.src = "images/default-avatar.png";
      }
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Fallback to local data
    const storedName = localStorage.getItem("username") || "ExUser";
    if (txtUser) {
      let cleanName = storedName.trim();
      if (cleanName.length > 6) {
        cleanName = cleanName.substring(0, 5) + "..";
      }
      txtUser.textContent = cleanName;
    }
    if (imgProfile) {
      imgProfile.src = "images/default-avatar.png";
    }
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
  
  // Async load profile data
  syncNavbarUserSession();

  // Setup dynamic clear-session routine on Logout hit
  const logoutBtn = document.getElementById("lnkLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usercode");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.href = "signin.html"; 
    });
  }
}

document.addEventListener("DOMContentLoaded", initNavbar);