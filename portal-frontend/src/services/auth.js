import Cookies from 'js-cookie';
import axios from 'axios';

async function renewToken () {
  try {
    const result = await axios.get('https://api-vcvs.azurewebsites.net/renew-token', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('refreshJwtToken')}`,
      },
    });
    const token = result.data.token;
    const refreshJwtToken = result.data.refreshToken;
    setCookies(token, refreshJwtToken);
    return getUserInfo();
  } catch (error) {
    removeCookies();
    window.location.href = '/login';
    return null;
  }
}

function setCookies(cookie1, cookie2) {
  Cookies.set('jwtToken', cookie1);
  Cookies.set('refreshJwtToken', cookie2);
}

function removeCookies(){
  Cookies.remove('jwtToken');
  Cookies.remove('refreshJwtToken');
}

function getUserInfo() {
  const token = Cookies.get('jwtToken');
  const renewToken = Cookies.get('refreshJwtToken');
  if (token && renewToken) {
    //split jwt token
    let payloadBase64 = token.split('.')[1];
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedJwt = JSON.parse(window.atob(base64));

    //split refresh jwt token 
    payloadBase64 = renewToken.split('.')[1];
    base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedRefreshJwt = JSON.parse(window.atob(base64));

    return {decodedJwt, decodedRefreshJwt};
  }
  return null;
}

function getToken() {
  return Cookies.get('jwtToken');
}

const authService = {
  renewToken,
  setCookies,
  removeCookies,
  getUserInfo,
  getToken,
};

export default authService;