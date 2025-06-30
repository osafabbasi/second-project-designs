const user = JSON.parse(localStorage.getItem("loggedInUser"));
import { fetchEntrepreneurs, fetchInvestors } from '../../services/api.js'


if (!user || user.role !== "investor") {
  // alert("Access Denied!");
  window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
}

// fetching all the dummy data of entreprenuers
fetchEntrepreneurs()
  .then(data => {
    createUserBox(data);
  });

// below is the code to dynamically add the data
const entrepreneurParent = document.querySelector(".investors-box-parent");
// Suppose you fetched data in 'data'
const createUserBox = (data) => {
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

    entrepreneurParent.appendChild(box);
  });
};



// using the properties of user where needed
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (currentUser) {
  console.log("Currently logged in user:", currentUser);
 
 

} else {
  window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
}
// log out logic
const logOutBtn = document.querySelector(".log-out-btn");
logOutBtn.addEventListener("click",()=>{
  localStorage.removeItem("loggedInUser");
  window.location.href = "../../auth-pages/log-in_folder/log-in_page.html";
})


window.profileOpener = function(id) {
  window.location.href = `../../profiles-investor/profile-investor.html?id=${id}`;
};


