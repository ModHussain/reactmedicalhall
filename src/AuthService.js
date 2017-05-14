import { browserHistory } from 'react-router';
const ID_TOKEN_KEY = 'userid';

export function logout() {
  clearIdToken();
  browserHistory.push('/');
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

// Get and store id_token in local storage
export function setIdToken(userid) {
  localStorage.setItem(ID_TOKEN_KEY, userid);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken;
}
