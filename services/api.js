import fetchApi from "../utils/fetchApi";
// All apis are of Admin 
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

export const userProfileUpdate = (data,bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return fetchApi(`${baseUrl}/users/org`, "PATCH", data, auth);
};

export const userProfileVerify = (bearer) => {
  let auth = { Authorization: `Bearer ${bearer}` };
  return fetchApi(`${baseUrl}/auth/send-verification-email`, "POST", "", auth);
};

export const verifyUserEmail = (token) => {
  console.log(token,"im verified api call");
  return fetchApi(`${baseUrl}/auth/verify-email?token=${token}`, "POST");
};

export const userForget = async (data) => {
  return await fetchApi(`${baseUrl}/auth/forgot-password`, "POST", data);
};

export const userRestPassword = async (token,data) => {
  return await fetchApi(`${baseUrl}/auth/reset-password?token=${token}`, "POST", data);
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
