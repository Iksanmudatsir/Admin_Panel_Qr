const storeAuth = (auth) => {
  localStorage.auth = JSON.stringify(auth);
}

const removeAuth = () => {
  delete localStorage.auth;
}

const getToken = () => {
  const storedAuth = localStorage.auth ? JSON.parse(localStorage.auth) : null
  return storedAuth?.token
}

const getUser = () => {
  const storeAuth = localStorage.auth ? JSON.parse(localStorage.auth) : null
  return storeAuth?.user
}

const verifyAuth = () => {
  const token = getToken();
  return token ? true : false;
}

export { storeAuth, removeAuth, getToken, getUser };