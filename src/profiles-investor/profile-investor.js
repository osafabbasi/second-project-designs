// entrepreneurProfile.js

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

if (!userId) {
  console.error("❌ No ID found in URL.");
} else {
  fetch("https://6856fdf021f5d3463e543678.mockapi.io/nexus/users")
    .then(res => res.json())
    .then(data => {
      const user = data.find(u => u.id == userId);
 
      if (!user) {
        console.error("❌ User not found.");
        return;
      }
      console.log("✅ User loaded:", user);
      createUser(user);
    })
    .catch(err => {
      console.error("❌ Fetch error:", err.message);
    });
}
const namePlaceholder = document.querySelector(".name");
const bioPlaceholder = document.querySelector(".bio");
const imageOwner = document.querySelector(".image-owner");
const education = document.querySelector(".details");
const interest = document.querySelector(".interest");
const funding = document.querySelector(".funding");
const skills = document.querySelector("#skills");
const startupName = document.querySelector("#startup-name");
const startupDescription = document.querySelector("#startup-description");
const createUser = (user)=>{
  namePlaceholder.textContent = user.name;
  bioPlaceholder.textContent = user.bio;
  imageOwner.src = user.avatar;
  education.textContent = user.education;
  interest.textContent = user.investmentInterests;
  skills.textContent = user.skills;
   startupName.textContent = user.startup;
   startupDescription.textContent = user.startupDescription;
  funding.textContent = user.fundingNeed;
}
