import axios from "axios";

const API_KEY = "AIzaSyAJi5yQHPomOBsdduVeKlyIdvcgToCRzog";

async function auuthenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return auuthenticate("signUp", email, password);
}

export function login(email, password) {
  return auuthenticate("signInWithPassword", email, password);
}
