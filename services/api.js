import fetchApi from "../utils/fetchApi";

const baseUrl = "https://shop-api.ngminds.com";

export const userLogin = (data) => {
  // return fetchApi(`${baseUrl}/auth/login?captcha=false`, "POST", data);
  return fetchApi(`${baseUrl}/auth/login`, "POST", data);
};

export const signUp = (data) => {
  return fetchApi(`${baseUrl}/auth/register?captcha=false`, "POST", data);
};

export const userProfile = (bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return fetchApi(`${baseUrl}/auth/self`, "GET", "", auth);
};

export const userForget = async (data) => {
  return await fetchApi(`${baseUrl}/auth/forgot-password`, "POST", data);
};

export const userProfilePasswordUpdate = async (data, bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return await fetchApi(
    `${baseUrl}/users/auth/change-password`,
    "POST",
    data,
    auth
  );
};
