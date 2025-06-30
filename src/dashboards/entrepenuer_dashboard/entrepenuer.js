
import { fetchEntrepreneurs, fetchInvestors } from '../../services/api.js';

export function fetchCurrentUser() {
  const userExporting= JSON.parse(localStorage.getItem("loggedInUser"));
  return userExporting
}


if (window.location.pathname.includes("entrepenuer.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const user = fetchCurrentUser();

    if (!user || user.role !== "entrepreneur") {
      window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
      return;
    }

    fetchInvestors().then(data => {
      createUserBox(data);
    });

    function createUserBox(data) {
      const investorsParent = document.querySelector(".investors-box-parent");
      if (!investorsParent) {
        console.error("❌ investorsParent not found");
        return;
      }
    console.log(data);
    
      data.forEach(elem => {
        const box = document.createElement("div");
        box.classList.add("investors-boxes");
        box.innerHTML = `
          <div class="box-container">
            <div class="box-left">
              <div class="user-info">
                <img src="${elem.avatar}" alt="${elem.name}" />
                <div class="adjust">
                  <h3>${elem.name}</h3>
                  <p>${elem.bio}</p>
                </div>
              </div>
            </div>
            <div class="box-right">
              <button onclick="profileOpener(${elem.id})">Details</button>
            </div>
          </div>
        `;
        investorsParent.appendChild(box);
      });
    }

    const logOutBtn = document.querySelector(".log-out-btn");
    if (logOutBtn) {
      logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
      });
    } else {
      console.warn(".log-out-btn not found — that's fine on other pages");
    }

    window.profileOpener = function (id) {
      window.location.href = `../../profiles/entrepreneurProfile.html?id=${id}`;
    };
  });
}
