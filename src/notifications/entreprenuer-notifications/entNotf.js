const fetchingData = async () => {
  const boxParent = document.querySelector(".allUsers");
  const rawData = await fetch("https://6856fdf021f5d3463e543678.mockapi.io/nexus/notifications");
  const response = await rawData.json();
  console.log(response);


  const allInvestors = response.filter(people => people.role === "investor");
  console.log(allInvestors);
  

  allInvestors.forEach(elem => {
    const box = document.createElement("div");
    box.classList.add("notification-box");

   box.innerHTML = `
    <nav class="top-section">
      <div class="initials">${elem.initials}</div>
      <div class="name-details">
        <h3>${elem.name}</h3>
        <p>${elem.title}</p>
      </div>
      <div class="status ${elem.status}">
        <span>${elem.status}</span>
      </div>
    </nav>

    <div class="center-part">
      <p>${elem.message}</p>
      <h5>Received on ${elem.date}</h5>
    </div>

    ${
      elem.status === "pending"
        ? `
      <div class="action-buttons">
        <button class="accept-btn">Accept</button>
        <button class="decline-btn">Decline</button>
        <button class="view-btn" onclick="profileOpener(${elem.id})">View Profile</button>
      </div>`
        : ""
        || 
         elem.status === "accepted"
        ? `
      <div class="action-buttons">
        <button class="accept-btn"><a href="../../messaging/entMsg/entMsg.html">message</a></button>
        <button class="decline-btn" onclick="profileOpener(${elem.id})">view profile</button>
      </div>`
        : ""
        ||
         elem.status === "rejected"
        ? `
      <div class="action-buttons">
        <button class="decline-btn" onclick="profileOpener(${elem.id})">view profile</button>
      </div>`
        : ""
    }
  `;
    if(elem.status === "rejected"){
       box.style.backgroundColor = "rgb(241, 124, 124)";
       box.style.borderColor = "rgb(243, 71, 124)";
      box.querySelector(".center-part").style.borderColor = "rgb(243, 71, 124)";
     
    }
    else if(elem.status === "accepted"){
 box.style.backgroundColor = "rgb(118, 215, 116)";
       box.style.borderColor = "rgb(72, 175, 31)";
      box.querySelector(".center-part").style.borderColor = "rgb(72, 175, 31)";
    }

    boxParent.appendChild(box);
     if (elem.status === "pending") {
    const acceptBtn = box.querySelector(".accept-btn");
    const declineBtn = box.querySelector(".decline-btn");

    acceptBtn.addEventListener("click", async () => {
      await updateStatus(elem.id, "accepted");
      window.location.reload(); // optional: to reflect change
    });

    declineBtn.addEventListener("click", async () => {
      await updateStatus(elem.id, "rejected");
      window.location.reload(); // optional: to reflect change
    });
  }
  });

  async function updateStatus(id, newStatus) {
  try {
    await fetch(`https://6856fdf021f5d3463e543678.mockapi.io/nexus/notifications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) {
    console.error("Error updating status:", err);
  }
}

};
 const logOutBtn = document.querySelector(".log-out");
    if (logOutBtn) {
     logOutBtn.addEventListener("click", () => {
  setTimeout(() => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
  }, 500); 
});

    } else {
      console.warn(".log-out-btn not found — that's fine on other pages");
    }
    window.profileOpener = function (id) {
      window.location.href = `../../profiles/entrepreneurProfile.html?id=${id}`;
    };

fetchingData()