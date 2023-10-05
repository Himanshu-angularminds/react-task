import fetchApi from "../utils/fetchApi";

const baseUrl = "https://shop-api.ngminds.com";

export const userLogin = (data) => {
  return fetchApi(`${baseUrl}/auth/login?captcha=false`, "POST", data);
};

export const signUp = (data) => {
  return fetchApi(`${baseUrl}/auth/register?captcha=false`, "POST", data);
};

export const userProfile = (bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return fetchApi(`${baseUrl}/auth/self`, "GET", "", auth);
};

export const userProfilePasswordUpdate = (data, bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return fetchApi(`${baseUrl}/auth/change-password`, "POST", data, auth);
};
