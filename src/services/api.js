const BASE_URL = "https://6856fdf021f5d3463e543678.mockapi.io/nexus/users";

// fetching all the users
const gettingUser = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json(); 
  return data;
};

// sorting and exporting all the investors
export async function fetchInvestors() {
  const users = await gettingUser();

  const investors = users.filter(user => user.role === "investor");
  return investors;
}

// sorting and exporting all the entreprenuers
export async function fetchEntrepreneurs(params) {
     const users = await gettingUser();
     const entrepreneurs = users.filter(user => user.role === "entrepreneur");
     return entrepreneurs; 
}