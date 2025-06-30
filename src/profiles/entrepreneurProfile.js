// entrepreneurProfile.js

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
 console.log("refrere is" ,document.referrer);
 
if (!userId) {
  console.error("❌ No ID found in URL.");
      window.location.href = `../dashboards/entrepenuer_dashboard/entrepenuer.html`;

} else {

  let endpoint;

  if (document.referrer.includes("entNotf.html")) {
  endpoint = "notifications";
} else if (document.referrer.includes("entrepenuer.html")) {
  endpoint = "users";
} else {
  if(endpoint === undefined){
      window.location.href = `../../profiles/entrepenuer_dashboard/entrepenuer.html`;
  }
}


  fetch(`https://6856fdf021f5d3463e543678.mockapi.io/nexus/${endpoint}`) //this fetching is for getting users from 
    .then(res => res.json())
    .then(data => {
      const user = data.find(u => u.id == userId);
 
      if (!user) {
     
      console.log("user not found");   // this error is coming because i am accesing this page from notification page and there is no user with this id on that page
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
const skills = document.querySelector("#skills");
const createUser = (user)=>{
  namePlaceholder.textContent = user.name;
  bioPlaceholder.textContent = user.bio;
  imageOwner.src = user.avatar;
  education.textContent = user.education;
  interest.textContent = user.investmentInterests;
  skills.textContent = user.skills;

  
}

