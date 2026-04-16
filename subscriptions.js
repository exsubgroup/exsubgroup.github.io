document.addEventListener("DOMContentLoaded", () => {
  // Show saved handle
  chrome.storage.local.get(["channelHandle"], (res) => {
    document.getElementById("savedHandle").innerText = res.channelHandle || "❌ No handle saved";
  });

  // Attach click handler
  document.getElementById("updateBtn").addEventListener("click", async () => {
    const status = document.getElementById("statusText");
    const list = document.getElementById("subList");

    status.innerText = "Opening subscriptions page...";

    // Open YouTube subscriptions page
    let tab = await chrome.tabs.create({ url: "https://www.youtube.com/feed/channels", active: true });

    // Wait for page load
    setTimeout(() => {
      status.innerText = "Fetching subscriptions...";

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapeSubscriptions
      }, (results) => {
        if (!results || !results[0]) {
          status.innerText = "Failed to fetch";
          return;
        }

        let data = results[0].result;
        if (!data || data.length === 0) {
          status.innerText = "No subscriptions found";
          return;
        }

        status.innerText = "Uploading...";
       
        renderList(data, list);
         sendToSheet(data, status);
      });
    }, 4000); // wait 4s for page load
   
  });
});

// Scraper runs inside YouTube
function scrapeSubscriptions() {
  return new Promise(resolve => {
    let collected = [];
    let seen = new Set();

    let timer = setInterval(() => {
      window.scrollBy(0, 800);

      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        clearInterval(timer);

        document.querySelectorAll("ytd-channel-renderer").forEach(el => {
          let link = el.querySelector("a#main-link")?.href || "";

          let handle = "";

          if (link.includes("@")) {
            handle = link.split("youtube.com/")[1].trim(); // "@handle"
          }

          // ✅ ONLY HANDLE
          if (handle && !seen.has(handle)) {
            seen.add(handle);
            collected.push(handle);
          }
        });

        resolve(collected);
      }
    }, 700);
  });
}

// Send to Google Sheet
function sendToSheet(data, status) {
  chrome.storage.local.get(["channelHandle", "userCode"], (res) => {

    const handle = res.channelHandle?.trim();
    const userCode = res.userCode?.trim();

    if (!handle) {
      status.innerText = "❌ No channel handle saved!";
      return;
    }

    if (!userCode) {
      status.innerText = "❌ No user code saved!";
      return;
    }

    fetch("https://script.google.com/macros/s/AKfycbwtukG0RXZmT8V53F-nWhSwgpAV2IzWlzUnD-x6zWVRaCjS14f2L6hOM3mBDUkQysed/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handle: handle,
        userCode: userCode,   // ✅ NEW FIELD
        subscriptions: data
      })
    })
    .then(res => res.json())
    .then(() => {
      status.innerText = "✅ Handles uploaded";
    })
    .catch(() => {
      status.innerText = "❌ Upload failed";
    });
  });
}

// Show list on page
function renderList(data, list) {
  list.innerHTML = "";

  data.forEach(item => {
    let div = document.createElement("div");
    div.className = "item";
    div.innerText = item;
    list.appendChild(div);
  });
}
